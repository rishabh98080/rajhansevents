"use client";
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-grid">
        {/* Left Side: Data & Form */}
        <div className="contact-data">
          <p className="sub-text">Inquiries & Consultations</p>
          <form className="luxury-form">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Event Details & Vision" rows="6"></textarea>
            <button type="submit">Submit Request</button>
          </form>

          <div className="location-data">
            <p>Ranchi, Jharkhand, India</p>
            {/* Embedded Google Map */}
                <iframe
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Ranchi,Jharkhand`}
                ></iframe>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="contact-visuals">
          <div className="image-stack">
            <img src="/RJA_0797.JPG.jpeg" alt="Wedding Ceremony" className="main-img" />
            <div className="gold-accent-box"></div>
          </div>
          <p className="caption">Capturing the essence of your sacred ceremony in timeless gold and maroon luxury.</p>
        </div>
      </div>
    </div>
  );
}