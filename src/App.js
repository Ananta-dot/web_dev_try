import React, { useState, useEffect } from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import ProfileDetailsForm from './components/ProfileDetailsForm';
import { supabase } from './lib/supabase';
import './index.css';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setProfileLoading(false);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('profile_completed')
        .eq('id', user.id)
        .single();

      if (data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If no profile exists yet, create one
      if (error.code === 'PGRST116') {
        await createUserProfile();
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const createUserProfile = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .insert([
          {
            id: user.id,
            email: user.email,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            profile_completed: false
          }
        ]);

      if (error && error.code !== '23505') { // Ignore duplicate key error
        console.error('Error creating user profile:', error);
      }
      
      setUserProfile({ profile_completed: false });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const handleProfileComplete = () => {
    setUserProfile({ profile_completed: true });
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show homepage for non-authenticated users
  if (!user) {
    return <Homepage />;
  }

  // Show profile details form if user hasn't completed their profile
  if (user && !userProfile?.profile_completed) {
    return <ProfileDetailsForm onComplete={handleProfileComplete} />;
  }

  // Show dashboard for authenticated users with completed profiles
  return <Dashboard />;
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
