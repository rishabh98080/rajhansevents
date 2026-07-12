"use client";

import Link from 'next/link'; // Import from next/link
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src='/logo.jpeg' width="75px" height="75px" alt="Logo" />
      <Link href="/">Home</Link> {/* Use href instead of to */}
      <Link href="/about">About Us</Link>
      <Link href="/services">Our Services</Link>
      <Link href="/packages">Packages</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/testimonials">Testimonials</Link>
    </nav>
  );
}

export default Navbar;