import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import EditProfile from './EditProfile';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        if (data.profile_picture_url) {
          downloadImage(data.profile_picture_url);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      
      if (error) throw error;
      
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  };

  const handleProfileUpdate = () => {
    fetchProfile(); // Refresh profile data
  };

  if (loading) return <div className="text-center py-8">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {profile?.first_name?.[0] || 'U'}
                  {profile?.last_name?.[0] || ''}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile?.first_name || 'User'} {profile?.last_name || ''}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 capitalize">
                Student • {profile?.school_name || 'ScholarConnect Member'}
              </p>
              {profile?.age && (
                <p className="text-sm text-gray-500">
                  Age: {profile.age} {profile?.graduation_year && `• Class of ${profile.graduation_year}`}
                </p>
              )}
            </div>
          </div>
          
          {/* Edit Profile Button */}
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile incomplete notification */}
        {profile?.profile_skipped && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center">
              <div className="text-yellow-600 dark:text-yellow-400 mr-3">⚠️</div>
              <div>
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Complete your profile
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Add more details to help others get to know you better!
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="ml-auto bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
              >
                Complete Now
              </button>
            </div>
          </div>
        )}

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

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfile
          onClose={() => setShowEditModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default UserProfile;
