import { supabase } from '@/app/api/supabaseClient';
import CalendlyButton from '@/app/calendly/calendly';
import Image from 'next/image';
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

  // Fallbacks in case the database is empty[cite: 6]
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
      {/* Premium Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        {/* Dynamic Video Banner[cite: 6] */}
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={homeData?.banner_video_url} type="video/mp4" />
        </video>
        <div className="hero-content">
          <div className="logo-wrapper">
              <Image 
                src={homeData?.logo_url || "/logo.png"} 
                alt="logo" 
                width="150" 
                height="150"
              />
            </div>
            {/* Dynamic Titles[cite: 6] */}
            <h1>{homeData?.banner_title || "Raj Hansh Event"}</h1>
            <p>{homeData?.banner_text || "Turning milestones into unforgettable memories since 2016."}</p>
          <div>
       {/* Final CTA */}
          <section className="cta-section">
            <div className="container text-center">
              <CalendlyButton/>
            </div>
          </section>
          </div>
        </div>
      </section>

      {/* Services/Expertise Section */}
      <section className="container bg-light" id="services">
        <div className="section-header">
          <h2 className="section-title">Our Expertise</h2>
          <p className="text-muted">End-to-end event planning, tailored to your vision.</p>
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
        <div className="section-header">
          <h2 className="section-title">Featured Events</h2>
          <p className="text-muted">A glimpse into the magic we create.</p>
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

      {/* Stats/Awards */}
      <section className="stats-section">
        <div className="container">
          <div className="grid-3">
            <div className="stat-item">
              <h3>{homeData?.founded || "2016"}</h3>
              <p>Founded</p>
            </div>
            <div className="stat-item">
              <h3>1-on-1</h3>
              <p>Founder-Led Service</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Dedicated Attention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container bg-light">
        <div className="section-header">
          <h2 className="section-title">Words of Love</h2>
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
            /* Fallback Testimonials[cite: 6] */
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