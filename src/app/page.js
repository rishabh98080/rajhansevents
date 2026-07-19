import { supabase } from '@/app/api/supabaseClient';
import HeroSlider from '@/app/HeroSlider'; // Import your new client component!

import './Home.css';

export const metadata = {
  title: "Raj Hansh",
  description: "Transform your special occasions into unforgettable memories with Raj Hansh Event. Expert wedding, corporate, and birthday event planning in Ranchi.",
};

export default async function Home() {
  const botNumber = "919876543210";
  const prefilledMessage = encodeURI("Hi there! I'd like to know more about your services.");
  const whatsappUrl = `https://wa.me/${botNumber}?text=${prefilledMessage}`;
  
  // Fetch all necessary data from Supabase in parallel
  const [
    { data: homeData },
    { data: expertise },
    { data: featuredEvents },
    { data: testimonials }
  ] = await Promise.all([
    supabase.from('home_content').select('*').eq('identifier', 'home_main').single(),
    supabase.from('expertise').select('*').order('created_at', { ascending: true }),
    supabase.from('featured').select('*').order('created_at', { ascending: true }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: true })
  ]);

  // Fallbacks in case the database is empty
  const fallbackExpertise = [
    { title: 'Wedding Planning', image_url: "/wedding.jpeg" },
    { title: 'Birthday & Anniversary', image_url: "/birthday.jpeg" },
    { title: 'Corporate Events', image_url: "/recept.jpeg" }
  ];

  const fallbackFeatured = [
    { title: 'Royal Wedding', image_url: "/wedding.jpeg" },
    { title: 'Reception', image_url: "/recept.jpeg" },
    { title: 'BirthDay', image_url: "/birthday.jpeg" }
  ];

  const displayExpertise = expertise && expertise.length > 0 ? expertise : fallbackExpertise;
  const displayFeatured = featuredEvents && featuredEvents.length > 0 ? featuredEvents : fallbackFeatured;

  return (
    <main className="home-page">
      
      {/* Premium Hero Section with Slideshow Component */}
      <HeroSlider homeData={homeData} />

      {/* Elegant Stats Band */}
      <section className="elegant-stats-band">
        <div className="container stats-flex-container">
          <div className="elegant-stat-item">
            <h3>850+</h3>
            <p>EVENTS CURATED</p>
          </div>
          <div className="elegant-stat-item">
            <h3>220+</h3>
            <p>WEDDINGS DELIVERED</p>
          </div>
          <div className="elegant-stat-item">
            <h3>60+</h3>
            <p>CORPORATE CLIENTS</p>
          </div>
          <div className="elegant-stat-item">
            <h3>9</h3>
            <p>YEARS OF CRAFT</p>
          </div>
        </div>
      </section>

      {/* Services/Expertise Section */}
      <section className="container bg-light" id="services">
        <div className="elegant-section-header">
          <span className="section-kicker">— OUR EXPERTISE</span>
          <h2 className="elegant-section-title">End-to-end event planning, tailored to your vision.</h2>
        </div>
        
        <div className="grid-3">
          {displayExpertise.map((item, index) => (
            <div key={item.identifier || index} className="image-card" style={{ backgroundImage: `url("${item.image_url}")` }}>
              <div className="card-overlay"></div>
              <div className="card-content">
                <span className="card-kicker">Explore Our Services</span>
                <h3 className="card-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="container">
        <div className="elegant-section-header">
          <span className="section-kicker">— FEATURED EVENTS</span>
          <h2 className="elegant-section-title">A glimpse into the magic we create.</h2>
        </div>
        
        <div className="grid-3">
          {displayFeatured.map((event, index) => (
            <div key={event.identifier || index} className="image-card" style={{ backgroundImage: `url("${event.image_url}")` }}>
              <div className="card-overlay"></div>
              <div className="card-content">
                <span className="card-kicker">Ranchi, Jharkhand</span>
                <h3 className="card-title">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container bg-light">
        <div className="elegant-section-header">
          <span className="section-kicker">— WORDS OF LOVE</span>
          <h2 className="elegant-section-title">Stories from our cherished clients.</h2>
        </div>
        
        <div className="grid-3">
          {testimonials && testimonials.length > 0 ? (
            testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.identifier} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.comment}"</p>
                <h4 className="testimonial-author">- {testimonial.name}</h4>
                <div style={{ color: '#FFD700', marginTop: '10px' }}>
                  {"★".repeat(testimonial.stars)}{"☆".repeat(5 - testimonial.stars)}
                </div>
              </div>
            ))
          ) : (
            /* Fallback Testimonials */
            [
              { name: "Aisha & Rahul", text: "They made our wedding an absolute fairytale. Every detail was perfect!" },
              { name: "TechCorp India", text: "The annual gala was seamless. Highly professional team." },
              { name: "The Sharma Family", text: "Our 50th anniversary party was the talk of the town. Thank you!" }
            ].map((testimonial, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <h4 className="testimonial-author">- {testimonial.name}</h4>
              </div>
            ))
          )}
        </div>
      </section>

    </main>
  );
}