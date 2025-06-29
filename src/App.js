import React from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import './index.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show dashboard if user is authenticated and verified
  if (user && user.email_confirmed_at) {
    return <Dashboard />;
  }

  // Show homepage for non-authenticated users or unverified users
  return <Homepage />;
};

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <div className="App">
          <AppContent />
        </div>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
