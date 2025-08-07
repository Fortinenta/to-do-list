import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { PRIORITY_OPTIONS } from '../../utils/constants';

function BulkActions({
  selectedCount,
  onBulkMarkCompleted,
  onBulkMarkUncompleted,
  onBulkChangeCategory,
  onBulkChangePriority,
  onBulkDelete,
  categories,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 flex flex-wrap items-center justify-between">
      <span className="text-gray-700 dark:text-gray-300 text-sm mb-2 md:mb-0">
        {selectedCount} items selected
      </span>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onBulkMarkCompleted} variant="primary" className="text-sm">Mark Complete</Button>
        <Button onClick={onBulkMarkUncompleted} variant="secondary" className="text-sm">Mark Incomplete</Button>
        <select
          onChange={(e) => onBulkChangeCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
          defaultValue=""
        >
          <option value="" disabled>Change Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          onChange={(e) => onBulkChangePriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
          defaultValue=""
        >
          <option value="" disabled>Change Priority</option>
          {PRIORITY_OPTIONS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <Button onClick={onBulkDelete} variant="danger" className="text-sm">Delete Selected</Button>
      </div>
    </div>
  );
}

BulkActions.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  onBulkMarkCompleted: PropTypes.func.isRequired,
  onBulkMarkUncompleted: PropTypes.func.isRequired,
  onBulkChangeCategory: PropTypes.func.isRequired,
  onBulkChangePriority: PropTypes.func.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default BulkActions;
