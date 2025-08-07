import React from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <Input
      id="search-bar"
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full"
    />
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
