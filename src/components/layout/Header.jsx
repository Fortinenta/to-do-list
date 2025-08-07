import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/slices/uiSlice';

function Header() {
  const dispatch = useDispatch();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <button onClick={() => dispatch(toggleSidebar())} className="text-white text-2xl mr-4 focus:outline-none md:hidden">
        &#9776; {/* Hamburger icon */}
      </button>
      <h1 className="text-xl font-bold">To-Do List App</h1>
      {/* Add navigation or user info here */}
    </header>
  );
}

Header.propTypes = {
  // Define prop types if any
};

export default Header;