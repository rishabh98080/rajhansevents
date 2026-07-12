'use client'; // Required since we use state for filters in Next.js App Router[cite: 9]
import React, { useState } from 'react';
import './Portfolio.css'; // Importing our new styles

export default function Portfolio() {
  // We use state to track which filter is currently active[cite: 9]
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Update these categories whenever you expand your services[cite: 9]
  const categories = ['All', 'Weddings', 'Corporate', 'Social', 'Destination'];
  
  // FUTURE-PROOFING: Keep all your project data in this array. 
  // Later, you can easily replace this entire block with an API fetch call.[cite: 9]
  const projects = [
    { id: 1, title: 'The Royal Gala', category: 'Weddings', type: 'image', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800' },
    { id: 2, title: 'TechCorp Summit', category: 'Corporate', type: 'image', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800' },
    { id: 3, title: 'Sharma Anniversary', category: 'Social', type: 'image', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800' },
    { id: 4, title: 'Udaipur Palace Wedding', category: 'Destination', type: 'image', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800' },
    { id: 5, title: 'Annual Retreat', category: 'Corporate', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 6, title: 'Sunset Vows', category: 'Weddings', type: 'image', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800' },
  ];

  // Logic to filter projects based on the selected category[cite: 9]
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="portfolio-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="portfolio-card">
            {project.type === 'video' ? (
              <video src={project.url} className="portfolio-media" controls muted playsInline />
            ) : (
              <img src={project.url} alt={project.title} className="portfolio-media" />
            )}
            
            {/* Hover overlay with title and category */}
            <div className="portfolio-overlay">
              <div className="portfolio-info">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-project-title">{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}