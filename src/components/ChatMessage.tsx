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
        <div className="flex items-end gap-3 justify-start animate-fade-in-up">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shadow-sm">
            <BotIcon />
          </div>
          <div className="bg-slate-200 text-slate-900 px-4 py-3 rounded-2xl rounded-bl-none max-w-xs md:max-w-md">
            <Spinner />
          </div>
        </div>
      );
  }

  return (
    <div className={`flex items-end gap-3 animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shadow-sm">
          <BotIcon />
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-2xl break-words whitespace-pre-wrap shadow-sm
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-slate-200 text-slate-900 rounded-bl-none'}`
        }
      >
        <p>{message.content}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;