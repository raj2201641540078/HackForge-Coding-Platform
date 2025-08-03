import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ label, options, selectedValue, onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || '';

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-[#475569] dark:text-[#94a3b8] mb-1">
        {label}
      </label>
      <button
        type="button"
        className="relative w-full cursor-default rounded-md bg-[#ffffff] dark:bg-[#232b3b] py-2.5 pl-3 pr-10 text-left text-[#1e293b] dark:text-[#e2e8f0] shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-[#334155] focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <span className="block truncate">{selectedLabel}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#ffffff] dark:bg-[#232b3b] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              className="text-[#1e293b] dark:text-[#94a3b8] relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-[#f97316] hover:text-white"
              onMouseDown={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              <span className="block truncate">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
