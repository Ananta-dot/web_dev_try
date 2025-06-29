import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const ProfilePictureUpload = ({ currentUrl, onUpload, size = 150 }) => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentUrl) downloadImage(currentUrl);
  }, [currentUrl]);

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

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      // Important: Use user ID as folder for RLS policies
      const filePath = `${user.id}/${fileName}`;

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('File size must be less than 2MB');
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Remove old avatar if exists
      if (currentUrl) {
        await supabase.storage
          .from('avatars')
          .remove([currentUrl]);
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_picture_url: filePath })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Set the new avatar URL for immediate display
      setAvatarUrl(URL.createObjectURL(file));
      onUpload(filePath);
      
    } catch (error) {
      alert(error.message);
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
            style={{ height: size, width: size }}
          />
        ) : (
          <div
            className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-200 dark:border-gray-600"
            style={{ height: size, width: size }}
          >
            {user?.user_metadata?.first_name?.[0] || 'U'}
            {user?.user_metadata?.last_name?.[0] || ''}
          </div>
        )}
        
        {/* Upload button overlay */}
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition duration-200 shadow-lg"
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </label>
      </div>

      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {uploading ? 'Uploading...' : 'Click camera icon to upload'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Max size: 2MB • JPG, PNG, GIF
        </p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
