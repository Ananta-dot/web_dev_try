import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ onShowAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HS</span>
              </div>
              <h1 className="ml-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                ScholarConnect
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={() => onShowAuth && onShowAuth('login')}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 min-h-[44px]"
            >
              Login
            </button>
            <button
              onClick={() => onShowAuth && onShowAuth('register')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 min-h-[44px]"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                onShowAuth && onShowAuth('login');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md text-base font-medium transition duration-200 min-h-[44px]"
            >
              Login
            </button>
            <button
              onClick={() => {
                onShowAuth && onShowAuth('register');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-base font-medium transition duration-200 min-h-[44px]"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
