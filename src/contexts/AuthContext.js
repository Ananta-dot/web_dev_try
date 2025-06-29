import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Initial session:', session?.user?.email || 'No user');
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Session error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user');
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            console.log('User signed in:', session?.user?.email);
            break;
          case 'SIGNED_OUT':
            console.log('User signed out, clearing state and redirecting');
            setUser(null);
            setSession(null);
            // Clear any additional local storage if needed
            localStorage.removeItem('supabase.auth.token');
            // Force redirect to homepage
            setTimeout(() => {
              window.location.href = '/';
            }, 100);
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed');
            break;
          default:
            break;
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign up with email and password
  const signUp = async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            user_type: userData.user_type || 'student',
            age: userData.age || null,
            parent_email: userData.parent_email || null,
            school_name: userData.school_name || '',
            graduation_year: userData.graduation_year || null,
            bio: userData.bio || ''
          },
          emailRedirectTo: `${window.location.origin}`
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { data: null, error };
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error };
    }
  };

  // Sign out - Multiple approaches for reliability
  const signOut = async () => {
    try {
      console.log('Starting signout process...');
      
      // Method 1: Try global signout first
      const { error: globalError } = await supabase.auth.signOut({ scope: 'global' });
      
      if (globalError) {
        console.warn('Global signout failed, trying local signout:', globalError);
        
        // Method 2: Try local signout
        const { error: localError } = await supabase.auth.signOut({ scope: 'local' });
        
        if (localError) {
          console.error('Local signout also failed:', localError);
          
          // Method 3: Force signout by clearing everything manually
          console.log('Forcing manual signout...');
          
          // Clear all possible storage
          localStorage.clear();
          sessionStorage.clear();
          
          // Clear Supabase specific items
          const keys = Object.keys(localStorage);
          keys.forEach(key => {
            if (key.startsWith('supabase') || key.startsWith('sb-')) {
              localStorage.removeItem(key);
            }
          });
          
          // Update state manually
          setUser(null);
          setSession(null);
          
          // Force redirect
          window.location.href = '/';
          
          return { error: null };
        }
      }
      
      console.log('Signout successful');
      return { error: null };
      
    } catch (error) {
      console.error('Signout error:', error);
      
      // Even if there's an error, try to clear local state and redirect
      console.log('Signout failed, but clearing local state anyway...');
      
      // Clear storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Update state
      setUser(null);
      setSession(null);
      
      // Force redirect
      window.location.href = '/';
      
      return { error };
    }
  };

  // Force signout - Nuclear option
  const forceSignOut = () => {
    console.log('Force signout initiated...');
    
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies (if any)
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Update state
    setUser(null);
    setSession(null);
    
    // Force page reload to ensure clean state
    window.location.href = '/';
  };

  // Resend verification email
  const resendVerification = async (email = null) => {
    try {
      const emailToUse = email || user?.email;
      if (!emailToUse) {
        throw new Error('No email provided');
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: emailToUse,
        options: {
          emailRedirectTo: `${window.location.origin}`
        }
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error resending verification:', error);
      return { error };
    }
  };

  // Check if user is verified
  const isUserVerified = () => {
    return user?.email_confirmed_at !== null;
  };

  // Get user's display name
  const getUserDisplayName = () => {
    if (!user) return '';
    
    const metadata = user.user_metadata || {};
    const firstName = metadata.first_name || '';
    const lastName = metadata.last_name || '';
    
    return `${firstName} ${lastName}`.trim() || user.email || 'User';
  };

  const value = {
    // User state
    user,
    session,
    loading,
    
    // Authentication methods
    signUp,
    signIn,
    signOut,
    forceSignOut, // Nuclear option
    
    // Email verification
    resendVerification,
    isUserVerified,
    
    // Utility methods
    getUserDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
