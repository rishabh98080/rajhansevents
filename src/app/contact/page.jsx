"use client";

import { useState, useEffect } from "react"; 
import { supabase } from "../api/supabaseClient"; 
import "./Contact.css"; 

export default function Contact() {
  const [contactData, setContactData] = useState(null); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    eventDate: "",
    guests: "",
    budget: "",
    message: "",
  }); 

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

    const body = `Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Event Type: ${form.eventType}
Event Date: ${form.eventDate}
Guests: ${form.guests}
Budget: ${form.budget}
Date & Time Submitted: ${now.toLocaleString()}

Vision/Comments:
${form.message}`; 

    const subject = `New Enquiry from ${form.name}`; 
    
    const targetEmail = contactData?.email || "rajhanshevent@gmail.com"; 

    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`; 
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        
        {/* REDESIGNED HEADER */}
        <div className="elegant-section-header">
          <span className="section-kicker">— GET IN TOUCH</span>
          <h1 className="elegant-section-title">Let's plan something unforgettable.</h1>
          <p className="contact-subtitle">Share a few details and our planner will reach out within 24 hours.</p>
        </div>

        {/* Main Grid Layout */}
        <div className="contact-grid">
          
          {/* Left Column: Form */}
          <div className="form-card">
            <form className="luxury-form" onSubmit={handleSubmit}> 
              
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name <span>*</span></label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required /> 
                </div>
                <div className="form-group">
                  <label>Email Address <span>*</span></label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required /> 
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number <span>*</span></label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required /> 
                </div>
                <div className="form-group">
                  <label>Event Type <span>*</span></label>
                  <select name="eventType" value={form.eventType} onChange={handleChange}> 
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Birthday">Birthday/Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Event Date</label>
                  <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} /> 
                </div>
                <div className="form-group">
                  <label>Approx. Guests</label>
                  <input type="number" name="guests" value={form.guests} onChange={handleChange} placeholder="e.g. 500" /> 
                </div>
              </div>

              <div className="form-group">
                <label>Budget Range</label>
                <select name="budget" value={form.budget} onChange={handleChange}> 
                  <option value="">— Select a range —</option>
                  <option value="Under 5L">Under 5 Lakhs</option>
                  <option value="5L - 15L">5 Lakhs - 15 Lakhs</option>
                  <option value="15L - 30L">15 Lakhs - 30 Lakhs</option>
                  <option value="30L+">30 Lakhs +</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tell us about your vision</label>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} required></textarea> 
              </div>

              <button type="submit" className="btn-primary">Submit Enquiry</button> 
            </form>
          </div>

          {/* Right Column: Sidebar */}
          <div className="sidebar">
            
            {/* Direct Line Card */}
            <div className="direct-line-card">
              <h3>Direct Line</h3> 
              <h2>Get in touch, instantly.</h2> 
              <ul className="contact-info-list">
                <li>📍 {contactData?.location || "Ranchi, Jharkhand 834001"}</li> 
                <li>📞 {contactData?.phone || "+91 90060 89331"}</li> 
                <li>✉️ {contactData?.email || "rajhanshevent@gmail.com"}</li> 
                <li>🕒 Mon – Sun • 9:00 AM to 9:00 PM</li> 
              </ul>
              
              <div className="action-buttons">
                <a href={`https://wa.me/${(contactData?.phone || "919006089331").replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="btn-whatsapp"> 
                  WhatsApp
                </a>
                <a href={`tel:${contactData?.phone || "+919006089331"}`} className="btn-call"> 
                  Call Now
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Full Width Map Section */}
        <div className="map-section">
          <iframe
            title="Rajhans Events Location" 
            src="https://www.google.com/maps?q=Ranchi,Jharkhand&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            allowFullScreen 
          />
        </div>

      </div>
    </div>
  );
}