import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-sm w-full mx-4 text-center border border-gray-700"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 id="about-modal-title" className="text-2xl font-bold mb-4 text-teal-400">About Roy Persona Chat</h2>
        <p className="text-gray-300 mb-2">
          This application is a demonstration of the Google Gemini API in a dynamic, persona-driven chat interface.
        </p>
        <div className="border-t border-gray-700 my-6"></div>
        <h3 className="text-lg font-semibold text-gray-200">Developed By</h3>
        <p className="text-gray-300 mt-2">Abhinaba Roy Pradhan</p>
        <a href="mailto:abhinabapradhan@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors">
          abhinabapradhan@gmail.com
        </a>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
