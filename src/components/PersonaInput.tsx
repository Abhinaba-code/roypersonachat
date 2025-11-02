import React, { useState } from 'react';
import Spinner from './icons/Spinner';

interface PersonaInputProps {
  onPersonaSet: (persona: string) => void;
  isLoading: boolean;
}

const PersonaInput: React.FC<PersonaInputProps> = ({ onPersonaSet, isLoading }) => {
  const [personaText, setPersonaText] = useState('');

  const samplePersonas = [
    "You are a witty pirate captain who has sailed the seven seas and has a tale for every occasion.",
    "You are a calm, knowledgeable librarian from the year 2242, with access to all information ever recorded.",
    "You are a hyper-enthusiastic personal trainer who motivates with cheesy 80s movie quotes.",
    "You are a sarcastic, grumpy cat that secretly enjoys helping people with their problems.",
  ];

  const handleStartChat = () => {
    if (personaText.trim()) {
      onPersonaSet(personaText);
    }
  };

  const handleSelectSample = (sample: string) => {
    setPersonaText(sample);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 text-center bg-slate-800/50 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-sky-400 text-transparent bg-clip-text">
        Define Your AI's Persona
      </h2>
      <p className="text-slate-400 mb-8 max-w-2xl">
        Who do you want to talk to? Describe their personality, role, and background. The more detailed you are, the more convincing the conversation will be.
      </p>

      <div className="w-full max-w-2xl p-1 bg-gradient-to-br from-teal-500 to-sky-600 rounded-lg shadow-lg">
        <textarea
          value={personaText}
          onChange={(e) => setPersonaText(e.target.value)}
          placeholder="e.g., You are a helpful assistant that speaks like Shakespeare..."
          className="w-full h-40 p-4 bg-slate-900 border-none rounded-md text-slate-200 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-shadow"
          disabled={isLoading}
        />
      </div>
      
      <div className="mt-6 mb-6">
        <h3 className="text-slate-400 text-sm mb-3">Or try a sample:</h3>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
            {samplePersonas.map((sample, index) => (
                <button 
                  key={index} 
                  onClick={() => handleSelectSample(sample)} 
                  className="bg-slate-700/80 hover:bg-slate-700 text-xs text-teal-300 font-semibold py-1.5 px-3 rounded-full transition-all duration-200 transform hover:scale-105"
                  aria-label={`Select sample persona ${index + 1}`}
                >
                    {`Sample ${index + 1}`}
                </button>
            ))}
        </div>
      </div>

      <button
        onClick={handleStartChat}
        disabled={isLoading || !personaText.trim()}
        className="px-8 py-3 bg-gradient-to-r from-teal-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-teal-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center w-64"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span className="ml-2">Initializing AI...</span>
          </>
        ) : (
          'Start Chat'
        )}
      </button>
    </div>
  );
};

export default PersonaInput;