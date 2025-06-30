import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Get the token from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const type = urlParams.get('type');

        if (!token || !type) {
          setStatus('error');
          setMessage('Invalid verification link');
          return;
        }

        // Verify the token
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type
        });

        if (error) {
          setStatus('error');
          setMessage('Email verification failed: ' + error.message);
        } else {
          setStatus('success');
          setMessage('Email verified successfully! Redirecting...');
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      } catch (error) {
        setStatus('error');
        setMessage('An unexpected error occurred');
        console.error('Verification error:', error);
      }
    };

    handleEmailVerification();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Verifying Email
              </h2>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-green-600 mb-2">
                Email Verified!
              </h2>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="text-red-500 text-5xl mb-4">✗</div>
              <h2 className="text-xl font-semibold text-red-600 mb-2">
                Verification Failed
              </h2>
            </>
          )}
          
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
          
          {status === 'error' && (
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Go to Homepage
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
