// SearchInput.tsx
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  query: string;
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, onSearch }) => {
  return (
    <div className="relative mt-3 px-4">
      <input
        type="search"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        className="block w-full h-7 py-2 pl-9 pr-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
      />
      <SearchOutlined className="absolute top-1/2 transform -translate-y-1/2 left-7 text-gray-400 dark:text-gray-300" />
    </div>
  );
};

export default SearchInput;
