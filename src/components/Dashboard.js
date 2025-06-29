import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';
import Feed from './Feed';
import UserProfile from './UserProfile';
import ConnectionsList from './ConnectionsList';
import GroupsList from './GroupsList';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  const handleSignOut = async () => {
    await signOut();
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
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HS</span>
              </div>
              <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                ScholarConnect
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Welcome, {user?.user_metadata?.first_name || 'Student'}!
              </span>
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'feed' && <Feed />}
        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'connections' && <ConnectionsList />}
        {activeTab === 'groups' && <GroupsList />}
      </div>
    </div>
  );
};

export default Dashboard;
