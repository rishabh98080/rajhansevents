"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css';
import { supabase } from '@/app/api/supabaseClient';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        if (profile?.role === 'admin') setIsAdmin(true);
      }
      setChecking(false);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    window.location.reload(); // Refresh to update Navbar state
  };

  // NEW: Handle inactivity and tab close
  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      // 20 minutes = 20 * 60 * 1000 = 1200000 milliseconds
      inactivityTimer = setTimeout(() => {
        handleLogout();
      }, 1200000); 
    };

    const handleTabClose = () => {
      // Best-effort synchronous logout on tab close
      supabase.auth.signOut();
    };

    // Only attach these listeners if the user is actually logged in
    if (isAdmin) {
      // Listen for basic user interactions to reset the 20-min timer
      const activityEvents = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
      
      activityEvents.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });

      // Listen for the window/tab closing
      window.addEventListener('beforeunload', handleTabClose);

      // Start the timer initially
      resetTimer();

      // Cleanup function when the component unmounts or state changes
      return () => {
        clearTimeout(inactivityTimer);
        activityEvents.forEach((event) => {
          window.removeEventListener(event, resetTimer);
        });
        window.removeEventListener('beforeunload', handleTabClose);
      };
    }
  }, [isAdmin]);

  const verifyAdminRole = async (userId) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profile?.role === 'admin') {
      router.push('/');
    } else {
      await supabase.auth.signOut();
      setError('Access Denied: You are not an authorized admin.');
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      await verifyAdminRole(data.user.id);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError('Google login failed');
      setLoading(false);
    }
  };

  if (checking) return <div>Loading...</div>;

  return (
    <div className="admin-login-container">
      {isAdmin ? (
        <div>
          <h2>You are already logged in as Admin</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      ) : (
        <>
          <h2>Admin Access Only</h2>
          <form onSubmit={handleEmailLogin}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? 'Authenticating...' : 'Login'}</button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogleLogin} className="google-btn" disabled={loading}>
            Login with Google
          </button>
        </>
      )}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}