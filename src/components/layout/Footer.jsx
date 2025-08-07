import React from 'react';
import PropTypes from 'prop-types';

function Footer() {
  return (
    <footer className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 text-center text-sm shadow-inner">
      <p>&copy; {new Date().getFullYear()} To-Do List App. All rights reserved.</p>
    </footer>
  );
}

Footer.propTypes = {
  // Define prop types if any
};

export default Footer;
