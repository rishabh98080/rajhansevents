'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CalendlyButton from '@/app/calendly/calendly';

export default function HeroSlider({ homeData }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define your slides here (mix of videos and images)
  const slides = [
    { type: 'video', src: homeData?.banner_video_url },
    { type: 'image', src: '/wedding.jpeg' },
    { type: 'image', src: '/recept.jpeg' },
    { type: 'image', src: '/birthday.jpeg' }
  ];

  // Automatic slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // Changes slide every 6 seconds
    
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      
      {/* Slides Loop for Fade & Zoom */}
      {slides.map((slide, index) => (
        <div key={index} className={`hero-slide ${index === currentSlide ? 'active' : ''}`}>
          {slide.type === 'video' ? (
            <video autoPlay loop muted playsInline className="hero-media">
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <img src={slide.src} alt={`Banner slide ${index + 1}`} className="hero-media" />
          )}
        </div>
      ))}
      
      {/* Original Content Block */}
      <div className="hero-content">
        <div className="logo-wrapper">
          <Image 
            src={"/vblogo.png"} 
            alt="logo" 
            width={150} 
            height={150}
            fetchPriority="high"
          />
        </div>
        
        <h1>{homeData?.banner_title || "Raj Hansh Event"}</h1>
        <p>{homeData?.banner_text || "Turning milestones into unforgettable memories since 2016."}</p>
        
        <section className="cta-section">
          <div className="container text-center">
            <CalendlyButton/>
          </div>
        </section>

        {/* Thin-Line Slider Controls (Copied from image design) */}
        <div className="hero-controls">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`slide-line ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}