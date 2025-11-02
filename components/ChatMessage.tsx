
import React from 'react';
import { Message, Role } from '../types';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';
import Spinner from './icons/Spinner';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  if (message.role === Role.MODEL && message.content === '') {
      return (
        <div className="flex items-start gap-3 justify-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
            <BotIcon />
          </div>
          <div className="bg-gray-700 p-3 rounded-lg max-w-md">
            <Spinner />
          </div>
        </div>
      );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
          <BotIcon />
        </div>
      )}
      <div
        className={`p-3 rounded-lg max-w-md md:max-w-xl break-words whitespace-pre-wrap
          ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}
      >
        <p>{message.content}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
