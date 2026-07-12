import React from 'react';
import './Testimonials.css';


export const metadata = {
  title: "Client Testimonials | Trusted Event Planners",
  description: "Read what our happy clients have to say about their experiences with Raj Hansh Event. Your satisfaction is our success.",
};

export default function Testimonials() {
  // Enhanced original reviews to mimic Google Reviews[cite: 10]
  const googleReviews = [
    { 
      id: 1, 
      name: 'Anjali Mehta', 
      text: "Raj Hansh Event Management made our wedding a dream come true. Everything was beyond perfect!", 
      platform: 'Google Review' 
    },
    { 
      id: 2, 
      name: 'Vikram Singh', 
      text: "Incredible corporate event execution. The team handled the 500+ guests flawlessly.", 
      platform: 'Google Review' 
    },
    { 
      id: 3, 
      name: 'Neha & Rohit', 
      text: "From decor to catering, every detail was handled with immense care. Highly recommended!", 
      platform: 'Google Review' 
    }
  ];

  // Video placeholders[cite: 10]
  const videoTestimonials = [
    { id: 1, url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'The Sharma Wedding' },
    { id: 2, url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'TechCorp Gala 2025' }
  ];

  // New Client Photos section
  const clientPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', alt: 'Happy Couple' },
    { id: 2, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800', alt: 'Corporate Team' },
    { id: 3, url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800', alt: 'Anniversary Celebration' }
  ];

  return (
    <main className="testimonials-page">
      
      {/* --- Section 1: Google Reviews --- */}
      <section className="testimonials-container">
        <div className="section-header">
          <h1 className="section-title">What Our Clients Say</h1>
          <p className="section-subtitle">Real stories from our unforgettable events.</p>
        </div>
        
        <div className="reviews-grid">
          {googleReviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="review-text">{review.text}</p>
              <h4 className="review-author">- {review.name}</h4>
              <span className="review-platform">
                <span className="google-icon">G</span> {review.platform}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 2: Video Testimonials --- */}
      <section className="video-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2 className="section-title text-light">Watch Their Experience</h2>
            <p className="section-subtitle text-gold">Hear directly from our happy clients.</p>
          </div>
          
          <div className="video-grid">
            {videoTestimonials.map(video => (
              <div key={video.id} className="video-card">
                <video src={video.url} className="video-player" controls playsInline />
                <div className="video-caption">
                  <h3>{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Client Photos --- */}
      <section className="testimonials-container gallery-section">
        <div className="section-header">
          <h2 className="section-title">Smiles We've Created</h2>
          <p className="section-subtitle">A picture is worth a thousand words.</p>
        </div>
        
        <div className="photo-grid">
          {clientPhotos.map(photo => (
            <div key={photo.id} className="photo-card">
              <img src={photo.url} alt={photo.alt} className="client-image" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}