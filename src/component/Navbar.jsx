"use client";

import { useState, useEffect } from 'react'; // Fix 1: Added imports
import Link from 'next/link'; 
import { supabase } from '@/pages/api/supbaseClient';
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
      <img src='/logo.jpeg' width="75px" height="75px" alt="Logo" />
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/services">Our Services</Link>
      <Link href="/packages">Packages</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/testimonials">Testimonials</Link>
      
      {/* Conditional rendering */}
      {isAdmin && <Link href="/Manage">Manage</Link>}
    </nav>
  );
}

export default Navbar;