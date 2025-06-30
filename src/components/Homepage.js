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
      
      {/* Hero Section - Infrastructure Layer Focus */}
      <div className="flex-grow flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="max-w-5xl text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-yellow-400/20 text-yellow-200 rounded-full text-sm font-medium mb-4">
              Building the Future of Teen Education
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            The Infrastructure Layer for{' '}
            <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Peer-Led, Mentor-Driven
            </span>
            {' '}Education
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8 leading-relaxed px-2 max-w-4xl mx-auto">
            We're building the foundational technology that powers the next generation of learning networks—where teens learn from peers, grow with mentors, and shape their own educational journey.
          </p>
          
          {/* Infrastructure-focused Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <button
              onClick={() => handleShowAuth('register')}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-blue-900 dark:text-gray-900 font-bold py-4 px-6 sm:px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 min-h-[44px]"
            >
              Join the Network
            </button>
            <button
              onClick={() => handleShowAuth('login')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 dark:bg-white/20 dark:hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 sm:px-8 rounded-lg text-lg transition duration-200 min-h-[44px]"
            >
              Access Platform
            </button>
          </div>
        </div>
      </div>

      {/* Infrastructure Vision Section */}
      <div className="bg-white dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-2">
              Infrastructure for Tomorrow
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Powering the future of teen learning networks
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              We provide the foundational technology that enables authentic peer-to-peer learning and meaningful mentor relationships
            </p>
          </div>

          {/* Infrastructure Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="network" className="text-2xl">🌐</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Peer Learning Networks</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Advanced algorithms connect teens with compatible learning partners and study groups based on shared interests and complementary skills.
              </p>
            </div>

            <div className="text-center group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="mentor" className="text-2xl">🧠</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Intelligent Mentor Matching</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                AI-powered systems identify optimal mentor-student relationships based on goals, personalities, and learning styles.
              </p>
            </div>

            <div className="text-center group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition duration-300 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 text-white mx-auto mb-4 group-hover:scale-110 transition duration-200">
                <span role="img" aria-label="growth" className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Adaptive Learning Pathways</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Dynamic educational routes that evolve based on peer interactions, mentor feedback, and individual progress patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Future of Education Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Reimagining Education for the Digital Generation
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Traditional education models weren't designed for today's interconnected world. We're building the infrastructure that enables a new paradigm—one where learning is collaborative, mentorship is accessible, and teens are empowered to direct their own growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Peer-First Learning</h4>
                    <p className="text-gray-600 dark:text-gray-400">Students learn best from those slightly ahead of them in the journey</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Distributed Mentorship</h4>
                    <p className="text-gray-600 dark:text-gray-400">Access to diverse mentors regardless of geographic or socioeconomic boundaries</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Personalized Networks</h4>
                    <p className="text-gray-600 dark:text-gray-400">Custom learning communities that adapt to individual goals and interests</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Learning Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">25K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Mentors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">150+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">98%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Effects Section */}
      <div className="bg-white dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by Network Effects
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Every new member strengthens the entire network, creating exponential value for all participants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-3">👥</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Students</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn collaboratively and teach others</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl mb-3">🧑‍🏫</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mentors</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Guide and inspire the next generation</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl mb-3">🏫</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Institutions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Extend reach and impact beyond walls</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Collective intelligence and support</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to build the future of education?
          </h3>
          <p className="text-lg sm:text-xl text-blue-200 dark:text-gray-300 mb-8">
            Join the infrastructure layer that's empowering the next generation of learners, mentors, and educational innovators. Together, we're creating a world where every teen has access to peer-led learning and mentor-driven growth.
          </p>
          <button
            onClick={() => handleShowAuth('register')}
            className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-blue-900 dark:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 mb-4"
          >
            Be Part of the Infrastructure
          </button>
          <p className="text-blue-200 dark:text-gray-400 text-sm">
            Safe, secure, and designed specifically for teen learners • Ages 10-18
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
              © 2025 ScholarConnect. Building the infrastructure for peer-led, mentor-driven education.
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
