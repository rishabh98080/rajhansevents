"use client";

import { useState, useEffect } from 'react'; // Fix 1: Added imports
import Link from 'next/link'; 
import { supabase } from '@/app/api/supabaseClient';
import './Navbar.css';

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Fix 2: Define function outside so it's accessible everywhere
  async function checkAdminStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setIsAdmin(profile?.role === 'admin');
    } else {
      setIsAdmin(false);
    }
  }

  useEffect(() => {
    // Check on initial load
    checkAdminStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        checkAdminStatus();
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <img src='/logo.png' width="100px" height="100px" alt="Logo" loading = 'eager' fetchPriority="high" />
      <Link href="/" fetchPriority="high">Home</Link>
      <Link href="/about" fetchPriority="high">About Us</Link>
      <Link href="/services" fetchPriority="high">Our Services</Link>
      <Link href="/packages" fetchPriority="high">Packages</Link>
      <Link href="/portfolio" fetchPriority="high">Portfolio</Link>
      <Link href="/contact" fetchPriority="high">Contact</Link>
      <Link href="/testimonials" fetchPriority="high">Testimonials</Link>

      {/* Conditional rendering */}
      {isAdmin && <Link href="/Manage">Manage</Link>}
    </nav>
  );
}

export default Navbar;