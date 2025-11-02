import React, { useEffect } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div
        className="bg-slate-800 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center border border-slate-700/50 transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 id="about-modal-title" className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-sky-400 text-transparent bg-clip-text">
          About Roy Persona Chat
        </h2>
        <p className="text-slate-300 mb-2">
          This application is a demonstration of the Google Gemini API in a dynamic, persona-driven chat interface.
        </p>
        <div className="border-t border-slate-700 my-6"></div>
        <h3 className="text-lg font-semibold text-slate-200">Developed By</h3>
        <p className="text-slate-300 mt-2">Abhinaba Roy Pradhan</p>
        <a href="mailto:abhinabapradhan@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors">
          abhinabapradhan@gmail.com
        </a>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutModal;