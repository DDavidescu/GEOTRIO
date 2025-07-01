import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import "../styles/auth.css";
export default function AuthModal({ onClose, onAuthSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const signUp = async () => {
        setError(null);
        setMessage('');
        if (!email || !password || !username) {
            setError('Please fill in all fields.');
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });
        if (signUpError) {
            setError(signUpError.message);
            return;
        }
        setMessage('Account created! Please check your email to confirm before logging in.');
        setIsLogin(true);
    };
    const logIn = async () => {
        setError(null);
        setMessage('');
        if (!email || !password) {
            setError('Please enter email and password.');
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
            return;
        }
        const user = data.user;
        if (!user) {
            setError('User data not available after login.');
            return;
        }
        const { data: existingProfile, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('id', user.id)
            .maybeSingle();
        if (fetchError) {
            setError('Error checking existing user profile.');
            return;
        }
        if (!existingProfile) {
            const { error: insertError } = await supabase
                .from('users')
                .insert({ id: user.id, username, email });
            if (insertError) {
                setError('Error inserting user profile: ' + insertError.message);
                return;
            }
        }
        onAuthSuccess();
    };
    return (_jsx("div", { className: "auth-modal-overlay", children: _jsxs("div", { className: "auth-card", children: [_jsx("button", { onClick: onClose, className: "auth-button back top-left", children: "\u2190" }), _jsx("h1", { className: "auth-title", children: isLogin ? 'Log In' : 'Register' }), _jsx("p", { className: "auth-privacy-note", children: "We value your privacy. GeoTrio does not sell or share your personal information." }), _jsxs("div", { className: "auth-form", children: [!isLogin && (_jsx(_Fragment, { children: _jsx("input", { className: "auth-input", type: "text", placeholder: "Username", value: username, onChange: e => setUsername(e.target.value) }) })), _jsx("input", { className: "auth-input", type: "email", placeholder: "Email", value: email, onChange: e => setEmail(e.target.value) }), _jsx("input", { className: "auth-input", type: "password", placeholder: "Password", value: password, onChange: e => setPassword(e.target.value) }), _jsx("button", { onClick: isLogin ? logIn : signUp, className: "auth-button primary", children: isLogin ? 'Log In' : 'Sign Up' }), _jsx("button", { onClick: () => setIsLogin(!isLogin), className: "auth-toggle", children: isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in' }), error && _jsx("p", { className: "auth-error", children: error }), message && _jsx("p", { className: "auth-success", children: message })] })] }) }));
}
