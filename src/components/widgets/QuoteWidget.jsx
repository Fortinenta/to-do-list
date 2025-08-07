import React from 'react';
import PropTypes from 'prop-types';
import { useQuote } from '../../hooks/useQuote';
import LoadingSpinner from '../common/LoadingSpinner';

function QuoteWidget() {
  const { quoteData, loading, error } = useQuote();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-32 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!quoteData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-32 flex items-center justify-center text-gray-500">
        No quote available.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Quote of the Day</h3>
      <p className="text-gray-700 dark:text-gray-300 italic mb-2">"{quoteData.content}"</p>
      <p className="text-right text-gray-600 dark:text-gray-400">- {quoteData.author}</p>
    </div>
  );
}

QuoteWidget.propTypes = {
  // No specific props for now
};

export default QuoteWidget;
