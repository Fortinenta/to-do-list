import React from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import { DATE_FILTERS } from '../../utils/constants';

function DateRangeFilter({ dateRange, onDateRangeChange }) {
  const handleTypeChange = (e) => {
    onDateRangeChange({ type: e.target.value, startDate: null, endDate: null });
  };

  const handleDateChange = (e) => {
    onDateRangeChange({ ...dateRange, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-2">
      <select
        value={dateRange.type}
        onChange={handleTypeChange}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
      >
        {DATE_FILTERS.map((filter) => (
          <option key={filter.value} value={filter.value}>{filter.label}</option>
        ))}
      </select>

      {dateRange.type === 'custom' && (
        <div className="flex space-x-2">
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={dateRange.startDate || ''}
            onChange={handleDateChange}
            className="flex-1"
          />
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={dateRange.endDate || ''}
            onChange={handleDateChange}
            className="flex-1"
          />
        </div>
      )}
    </div>
  );
}

DateRangeFilter.propTypes = {
  dateRange: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    type: PropTypes.oneOf(DATE_FILTERS.map(f => f.value)).isRequired,
  }).isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
};

export default DateRangeFilter;
