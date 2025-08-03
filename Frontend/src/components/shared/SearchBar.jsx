import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor="search-problems"
        className="block text-sm font-medium text-[#475569] dark:text-[#94a3b8] mb-1"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search-problems"
          name="search"
          className="block w-full rounded-md border-0 bg-[#ffffff] dark:bg-[#232b3b] py-2.5 pl-10 pr-3 text-[#1e293b] dark:text-[#e2e8f0] ring-1 ring-inset ring-slate-300 dark:ring-[#334155] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
