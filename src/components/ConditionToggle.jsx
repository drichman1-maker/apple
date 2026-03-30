import React from 'react';

/**
 * Simple, reliable condition toggle for New/Refurbished
 * No complex state - just simple button toggle
 */
const ConditionToggle = ({ value, onChange, newCount = 0, refurbCount = 0 }) => {
  return (
    <div className="flex items-center bg-[#141414] border border-[#262626] rounded-full p-1">
      <button
        onClick={() => onChange('new')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          value === 'new'
            ? 'bg-white text-black'
            : 'text-[#a3a3a3] hover:text-[#fafafa]'
        }`}
      >
        New {newCount > 0 && <span className="opacity-50">({newCount})</span>}
      </button>
      <button
        onClick={() => onChange('refurbished')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          value === 'refurbished'
            ? 'bg-white text-black'
            : 'text-[#a3a3a3] hover:text-[#fafafa]'
        }`}
      >
        Refurb {refurbCount > 0 && <span className="opacity-50">({refurbCount})</span>}
      </button>
    </div>
  );
};

export default ConditionToggle;