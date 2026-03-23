>   


import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token/session
    const storedUser = localStorage.getItem('theresmac_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Google Sign In
  const signInWithGoogle = async () => {
    // For production, integrate with actual Google OAuth
    // This is a simplified version - use a library like @react-oauth/google
    console.log('Google Sign In triggered');
    
    // Placeholder - would redirect to Google OAuth
    const mockUser = {
      id: 'google_123',
      email: 'user@gmail.com',
      name: 'Google User',
      picture: null,
      provider: 'google'
    };
    
    setUser(mockUser);
    localStorage.setItem('theresmac_user', JSON.stringify(mockUser));
    return mockUser;
  };

  // Apple Sign In  
  const signInWithApple = async () => {
    // For production, integrate with Apple Sign In
    console.log('Apple Sign In triggered');
    
    // Placeholder - would use Apple Sign In JS SDK
    const mockUser = {
      id: 'apple_123',
      email: 'user@icloud.com',
      name: 'Apple User',
      picture: null,
      provider: 'apple'
    };
    
    setUser(mockUser);
    localStorage.setItem('theresmac_user', JSON.stringify(mockUser));
    return mockUser;
  };

  // Email + Password (alternative to OAuth)
  const signInWithEmail = async (email, password) => {
    // For demo purposes - in production, validate against backend
    console.log('Email Sign In:', email);
    
    const mockUser = {
      id: `email_${btoa(email)}`,
      email: email,
      name: email.split('@')[0],
      picture: null,
      provider: 'email'
    };
    
    setUser(mockUser);
    localStorage.setItem('theresmac_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('theresmac_user');
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithApple,
    signInWithEmail,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
