import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, selectedCategories, onCategoryToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryToggle(category.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
            ${selectedCategories.includes(category.id)
              ? 'text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          style={selectedCategories.includes(category.id) ? { backgroundColor: category.color } : {}}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
  })).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryToggle: PropTypes.func.isRequired,
};

export default CategoryFilter;
