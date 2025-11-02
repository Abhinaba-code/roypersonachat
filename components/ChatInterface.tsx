
import React from 'react';
import { Message } from '../types';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  persona: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, persona }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 bg-gray-700/50 border-b border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="font-bold text-teal-400">Chatting with:</span> {persona}
        </p>
      </div>
      <ChatWindow messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
