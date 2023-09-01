import React, { useState } from 'react';
import { SearchComplain } from '../api/api';

const FilterButton = ({ title, onClick, isSelected, isDisabled }) => {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[3rem] items-center justify-between rounded-md ${
        isSelected ? 'bg-green-50' : 'bg-stone-100'
      } px-4 py-2 text-stone-800`}
      disabled={isDisabled}
    >
      {title}
      {isSelected && (
        <span className="bg-green-500 text-green-100 card-pills--counter ml-2 rounded-md px-2 py-1 text-sm">
          ✓
        </span>
      )}
      <i
        className={`fas ${
          isSelected ? 'fa-check text-green-400' : 'fa-angle-down text-stone-700 dark:text-stone-300'
        } pl-3`}
      ></i>
    </button>
  );
};

const FilterBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(0);
  const { data, error, isLoading } = SearchComplain(selectedFilters, searchValue); 
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleFilterClick = (filterValue) => {
    setSelectedFilters(filterValue);
    
  };

  return (
    <div className="filters">
      <div className="mx-auto flex w-full justify-center pt-4 sm:max-w-[640px] ...">
        <div className="flex flex-wrap items-center">
          <div className="ml-3 mb-3">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border rounded-md px-2 py-1 focus:outline-none focus:border-stone-300"
              placeholder="Search"
            />
          </div>

          <FilterSection
            title="Status"
            isSelected={selectedFilters === 2}
            onClick={() => handleFilterClick(2)}
          />
          <FilterSection
            title="Type"
            isSelected={selectedFilters === 1}
            onClick={() => handleFilterClick(1)}
          />
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, isSelected, onClick }) => {
  const isDisabled = false; // You can modify this based on your conditions

  return (
    <div className="ml-3 mb-3">
      <div className="flex flex-col space-y-3">
        <FilterButton
          title={title}
          isSelected={isSelected}
          onClick={onClick}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};

const Filter = () => {
  return (
    <div>
      <FilterBar />
    </div>
  );
};

export default Filter;
