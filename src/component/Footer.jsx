import React from 'react';
import './Footer.css';
import logo from './assets/logo.jpeg';
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        
        {/* Column 1: Brand & Socials */}
        <div className="footer-column brand-column">
          <div className="footer-logo">
            <img src = {logo} width = "200px" height = "200px"></img> {/* Placeholder for the golden bird logo */}
          </div>
          <p className="brand-tagline">
            We create extraordinary experiences<br />
            that stay with you forever.
          </p>
          <div className="social-icons">
            <a href="#fb">f</a>
            <a href="#tw">t</a>
            <a href="#pi">p</a>
            <a href="#go">g</a>
            <a href="#li">in</a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3 className="column-title">QUICK LINKS</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#packages">Packages</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div className="footer-column">
          <h3 className="column-title">OUR SERVICES</h3>
          <ul className="footer-links">
            <li><a href="#weddings">Weddings</a></li>
            <li><a href="#corporate">Corporate Events</a></li>
            <li><a href="#social">Social Events</a></li>
            <li><a href="#destination">Destination Weddings</a></li>
            <li><a href="#entertainment">Entertainment & Artists</a></li>
            <li><a href="#venue">Venue Management</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-column">
          <h3 className="column-title">CONTACT INFO</h3>
          <ul className="contact-info">
            <li>
              <span className="gold-icon">📞</span> +91 99994 65250
            </li>
            <li>
              <span className="gold-icon">✉️</span> hello@rajhansh.com
            </li>
            <li>
              <span className="gold-icon">📍</span> 301, Royal Street, London,<br />United Kingdom
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
        <p>&copy; 2026 Raj Hansh Event Management. All Rights Reserved.</p>
        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;