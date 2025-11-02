import React, { useState, KeyboardEvent } from 'react';
import SendIcon from './icons/SendIcon';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-slate-900/40 border-t border-slate-700/50">
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="w-full bg-slate-700/80 text-slate-200 rounded-lg py-3 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none transition-all duration-200"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-br from-teal-500 to-sky-600 text-white hover:from-teal-600 hover:to-sky-700 transition-all duration-200 transform hover:scale-110 disabled:from-slate-600 disabled:to-slate-700 disabled:scale-100 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;