import React, { useState } from 'react';
import Navbar from './Navbar';

const Homepage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleShowAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-900 dark:to-blue-900 flex flex-col transition-colors duration-300">
      <Navbar onShowAuth={handleShowAuth} />
      
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Build Your{' '}
            <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Academic Profile
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8 leading-relaxed">
            Profiles aren't just for jobs, welcome to a one stop platform for high school students to showcase their grades, 
            extracurricular activities, achievements, and build a compelling profile 
            for college applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleShowAuth('signup')}
              className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-blue-900 dark:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105"
            >
              Get Started Free
            </button>
            <button
              onClick={() => handleShowAuth('login')}
              className="bg-white/10 hover:bg-white/20 dark:bg-white/20 dark:hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200"
            >
              Already have an account?
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-2">
              Features
            </h2>
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Everything you need for college applications
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Organize your high school journey and stand out to college admissions officers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white mx-auto mb-6 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="chart" className="text-2xl">📊</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Grade Tracking</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Keep track of your GPA, course grades, and academic progress throughout high school. 
                Visualize your improvement over time.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 text-white mx-auto mb-6 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="trophy" className="text-2xl">🏆</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Achievements</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Showcase your awards, honors, and notable accomplishments. 
                Create a comprehensive record of your successes.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 text-white mx-auto mb-6 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="theater" className="text-2xl">🎭</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Extracurriculars</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Document your clubs, sports, volunteer work, and leadership experiences. 
                Show colleges who you are beyond grades.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">College Acceptances</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.9</div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Free</div>
              <div className="text-gray-600 dark:text-gray-400">Always</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to build your future?
          </h3>
          <p className="text-xl text-blue-200 dark:text-gray-300 mb-8">
            Join thousands of students who are already preparing for college success.
          </p>
          <button
            onClick={() => handleShowAuth('signup')}
            className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-blue-900 dark:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105"
          >
            Start Building Your Profile
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LH</span>
              </div>
              <span className="ml-2 text-xl font-bold">Name_Here</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500">
              © 2025 Name_here. Empowering high school students.
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Authentication will be implemented in the next phase!
            </p>
            <button
              onClick={() => setShowAuthModal(false)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg w-full transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
