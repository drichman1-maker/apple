import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Retailer-specific sort dropdown
 */
const RetailerSortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'savings', label: 'Best Deals' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Name (A-Z)' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#262626] rounded-full text-sm font-medium text-[#fafafa] hover:border-[#444] transition-colors min-w-[160px] justify-between"
      >
        <span>Sort: {selectedOption?.label}</span>
        <ChevronDown 
          className={`w-4 h-4 text-[#a3a3a3] transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-xl z-50 min-w-[200px] py-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-[#262626] transition-colors ${
                value === option.value ? 'text-[#3b82f6]' : 'text-[#fafafa]'
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RetailerSortDropdown;