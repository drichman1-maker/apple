import { useState } from 'react';
import { useRouter } from 'next/router';
import { Coin } from '../types/coin';

export default function GradingDisplay({ coin }: { coin: Coin }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Grading Details</h2>
        <button
          onClick={toggleDarkMode}
          className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">PCGS</h3>
          <p>{coin.pcgsGrade || 'Not Graded'}</p>
          <p>{coin.pcgsCertNumber || 'N/A'}</p>
        </div>
        <div>
          <h3 className="font-semibold">NGC</h3>
          <p>{coin.ngcGrade || 'Not Graded'}</p>
          <p>{coin.ngcCertNumber || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
