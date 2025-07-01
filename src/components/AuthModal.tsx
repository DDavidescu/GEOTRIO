import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import "../styles/auth.css"

interface AuthModalProps {
  onClose: () => void
  onAuthSuccess: () => void
}

export default function AuthModal({ onClose, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  
  const signUp = async () => {
    setError(null)
    setMessage('')

    if (!email || !password || !username) {
      setError('Please fill in all fields.')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    
    setMessage('Account created! Please check your email to confirm before logging in.')
    setIsLogin(true)
  }

 
  const logIn = async () => {
    setError(null)
    setMessage('')

    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      return
    }

    const user = data.user
    if (!user) {
      setError('User data not available after login.')
      return
    }

   
    const { data: existingProfile, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle()

    if (fetchError) {
      setError('Error checking existing user profile.')
      return
    }

    if (!existingProfile) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({ id: user.id, username, email })

      if (insertError) {
        setError('Error inserting user profile: ' + insertError.message)
        return
      }
    }

    onAuthSuccess()
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-card">
        <button onClick={onClose} className="auth-button back top-left">←</button>
        <h1 className="auth-title">{isLogin ? 'Log In' : 'Register'}</h1>
          <p className="auth-privacy-note">
            We value your privacy. GeoTrio does not sell or share your personal information.
          </p>
        <div className="auth-form">
          {!isLogin && (
            <>
              <input
                className="auth-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </>
          )}
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={isLogin ? logIn : signUp} className="auth-button primary">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
          <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}
        </div>
      </div>
    </div>
  )
}
