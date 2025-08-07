import React from 'react';
import PropTypes from 'prop-types';

function TodoStats({ total, completed, pending }) {
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Task Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-md">
          <p className="text-gray-600 dark:text-gray-300">Total Tasks</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{total}</p>
        </div>
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-md">
          <p className="text-gray-600 dark:text-gray-300">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completed}</p>
        </div>
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-md">
          <p className="text-gray-600 dark:text-gray-300">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pending}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600 dark:text-gray-300 mb-2">Completion Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-600 dark:text-gray-300 mt-1">{completionPercentage}% Completed</p>
      </div>
    </div>
  );
}

TodoStats.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
};

export default TodoStats;
