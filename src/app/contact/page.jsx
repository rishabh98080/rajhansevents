"use client";

import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import "./Contact.css";

export default function Contact() {
  const [contactData, setContactData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fetch the live contact info from Supabase when the component mounts
  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .eq("identifier", "contact_main")
        .single();

      if (!error && data) {
        setContactData(data);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();

    const body = `Name:
${form.name}

Email:
${form.email}

Date & Time:
${now.toLocaleString()}

Comments:
${form.message}`;

    const subject = `New Enquiry from ${form.name}`;
    
    // Use the dynamic email from CMS, or fallback to default
    const targetEmail = contactData?.email || "hello@rajhans.com";

    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="contact-page">
      <div className="contact-grid">
        <div className="contact-data">
          <p className="sub-text">Inquiries & Consultations</p>

          <form className="luxury-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Event Details & Vision"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Enquiry</button>
          </form>

          <div className="location-data">
            {/* Dynamic Location from CMS */}
            <p>Our Studio: {contactData?.location || "Ranchi, Jharkhand, India"}</p>
            
            {/* Optional CMS Fields: Phone & Socials */}
            {contactData?.phone && <p>Phone: {contactData.phone}</p>}
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', marginBottom: '20px' }}>
              {contactData?.insta && (
                <a href={contactData.insta} target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>Instagram</a>
              )}
              {contactData?.fb && (
                <a href={contactData.fb} target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>Facebook</a>
              )}
            </div>

            <div className="map-container">
              <iframe
                title="Rajhans Events Location"
                src="https://www.google.com/maps?q=Ranchi,Jharkhand&output=embed"
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="contact-visuals">
          <div className="image-stack">
            <img loading="lazy"
              src="https://uvoapeploerjdonrrbtp.supabase.co/storage/v1/object/sign/Data/CFW05290.JPG.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mY2M5Y2UyMS0zZTFlLTRlMDQtYTlkYy0yNzVjNjFmNjkyY2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEYXRhL0NGVzA1MjkwLkpQRy5qcGVnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NDE4MzcwOCwiZXhwIjoxODE1NzE5NzA4fQ.fgQW9WfHuqp4CqcDHFLQ5uZ4bhdgtM773fO__XhWm2Y"
              alt="Rajhans Events"
              className="main-img"
            />
            <div className="gold-accent-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
}