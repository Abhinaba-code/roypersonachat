import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, Role } from './types';
import PersonaInput from './components/PersonaInput';
import ChatInterface from './components/ChatInterface';
import AboutModal from './components/AboutModal';
import InfoIcon from './components/icons/InfoIcon';

const App: React.FC = () => {
  const [persona, setPersona] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handlePersonaSet = useCallback(async (newPersona: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const newChatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: newPersona,
        },
      });
      setChatSession(newChatSession);
      setPersona(newPersona);
      setMessages([]);
    } catch (e) {
      console.error(e);
      setError('Failed to initialize AI session. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!chatSession) {
      setError('Chat session is not initialized.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: Message = { role: Role.USER, content: userInput };
    const modelPlaceholderMessage: Message = { role: Role.MODEL, content: '' };
    
    setMessages(prevMessages => [...prevMessages, userMessage, modelPlaceholderMessage]);
    
    try {
      const stream = await chatSession.sendMessageStream({ message: userInput });

      let fullResponse = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = { role: Role.MODEL, content: fullResponse };
          return newMessages;
        });
      }

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get response from AI: ${errorMessage}`);
      setMessages(prevMessages => prevMessages.slice(0, -1)); // Remove placeholder
    } finally {
      setIsLoading(false);
    }
  }, [chatSession]);
  
  const handleReset = () => {
    setPersona(null);
    setChatSession(null);
    setMessages([]);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-teal-400">🤖 Roy Persona Chat</h1>
        <div className="flex items-center gap-4">
          {persona && (
              <button
                  onClick={handleReset}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                  End Chat
              </button>
          )}
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="text-gray-400 hover:text-teal-400 transition-colors"
            aria-label="About this application"
          >
            <InfoIcon />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-4xl h-full flex flex-col bg-gray-800 rounded-xl shadow-2xl">
          {!persona ? (
            <PersonaInput onPersonaSet={handlePersonaSet} isLoading={isLoading} />
          ) : (
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              persona={persona}
            />
          )}
          {error && (
            <div className="p-4 bg-red-800 text-white text-center rounded-b-xl">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
        </div>
      </main>

      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </div>
  );
};

export default App;
