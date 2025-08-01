import React from 'react';
import { Search, Filter } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="filter-button">
          <Filter size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;