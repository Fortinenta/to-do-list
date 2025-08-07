import React from 'react';
import PropTypes from 'prop-types';
import { PRIORITY_OPTIONS } from '../../utils/constants';

function PriorityFilter({ currentPriority, onPriorityChange }) {
  return (
    <div>
      <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Filter by Priority
      </label>
      <select
        id="priority-filter"
        name="priority-filter"
        value={currentPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
      >
        <option value="all">All Priorities</option>
        {PRIORITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

PriorityFilter.propTypes = {
  currentPriority: PropTypes.string.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default PriorityFilter;
