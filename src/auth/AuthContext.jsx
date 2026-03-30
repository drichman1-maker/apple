import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Apple sign-in error:', error);
      throw error;
    }
  };

  const signOut = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signInWithGoogle, 
      signInWithApple, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
