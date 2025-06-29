import React, { useState } from 'react';

const GroupsList = () => {
  const [activeTab, setActiveTab] = useState('my-groups');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {[
          { id: 'my-groups', name: 'My Groups', count: 0 },
          { id: 'discover', name: 'Discover Groups', count: 0 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {tab.name} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Groups feature coming soon!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join study groups, clubs, or create your own group to connect with like-minded students.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center">
              <div className="text-blue-400 mr-3">ℹ️</div>
              <div className="text-left">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  What's coming:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                  <li>• Subject-specific study groups</li>
                  <li>• Age-appropriate communities</li>
                  <li>• Teacher-moderated discussions</li>
                  <li>• School-based groups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsList;
