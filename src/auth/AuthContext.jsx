import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase-config.json';

// Initialize Firebase
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log('[Firebase] Initialized successfully');
} catch (error) {
  console.error('[Firebase] Initialization error:', error);
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authInitialized = useRef(false);

  useEffect(() => {
    if (!auth) {
      console.error('[Auth] Firebase auth not initialized');
      setLoading(false);
      return;
    }

    if (authInitialized.current) return;
    authInitialized.current = true;

    console.log('[Auth] Setting up auth state listener...');
    
    // Use indexedDB for mobile (better than localStorage for partitioned storage)
    const persistence = window.matchMedia('(pointer: coarse)').matches 
      ? indexedDBLocalPersistence 
      : browserLocalPersistence;
    
    setPersistence(auth, persistence)
      .then(() => console.log('[Auth] Persistence set'))
      .catch(err => console.error('[Auth] Persistence error:', err));
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('[Auth] Auth state:', currentUser ? `User: ${currentUser.email}` : 'No user');
      setUser(currentUser);
      setLoading(false);
    }, (err) => {
      console.error('[Auth] Auth state error:', err);
      setError(err.message);
      setLoading(false);
    });

    return () => {
      console.log('[Auth] Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      console.error('[Auth] Firebase not initialized');
      setError('Firebase not initialized');
      return;
    }

    console.log('[Auth] Starting Google sign-in...');
    
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      // Force re-authentication to avoid session issues
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      console.log('[Auth] Sign-in success:', result.user.email);
      setUser(result.user);
      setError(null);
      return result.user;
    } catch (err) {
      console.error('[Auth] Sign-in error:', err.code, err.message);
      
      // Better error messages
      let errorMsg = err.message;
      if (err.code === 'auth/popup-blocked') {
        errorMsg = 'Popup blocked. Please allow popups for this site.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMsg = 'Sign-in cancelled. Please try again.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in window closed. Please try again.';
      }
      
      setError(errorMsg);
      throw err;
    }
  };

  const signInWithApple = async () => {
    setError('Apple sign-in temporarily unavailable. Please use Google.');
    throw new Error('Apple sign-in disabled');
  };

  const signOut = async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
      console.log('[Auth] Signed out');
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('[Auth] Sign out error:', err);
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, signInWithApple, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
