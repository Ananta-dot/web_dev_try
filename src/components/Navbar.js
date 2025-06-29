import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ onShowAuth }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LH</span>
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Name_here
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={() => onShowAuth('login')}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Login
            </button>
            <button
              onClick={() => onShowAuth('signup')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
