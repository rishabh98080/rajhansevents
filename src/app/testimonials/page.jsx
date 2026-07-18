import React from 'react'; 
import { supabase } from '../api/supabaseClient'; 
import './Testimonials.css'; 

export const metadata = {
  title: "Raj Hansh", 
  description: "Read what our happy clients have to say about their experiences with Raj Hansh Event. Your satisfaction is our success.", 
};

export default async function Testimonials() {
  // Fetch all testimonials data from Supabase in parallel - UNTOUCHED LOGIC
  const [
    { data: testimonialsData }, 
    { data: experiencesData }, 
    { data: smilesData } 
  ] = await Promise.all([
    supabase.from('testimonials').select('*').order('created_at', { ascending: true }), 
    supabase.from('experiences').select('*').order('created_at', { ascending: true }), 
    supabase.from('smiles').select('*').order('created_at', { ascending: true }) 
  ]);

  // Enhanced original reviews to mimic Google Reviews used as fallbacks
  const fallbackReviews = [
    { 
      identifier: 'rev-1', 
      name: 'Anjali Mehta', 
      comment: "Raj Hansh Event Management made our wedding a dream come true. Everything was beyond perfect!", 
      stars: 5, 
      platform: 'Google Review'  
    },
    { 
      identifier: 'rev-2', 
      name: 'Vikram Singh', 
      comment: "Incredible corporate event execution. The team handled the 500+ guests flawlessly.", 
      stars: 5, 
      platform: 'Google Review'  
    },
    { 
      identifier: 'rev-3', 
      name: 'Neha & Rohit', 
      comment: "From decor to catering, every detail was handled with immense care. Highly recommended!", 
      stars: 5, 
      platform: 'Google Review'  
    }
  ];

  // Video placeholders used as fallbacks
  const fallbackVideos = [
    { identifier: 'vid-1', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'The Sharma Wedding' }, 
    { identifier: 'vid-2', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'TechCorp Gala 2025' } 
  ];

  // Client Photos used as fallbacks
  const fallbackPhotos = [
    { identifier: 'photo-1', image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', alt: 'Happy Couple' }, 
    { identifier: 'photo-2', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800', alt: 'Corporate Team' }, 
    { identifier: 'photo-3', image_url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800', alt: 'Anniversary Celebration' } 
  ];

  // Determine what data to display (live data or fallback)
  const displayReviews = testimonialsData && testimonialsData.length > 0 ? testimonialsData : fallbackReviews; 
  const displayVideos = experiencesData && experiencesData.length > 0 ? experiencesData : fallbackVideos; 
  const displayPhotos = smilesData && smilesData.length > 0 ? smilesData : fallbackPhotos; 

  return (
    <main className="testimonials-page">
      
      {/* --- Section 1: Google Reviews --- */}
      <section className="testimonials-container">
        <div className="elegant-section-header">
          <span className="section-kicker">— WHAT OUR CLIENTS SAY</span>
          <h2 className="elegant-section-title">Real stories from our unforgettable events.</h2>
        </div>
        
        <div className="reviews-grid">
          {displayReviews.map(review => (
            <div key={review.identifier} className="review-card squarish-card">
              <div className="review-card-inner">
                {/* Dynamic star rendering based on the database value */}
                <div className="stars">
                  {"★".repeat(review.stars || 5)}{"☆".repeat(5 - (review.stars || 5))} {}
                </div>
                
                <p className="review-text">"{review.comment}"</p> {}
                
                <div className="review-footer">
                  <h4 className="review-author">- {review.name}</h4> {}
                  <span className="review-platform">
                    <span className="google-icon">G</span> {review.platform || 'Google Review'} {}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 2: Video Testimonials --- */}
      <section className="video-section">
        <div className="testimonials-container">
          <div className="elegant-section-header">
            <span className="section-kicker text-gold">— WATCH THEIR EXPERIENCE</span>
            <h2 className="elegant-section-title text-light">Hear directly from our happy clients.</h2>
          </div>
          
          <div className="video-grid">
            {displayVideos.map(video => (
              <div key={video.identifier} className="video-card squarish-card">
                <video src={video.video_url} className="video-player" controls playsInline /> {}
                <div className="video-caption">
                  <h3>{video.title}</h3> {}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Client Photos (Smiles) --- */}
      <section className="testimonials-container gallery-section">
        <div className="elegant-section-header">
          <span className="section-kicker">— SMILES WE'VE CREATED</span>
          <h2 className="elegant-section-title">A picture is worth a thousand words.</h2>
        </div>
        
        <div className="photo-grid">
          {displayPhotos.map(photo => (
            <div key={photo.identifier} className="photo-card squarish-card">
              <img loading='lazy' src={photo.image_url} alt={photo.alt || photo.identifier} className="client-image" /> {}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}