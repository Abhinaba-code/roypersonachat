
import React, { useState } from 'react';

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
    <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 text-center bg-gray-800 rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-300">Define Your AI's Persona</h2>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Who do you want to talk to? Describe the personality, role, and background of your AI companion. The more detailed you are, the more convincing the conversation will be.
      </p>

      <textarea
        value={personaText}
        onChange={(e) => setPersonaText(e.target.value)}
        placeholder="e.g., You are a helpful assistant that speaks like Shakespeare..."
        className="w-full max-w-2xl h-40 p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow"
        disabled={isLoading}
      />
      
      <div className="mt-4 mb-6">
        <h3 className="text-gray-400 text-sm mb-2">Or try a sample:</h3>
        <div className="flex flex-wrap gap-2 justify-center">
            {samplePersonas.map((sample, index) => (
                <button key={index} onClick={() => handleSelectSample(sample)} className="bg-gray-700 hover:bg-gray-600 text-xs text-teal-300 font-semibold py-1 px-3 rounded-full transition-colors">
                    Sample {index + 1}
                </button>
            ))}
        </div>
      </div>

      <button
        onClick={handleStartChat}
        disabled={isLoading || !personaText.trim()}
        className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center w-64"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Initializing AI...
          </>
        ) : (
          'Start Chat'
        )}
      </button>
    </div>
  );
};

export default PersonaInput;
