import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      window.location.href = '/';
    }
  };

  const [profileData, setProfileData] = useState({
    grade: '',
    gpa: '',
    school: '',
    gradYear: '',
    extracurriculars: [],
    achievements: [],
    courses: []
  });

  const [newItem, setNewItem] = useState('');

  const addItem = (type) => {
    if (newItem.trim()) {
      setProfileData({
        ...profileData,
        [type]: [...profileData[type], newItem.trim()]
      });
      setNewItem('');
    }
  };

  const removeItem = (type, index) => {
    const updated = profileData[type].filter((_, i) => i !== index);
    setProfileData({...profileData, [type]: updated});
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'academics', name: 'Academics', icon: '📚' },
    { id: 'activities', name: 'Activities', icon: '🎭' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HS</span>
              </div>
              <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                ScholarConnect
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user?.user_metadata?.first_name || 'Student'}!
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Welcome to your Academic Profile!
            </h2>
            <p className="text-blue-100">
              Start building your college application portfolio by adding your academic information, 
              extracurricular activities, and achievements.
            </p>
          </div>

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
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition duration-200`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Grade
                    </label>
                    <select
                      value={profileData.grade}
                      onChange={(e) => setProfileData({...profileData, grade: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Grade</option>
                      <option value="9th">9th Grade</option>
                      <option value="10th">10th Grade</option>
                      <option value="11th">11th Grade</option>
                      <option value="12th">12th Grade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={profileData.gpa}
                      onChange={(e) => setProfileData({...profileData, gpa: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="3.85"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={profileData.school}
                      onChange={(e) => setProfileData({...profileData, school: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your High School"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Graduation Year
                    </label>
                    <input
                      type="number"
                      min="2024"
                      max="2030"
                      value={profileData.gradYear}
                      onChange={(e) => setProfileData({...profileData, gradYear: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="2027"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Extracurricular Activities
                </h2>
                <div className="flex space-x-2 mb-6">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new activity (e.g., Basketball Team, Drama Club)"
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => addItem('extracurriculars')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {profileData.extracurriculars.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <span className="text-gray-900 dark:text-white">{activity}</span>
                      <button
                        onClick={() => removeItem('extracurriculars', index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {profileData.extracurriculars.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No activities added yet. Start by adding your clubs, sports, or volunteer work!
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Achievements & Awards
                </h2>
                <div className="flex space-x-2 mb-6">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add achievement (e.g., Honor Roll, Science Fair Winner)"
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => addItem('achievements')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {profileData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <span className="text-gray-900 dark:text-white">{achievement}</span>
                      <button
                        onClick={() => removeItem('achievements', index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {profileData.achievements.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No achievements added yet. Add your awards, honors, and accomplishments!
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Course Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Academic course tracking coming soon! This section will allow you to add and track your courses, grades, and academic progress.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                  <div className="flex">
                    <div className="text-blue-400 mr-3">ℹ️</div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Feature in Development
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        We're working on adding course tracking, transcript uploads, and GPA calculation features.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
