import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';
import Feed from './Feed';
import UserProfile from './UserProfile';
import ConnectionsList from './ConnectionsList';
import GroupsList from './GroupsList';

const Dashboard = () => {
  const { user, signOut, forceSignOut } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (signingOut) return; // Prevent multiple clicks
    
    try {
      setSigningOut(true);
      console.log('User initiated signout...');
      
      const { error } = await signOut();
      
      if (error) {
        console.error('Signout failed:', error);
        
        // Ask user if they want to force signout
        const forceLogout = window.confirm(
          'Normal signout failed. Would you like to force logout? This will clear all data and redirect you to the homepage.'
        );
        
        if (forceLogout) {
          forceSignOut();
        }
      }
      
    } catch (error) {
      console.error('Signout error:', error);
      
      // Offer force signout option
      const forceLogout = window.confirm(
        'Signout encountered an error. Would you like to force logout?'
      );
      
      if (forceLogout) {
        forceSignOut();
      }
    } finally {
      setSigningOut(false);
    }
  };

  const tabs = [
    { id: 'feed', name: 'Feed', icon: '🏠' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'connections', name: 'Connections', icon: '👥' },
    { id: 'groups', name: 'Groups', icon: '📚' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <h1 className="ml-2 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                ScholarConnect
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <DarkModeToggle />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Welcome, {user?.user_metadata?.first_name || 'Student'}!
              </span>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-200 disabled:opacity-50 min-h-[44px] flex items-center"
              >
                {signingOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center space-x-2">
              <DarkModeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
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
          <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3">
              <div className="text-sm text-gray-700 dark:text-gray-300 px-3 py-2">
                Welcome, {user?.user_metadata?.first_name || 'Student'}!
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                disabled={signingOut}
                className="block w-full text-left px-3 py-3 text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-base font-medium min-h-[44px] disabled:opacity-50"
              >
                {signingOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 min-h-[44px]`}
              >
                <span className="text-lg sm:text-base">{tab.icon}</span>
                <span className="hidden xs:inline">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="pb-4">
          {activeTab === 'feed' && <Feed />}
          {activeTab === 'profile' && <UserProfile />}
          {activeTab === 'connections' && <ConnectionsList />}
          {activeTab === 'groups' && <GroupsList />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
