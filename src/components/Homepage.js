import React, { useState } from 'react';
import Navbar from './Navbar';
import AuthModal from './AuthModal';

const Homepage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleShowAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar onShowAuth={handleShowAuth} />
      
      {/* Hero Section - Fixed Dark Mode */}
      <div className="flex-grow flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Build Your{' '}
            <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Academic Profile
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
            The ultimate platform for high school students to showcase their achievements
          </p>
          
          {/* Mobile-Optimized Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <button
              onClick={() => handleShowAuth('register')}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-blue-900 dark:text-gray-900 font-bold py-4 px-6 sm:px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 min-h-[44px]"
            >
              Get Started Free
            </button>
            <button
              onClick={() => handleShowAuth('login')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 dark:bg-white/20 dark:hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 sm:px-8 rounded-lg text-lg transition duration-200 min-h-[44px]"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - Fixed Dark Mode */}
      <div className="bg-white dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-2">
              Features
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Everything you need for college applications
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              Organize your high school journey and stand out to college admissions officers
            </p>
          </div>

          {/* Mobile-First Grid - Fixed Dark Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="chart" className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Grade Tracking</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Keep track of your GPA, course grades, and academic progress throughout high school.
              </p>
            </div>

            <div className="text-center group p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="trophy" className="text-2xl">🏆</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Achievements</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Showcase your awards, honors, and notable accomplishments.
              </p>
            </div>

            <div className="text-center group p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="theater" className="text-2xl">🎭</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Extracurriculars</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Document your clubs, sports, volunteer work, and leadership experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default Homepage;
