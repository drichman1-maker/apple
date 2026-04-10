import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './client'

const SupabaseAuthContext = createContext(null)

export function SupabaseAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if supabase is properly configured
    if (!supabase?.auth?.getSession) {
      console.warn('[SupabaseAuth] Supabase not configured, skipping auth')
      setLoading(false)
      return
    }

    // Handle OAuth callback hash if present (for mobile redirect flow)
    const handleCallback = async () => {
      try {
        // Check if there's a hash fragment (OAuth callback)
        if (window.location.hash && window.location.hash.includes('access_token')) {
          console.log('[SupabaseAuth] Detected OAuth callback hash')
          // Supabase automatically extracts tokens from hash on init
          // but we need to give it a moment to process
          await new Promise(resolve => setTimeout(resolve, 500))
        }

        // Check active session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('[SupabaseAuth] getSession error:', sessionError)
        } else if (session?.user) {
          console.log('[SupabaseAuth] Session restored:', session.user.email)
          setUser(session.user)
        } else {
          console.log('[SupabaseAuth] No active session')
          setUser(null)
        }
      } catch (err) {
        console.error('[SupabaseAuth] Error in callback handler:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    handleCallback()

    // Listen for auth changes
    let subscription = null
    try {
      const result = supabase.auth.onAuthStateChange((event, session) => {
        console.log('[SupabaseAuth] Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      subscription = result?.data?.subscription
    } catch (err) {
      console.error('[SupabaseAuth] onAuthStateChange error:', err)
    }

    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signInWithGoogle = async (redirectPath = '/alerts') => {
    try {
      setError(null)
      // Store where the user was trying to go
      localStorage.setItem('auth_redirect', redirectPath)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })
      if (error) throw error
    } catch (err) {
      setError(err.message)
      console.error('Google sign in error:', err)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err) {
      setError(err.message)
      console.error('Sign out error:', err)
    }
  }

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut
  }

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext)
  if (!context) {
    throw new Error('useSupabaseAuth must be used within SupabaseAuthProvider')
  }
  return context
}
