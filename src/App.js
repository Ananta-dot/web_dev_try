import React, { useState, useEffect } from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import ProfileDetailsForm from './components/ProfileDetailsForm';
import EmailVerification from './components/EmailVerification';
import { supabase } from './lib/supabase';
import './index.css';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    // Handle route changes
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
      setProfileLoading(false);
    }
  }, [user]);

  // Handle email verification route
  if (currentRoute === '/verify' || window.location.search.includes('token')) {
    return <EmailVerification />;
  }

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('profile_completed, first_name, last_name')
        .eq('id', user.id)
        .single();

      if (data) {
        setUserProfile(data);
      } else if (error && error.code === 'PGRST116') {
        await createUserProfile();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      await createUserProfile();
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

      if (error && error.code !== '23505') {
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

  if (loading || (user && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Homepage />;
  }

  if (user && userProfile && !userProfile.profile_completed) {
    return <ProfileDetailsForm onComplete={handleProfileComplete} />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <div className="App overscroll-none">
          <AppContent />
        </div>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
