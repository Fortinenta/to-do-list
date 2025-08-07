import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_FILTERS } from '../../utils/constants';

function StatusFilter({ currentStatus, onStatusChange }) {
  return (
    <div className="flex space-x-2">
      {STATUS_FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onStatusChange(filter.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium
            ${currentStatus === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

StatusFilter.propTypes = {
  currentStatus: PropTypes.oneOf(STATUS_FILTERS.map(f => f.value)).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default StatusFilter;
