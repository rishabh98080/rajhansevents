'use client'; // Required since we use state for filters in Next.js App Router

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/api/supabaseClient';
import './Portfolio.css'; 

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track the currently selected media for the modal
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
        
        const uniqueCategories = ['All', ...new Set(data.map(item => item.category))].filter(Boolean);
        
        if (uniqueCategories.length > 1) {
          setCategories(uniqueCategories);
        } else {
          setCategories(['All', 'Weddings', 'Corporate', 'Social', 'Destination']);
        }
      }
      setLoading(false);
    };

    fetchPortfolio();
  }, []);

  const fallbackProjects = [
    { id: 1, title: 'The Royal Gala', category: 'Weddings', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800' },
    { id: 2, title: 'TechCorp Summit', category: 'Corporate', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800' },
    { id: 3, title: 'Sharma Anniversary', category: 'Social', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800' },
    { id: 4, title: 'Udaipur Palace Wedding', category: 'Destination', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800' },
    { id: 5, title: 'Annual Retreat', category: 'Corporate', media_type: 'video', media_url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 6, title: 'Sunset Vows', category: 'Weddings', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800' },
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  const filteredProjects = activeFilter === 'All' 
    ? displayProjects 
    : displayProjects.filter(p => p.category === activeFilter);

  // NEW: Function to close the modal
  const closeModal = () => setSelectedMedia(null);

  return (
    <main className="portfolio-container">
      <div className="portfolio-header">
        <h1 className="portfolio-title">Our Portfolio</h1>
        <p className="portfolio-subtitle">A glimpse into the extraordinary moments we've crafted.</p>
      </div>
      
      {/* Filter Buttons */}
      <div className="filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="portfolio-grid">
        {loading ? (
          <p style={{ width: '100%', textAlign: 'center' }}>Loading gallery...</p>
        ) : (
          filteredProjects.map(project => (
            <div 
              key={project.identifier || project.id} 
              className="portfolio-card"
              // NEW: Add click handler to set the active media
              onClick={() => setSelectedMedia(project)}
            >
              {project.media_type === 'video' ? (
                <video src={project.media_url} className="portfolio-media" controls muted playsInline />
              ) : (
                <img loading='lazy' src={project.media_url} alt={project.title || project.identifier} className="portfolio-media" />
              )}
              
              <div className="portfolio-overlay">
                <div className="portfolio-info">
                  <span className="portfolio-category">{project.category}</span>
                  <h3 className="portfolio-project-title">{project.title || project.identifier || "Gallery Item"}</h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* NEW: Fullscreen Image/Video Modal */}
      {selectedMedia && (
        <div className="image-modal" onClick={closeModal}>
          <button className="close-modal" onClick={closeModal}>&times;</button>
          
          {/* Prevent clicks on the media itself from closing the modal */}
          <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {selectedMedia.media_type === 'video' ? (
              <video 
                src={selectedMedia.media_url} 
                className="modal-image" 
                controls 
                autoPlay 
              />
            ) : (
              <img 
                src={selectedMedia.media_url} 
                alt={selectedMedia.title || "Enlarged view"} 
                className="modal-image" 
                // Closes the modal if they click the image itself for a smooth UX
                onClick={closeModal} 
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}