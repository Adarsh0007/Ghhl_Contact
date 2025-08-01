import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const TabNavigation = ({ config, activeTab, onTabChange, onSearch }) => {
  const { tabs } = config;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-white border-b">
      <div className="container">
        {/* Tab Navigation */}
        <div className="flex items-center border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab.id === activeTab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="py-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Fields and Folders"
                className="form-input pl-10 pr-4"
                aria-label="Search fields and folders"
              />
            </div>
            <button
              className="btn btn-secondary btn-icon"
              aria-label="Filter options"
            >
              <Filter size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;