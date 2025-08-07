import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/slices/uiSlice';

function Sidebar({ onNavigate }) {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  const handleNavigationClick = (view) => {
    onNavigate(view);
    dispatch(toggleSidebar()); // Close sidebar after navigation on mobile
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-gray-200 dark:bg-gray-800 p-4 shadow-md z-40 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:relative md:translate-x-0
      `}
    >
      <div className="flex justify-end md:hidden mb-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
        >
          &times;
        </button>
      </div>
      <nav>
        <ul>
          <li className="mb-2"><a href="#" onClick={() => handleNavigationClick('tasks')} className="block p-2 rounded-md text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700">All Tasks</a></li>
          <li className="mb-2"><a href="#" onClick={() => handleNavigationClick('categories')} className="block p-2 rounded-md text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700">Categories</a></li>
          <li className="mb-2"><a href="#" onClick={() => handleNavigationClick('charts')} className="block p-2 rounded-md text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700">Charts</a></li>
          <li className="mb-2"><a href="#" onClick={() => handleNavigationClick('widgets')} className="block p-2 rounded-md text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700">Widgets</a></li>
        </ul>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default Sidebar;