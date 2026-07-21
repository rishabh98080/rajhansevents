"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/app/api/supabaseClient';
import Image from 'next/image'; // Ensure this path matches your setup
import './Footer.css';

const Footer = () => {
  const [contactData, setContactData] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      // Fetch Contact Info
      const { data: contact } = await supabase
        .from('contact_info')
        .select('*')
        .eq('identifier', 'contact_main')
        .single();
      
      if (contact) setContactData(contact);

      // Fetch Logo from Home Content
      const { data: home } = await supabase
        .from('home_content')
        .select('logo_url')
        .eq('identifier', 'home_main')
        .single();
        
      if (home) setHomeData(home);

      // Fetch the first 6 Services to populate the links
      const { data: services } = await supabase
        .from('services')
        .select('title')
        .order('created_at', { ascending: true })
        .limit(6);
        
      if (services) setServicesList(services);
    };

    fetchFooterData();
  }, []);

  // Fallbacks for services if the DB is empty
  const displayServices = servicesList.length > 0 
    ? servicesList.map(s => s.title)
    : ['Weddings', 'Corporate Events', 'Social Events', 'Destination Weddings', 'Entertainment & Artists', 'Venue Management'];

  return (
    <footer className="site-footer">
      <div className="footer-main">
        
        {/* Column 1: Brand & Socials */}
        <div className="footer-column brand-column">
          <div className="footer-logo">
            {/* Dynamic Logo */}
            <Image src={homeData?.logo_url || '/logo.png'} width="200" height="200" alt="Raj Hansh Logo" fetchPriority="high" loading = 'eager'/>
          </div>
          <p className="brand-tagline">
            We create extraordinary experiences<br />
            that stay with you forever.
          </p>
          <div className="social-icons">
            {contactData?.fb && <a href={contactData.fb} target="_blank" rel="noreferrer">f</a>}
            {contactData?.insta && <a href={contactData.insta} target="_blank" rel="noreferrer">in</a>}
            {/* Keep placeholders if you want them, or map them to future DB columns */}
            <a href="#tw" aria-label="Twitter">
              <img src = "https://cdn-icons-png.flaticon.com/128/5968/5968958.png" width = {15} alt = "Twitter"/>
            </a>
            <a href="/facebook.com" aria-label="FaceBook">
              <img src = "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-square-black-icon.png" width = {20} alt = "Facebook"/>
            </a>
            <a href="#go" aria-label="Instagram">
              <img src = "https://cdn-icons-png.flaticon.com/128/1384/1384031.png" width = {20} alt = "Instagram"/>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3 className="column-title">QUICK LINKS</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/packages">Packages</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Our Services (Dynamic) */}
        <div className="footer-column">
          <h3 className="column-title">OUR SERVICES</h3>
          <ul className="footer-links">
            {displayServices.map((serviceName, index) => (
              <li key={index}><a href="/services">{serviceName}</a></li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info (Dynamic) */}
        <div className="footer-column">
          <h3 className="column-title">CONTACT INFO</h3>
          <ul className="contact-info">
            <li>
              <span className="gold-icon">📞</span> {contactData?.phone || '+91 90060 89331'}
            </li>
            <li>
              <span className="gold-icon">✉️</span> {contactData?.email || 'hello@rajhansh.com'}
            </li>
            <li>
              <span className="gold-icon">📍</span> {contactData?.location || 'Ranchi, Jharkhand, India'}
            </li>
          </ul>
        </div>

        {/* Column 5: Newsletter */}
        <div className="footer-column newsletter-column">
          <h3 className="column-title">NEWSLETTER</h3>
          <p>Subscribe for updates & offers</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        {/* Dynamic Year */}
        <p>&copy; {new Date().getFullYear()} Raj Hansh Event Management. All Rights Reserved.</p>
        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;