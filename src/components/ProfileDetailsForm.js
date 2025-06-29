import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ProfilePictureUpload from './ProfilePictureUpload';

const ProfileDetailsForm = ({ onComplete, allowSkip = true }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    age: '',
    schoolName: '',
    graduationYear: '',
    profilePictureUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarUpload = (filePath) => {
    setFormData({ ...formData, profilePictureUrl: filePath });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const updates = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: formData.age ? parseInt(formData.age) : null,
        school_name: formData.schoolName,
        graduation_year: formData.graduationYear ? parseInt(formData.graduationYear) : null,
        profile_picture_url: formData.profilePictureUrl,
        profile_completed: true
      };

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        setError(error.message);
      } else {
        onComplete();
      }
    } catch (err) {
      setError('Failed to update profile details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      setLoading(true);
      // Mark profile as "skipped" but allow access to dashboard
      const { error } = await supabase
        .from('users')
        .update({ 
          profile_completed: true, // Allow dashboard access
          profile_skipped: true    // Track that it was skipped
        })
        .eq('id', user.id);

      if (error) throw error;
      onComplete();
    } catch (err) {
      setError('Failed to skip setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">HS</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Help others get to know you better
          </p>
          {allowSkip && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You can always complete this later
            </p>
          )}
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-6">
          <ProfilePictureUpload
            currentUrl={formData.profilePictureUrl}
            onUpload={handleAvatarUpload}
            size={120}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="10"
              max="18"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              School Name
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your school name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Expected Graduation Year
            </label>
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select graduation year</option>
              {Array.from({ length: 12 }, (_, i) => 2024 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Button Group */}
          <div className="space-y-3 mt-6">
            <button
              type="submit"
              disabled={loading || !formData.firstName || !formData.lastName}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save & Continue'}
            </button>
            
            {allowSkip && (
              <button
                type="button"
                onClick={handleSkip}
                disabled={loading}
                className="w-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? 'Skipping...' : 'Skip for Now'}
              </button>
            )}
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You can update these details anytime in your profile settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
