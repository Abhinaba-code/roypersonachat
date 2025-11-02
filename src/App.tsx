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
    <div className="flex flex-col h-screen bg-slate-900 text-slate-200 font-sans animated-background">
      <header className="sticky top-0 z-10 bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-300 to-sky-400 text-transparent bg-clip-text">
            🤖 Roy Persona Chat
          </h1>
          <div className="flex items-center gap-4">
            {persona && (
                <button
                    onClick={handleReset}
                    className="bg-rose-500/80 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                    End Chat
                </button>
            )}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="text-slate-400 hover:text-teal-300 transition-colors transform hover:scale-110"
              aria-label="About this application"
            >
              <InfoIcon />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-4xl h-full flex flex-col bg-slate-800/70 rounded-2xl shadow-2xl border border-slate-700/50">
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
            <div className="p-4 bg-red-800/80 text-white text-center rounded-b-2xl border-t border-red-600">
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