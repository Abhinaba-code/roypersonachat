
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
    <div className="p-4 bg-gray-700/50 border-t border-gray-700">
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          rows={1}
          className="w-full bg-gray-600 text-gray-200 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
