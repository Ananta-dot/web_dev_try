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
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            console.log('User signed in:', session?.user?.email);
            break;
          case 'SIGNED_OUT':
            console.log('User signed out');
            break;
          case 'PASSWORD_RECOVERY':
            console.log('Password recovery initiated');
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed');
            break;
          case 'USER_UPDATED':
            console.log('User updated');
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
            bio: userData.bio || '',
            subjects: userData.subjects || [],
            extracurriculars: userData.extracurriculars || [],
            achievements: userData.achievements || []
          },
          emailRedirectTo: `${window.location.origin}/verify-email`
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

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
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
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error resending verification:', error);
      return { error };
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { error };
    }
  };

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error updating password:', error);
      return { error };
    }
  };

  // Update user metadata
  const updateUserMetadata = async (metadata) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: metadata
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error updating user metadata:', error);
      return { data: null, error };
    }
  };

  // Check if profile is complete
  const checkProfileComplete = async (userId = null) => {
    try {
      const userIdToCheck = userId || user?.id;
      if (!userIdToCheck) return false;

      const { data, error } = await supabase
        .from('users')
        .select('profile_completed, onboarding_step')
        .eq('id', userIdToCheck)
        .single();

      if (error) {
        console.error('Error checking profile completion:', error);
        return false;
      }

      return data?.profile_completed || false;
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return false;
    }
  };

  // Get user profile from database
  const getUserProfile = async (userId = null) => {
    try {
      const userIdToCheck = userId || user?.id;
      if (!userIdToCheck) return null;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userIdToCheck)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Update user profile in database
  const updateUserProfile = async (updates, userId = null) => {
    try {
      const userIdToUpdate = userId || user?.id;
      if (!userIdToUpdate) {
        throw new Error('No user ID provided');
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userIdToUpdate)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { data: null, error };
    }
  };

  // Check if user is verified (email confirmed)
  const isUserVerified = () => {
    return user?.email_confirmed_at !== null;
  };

  // Check if user needs parental consent (under 16)
  const needsParentalConsent = async () => {
    try {
      if (!user?.id) return false;

      const profile = await getUserProfile();
      return profile?.age && profile.age < 16;
    } catch (error) {
      console.error('Error checking parental consent requirement:', error);
      return false;
    }
  };

  // Get user's age-appropriate restrictions
  const getAgeRestrictions = async () => {
    try {
      if (!user?.id) return null;

      const profile = await getUserProfile();
      if (!profile?.age) return null;

      return {
        canMessage: profile.age >= 13,
        maxConnections: profile.age < 16 ? 50 : 500,
        needsParentalConsent: profile.age < 16,
        canJoinGroups: profile.age >= 12,
        maxGroupsPerMonth: profile.age < 16 ? 3 : 10
      };
    } catch (error) {
      console.error('Error getting age restrictions:', error);
      return null;
    }
  };

  // Refresh user session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error refreshing session:', error);
      return { data: null, error };
    }
  };

  // Helper function to get user's display name
  const getUserDisplayName = () => {
    if (!user) return '';
    
    const metadata = user.user_metadata || {};
    const firstName = metadata.first_name || '';
    const lastName = metadata.last_name || '';
    
    return `${firstName} ${lastName}`.trim() || user.email || 'User';
  };

  // Helper function to get user's role
  const getUserRole = () => {
    return user?.user_metadata?.user_type || 'student';
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
    
    // Email verification
    resendVerification,
    isUserVerified,
    
    // Password management
    resetPassword,
    updatePassword,
    
    // Profile management
    checkProfileComplete,
    getUserProfile,
    updateUserProfile,
    updateUserMetadata,
    
    // Age-based features
    needsParentalConsent,
    getAgeRestrictions,
    
    // Utility methods
    refreshSession,
    getUserDisplayName,
    getUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
