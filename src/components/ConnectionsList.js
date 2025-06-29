import React from 'react';

const ConnectionsList = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Connections
        </h2>
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Connections feature coming soon!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Connect with classmates and teachers to build your network.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center">
              <div className="text-blue-400 mr-3">ℹ️</div>
              <div className="text-left">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  What's coming:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                  <li>• Send and receive connection requests</li>
                  <li>• Build your network</li>
                  <li>• Find classmates and teachers</li>
                  <li>• Suggested connections</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsList;
