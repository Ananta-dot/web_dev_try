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

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleModeChange = (newMode) => {
    setAuthMode(newMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar onShowAuth={handleShowAuth} />
      
      {/* Hero Section - Professional Networking Focus */}
      <div className="flex-grow flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Professional Networking{' '}
            <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              for Students
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
            Connect with mentors, build your career network, and get guidance for your educational journey. LinkedIn for the next generation.
          </p>
          
          {/* Professional-focused Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <button
              onClick={() => handleShowAuth('register')}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-blue-900 dark:text-gray-900 font-bold py-4 px-6 sm:px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 min-h-[44px]"
            >
              Start Your Professional Journey
            </button>
            <button
              onClick={() => handleShowAuth('login')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 dark:bg-white/20 dark:hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 sm:px-8 rounded-lg text-lg transition duration-200 min-h-[44px]"
            >
              Already a member? Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - Professional Networking Focus */}
      <div className="bg-white dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-2">
              Professional Development
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Build your career mindset early
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              Connect with industry experts, get career guidance, and build meaningful professional relationships
            </p>
          </div>

          {/* Updated Feature Grid - Professional Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="network" className="text-2xl">🌐</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Professional Networking</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Connect with teachers, mentors, and industry professionals to build your career network early.
              </p>
            </div>

            <div className="text-center group p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="mentor" className="text-2xl">👨‍🏫</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Find Mentors & Guidance</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Get personalized guidance for college selection, career paths, and skill development from experts.
              </p>
            </div>

            <div className="text-center group p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="opportunities" className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Discover Opportunities</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Find internships, entry-level opportunities, and get recommendations for admissions and jobs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who Can Join Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Who's Part of Our Community?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A diverse professional network designed for young minds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl mb-3">🎓</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Students (Ages 10-18)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Build profiles, connect with mentors, and explore career paths</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl mb-3">👨‍🏫</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Teachers & Mentors</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share expertise, guide students, and create educational content</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl mb-3">🏫</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Schools & Universities</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect with students, share updates, and build institutional presence</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">EdTech & Businesses</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Offer learning opportunities and connect with future talent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="bg-white dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Growing Professional Network
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Join thousands building their career foundation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">25,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Students Connected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2,500+</div>
              <div className="text-gray-600 dark:text-gray-400">Verified Mentors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">850+</div>
              <div className="text-gray-600 dark:text-gray-400">Educational Institutions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Career Connections Made</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Start Your Professional Journey Early?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Build Career Mindset</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Develop professional thinking and career awareness from an early age through mentor interactions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Educational Choices</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get guidance on college selection, course choices, and admission processes from experienced professionals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 font-bold text-lg">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Early Opportunities</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Access internships, entry-level positions, and recommendations that give you a head start in your career.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to build your professional future?
          </h3>
          <p className="text-lg sm:text-xl text-blue-200 dark:text-gray-300 mb-8">
            Join the professional networking platform designed specifically for students aged 10-18. Connect with mentors, explore career paths, and build the foundation for your professional success.
          </p>
          <button
            onClick={() => handleShowAuth('register')}
            className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-blue-900 dark:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105"
          >
            Join ScholarConnect Today
          </button>
          <p className="text-blue-200 dark:text-gray-400 text-sm mt-4">
            Parental supervision required for users under 16
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <span className="ml-2 text-xl font-bold">ScholarConnect</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-center">
              © 2025 ScholarConnect. Professional networking for the next generation.
            </div>
          </div>
        </div>
      </footer>

      {showAuthModal && (
        <AuthModal 
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          onModeChange={handleModeChange}
        />
      )}
    </div>
  );
};

export default Homepage;
