import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginButton = () => {
  const { user, signInWithGoogle, signOut, loading, error } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Sign in failed:', err);
    } finally {
      setIsSigningIn(false);
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img 
          src={user.photoURL || '/default-avatar.png'} 
          alt={user.displayName || 'User'} 
          className="w-8 h-8 rounded-full"
          onError={(e) => { e.target.src = '/default-avatar.png'; }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium truncate max-w-[150px]">
            {user.displayName || user.email}
          </p>
        </div>
        <button
          onClick={signOut}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {error && (
        <span className="text-xs text-red-400 mr-2 hidden md:inline max-w-[150px] truncate" title={error}>
          {error.includes('popup-closed') ? 'Cancelled' : 
           error.includes('configuration-not-found') ? 'Setup needed' : 
           'Error'}
        </span>
      )}
      <button
        onClick={handleGoogleSignIn}
        disabled={isSigningIn}
        className="flex items-center gap-2 px-3 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
        title="Sign in with Google"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="hidden sm:inline">{isSigningIn ? '...' : 'Sign in'}</span>
      </button>
      {/* Apple Sign In - Disabled pending Apple Developer Program setup */}
      {/* TODO: Enable Apple Sign In after Apple Developer account setup */}
    </div>
  );
};

export default LoginButton;
