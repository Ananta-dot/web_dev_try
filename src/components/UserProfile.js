import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (!error) {
        setProfile({ ...profile, ...updates });
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {profile?.first_name?.[0]}{profile?.last_name?.[0]}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 capitalize">
            {profile?.user_type} • {profile?.school_name}
          </p>
          {profile?.user_type === 'student' && (
            <p className="text-sm text-gray-500">
              Class of {profile?.graduation_year}
            </p>
          )}
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {profile?.bio && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About</h3>
          <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
        </div>
      )}

      {/* Profile stats */}
      <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">0</div>
          <div className="text-sm text-gray-500">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">0</div>
          <div className="text-sm text-gray-500">Connections</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">0</div>
          <div className="text-sm text-gray-500">Groups</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
