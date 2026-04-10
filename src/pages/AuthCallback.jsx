import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth'

export default function AuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(null)
  const [processed, setProcessed] = useState(false)

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Prevent double-processing
      if (processed) return;
      
      try {
        const auth = getAuth()
        console.log('[AuthCallback] Checking redirect result...')
        
        // First try to get the redirect result
        const result = await getRedirectResult(auth)
        
        if (result?.user) {
          console.log('[AuthCallback] User authenticated via redirect:', result.user.email)
          setProcessed(true)
          const redirectTo = localStorage.getItem('auth_redirect') || '/alerts'
          localStorage.removeItem('auth_redirect')
          navigate(redirectTo, { replace: true })
          return
        }
        
        // If no redirect result, check current auth state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('[AuthCallback] User already signed in:', user.email)
            setProcessed(true)
            const redirectTo = localStorage.getItem('auth_redirect') || '/alerts'
            localStorage.removeItem('auth_redirect')
            navigate(redirectTo, { replace: true })
          } else if (!processed) {
            // No user found and no redirect result - assume this is a direct visit
            console.log('[AuthCallback] No auth data found, redirecting to home')
            setProcessed(true)
            navigate('/', { replace: true })
          }
        })

        return () => unsubscribe()
      } catch (err) {
        console.error('[AuthCallback] Error:', err)
        setError(err.message)
        setProcessed(true)
      }
    }

    handleAuthCallback()
  }, [navigate, processed])

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-white mb-2">Sign In Failed</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Completing sign in...</p>
      </div>
    </div>
  )
}
