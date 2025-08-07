import React from 'react';
import PropTypes from 'prop-types';

function StatsWidget({ title, value, description, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
      <div className="text-blue-500 text-3xl">
        {icon} {/* Placeholder for an icon */}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
        {description && <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>}
      </div>
    </div>
  );
}

StatsWidget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
  icon: PropTypes.node, // Can be a React component or string
};

export default StatsWidget;
