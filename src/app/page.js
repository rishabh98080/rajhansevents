import Image from "next/image";
import styles from "./page.module.css";
import './Home.css'; 


export const metadata = {
  title: "Raj Hansh Event | Top Event Planning & Management Services",
  description: "Transform your special occasions into unforgettable memories with Raj Hansh Event. Expert wedding, corporate, and birthday event planning in Ranchi.",
};
export default function Home() {
  const services = [
    { title: 'Wedding Planning', kicker: 'Explore Our Services', img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" },
    { title: 'Birthday & Anniversary', kicker: 'Explore Our Services', img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" },
    { title: 'Corporate Events', kicker: 'Explore Our Services', img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" }
  ];

  const featuredEvents = [
    { title: 'Royal Wedding 1', kicker: 'Ranchi, Jharkhand', img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" },
    { title: 'Royal Wedding 2', kicker: 'Ranchi, Jharkhand', img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" },
    { title: 'Royal Wedding 3', kicker: 'Ranchi, Jharkhand', img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" }
  ];

  return (
    <main className="home-page">
      {/* Premium Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <video autoPlay loop muted playsInline className="hero-video">
          <source src='/hero.mp4' type="video/mp4" />
        </video>
        <div className="hero-content" style = {{textAlign : 'center'}}>
          <p><img src = '/logo.jpeg' alt = 'logo' width = "100px" height = "100px"/></p>
          <h1>Raj Hansh Event</h1>
          <p>Turning milestones into unforgettable memories since 2016.</p>
          <div>
            {/* Updated with real phone number */}
            <a href="https://wa.me/919006089331" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container bg-light" id="services">
        <div className="section-header">
          <h2 className="section-title">Our Expertise</h2>
          <p className="text-muted">End-to-end event planning, tailored to your vision.</p>
        </div>
        <div className="grid-3">
          {services.map((service, index) => (
            <div key={index} className="image-card" style={{ backgroundImage: `url("${service.img}")` }}>
              <div className="card-overlay"></div>
              <div className="card-content">
                <span className="card-kicker">{service.kicker}</span>
                <h3 className="card-title">{service.title}</h3>
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
          {featuredEvents.map((event, index) => (
            <div key={index} className="image-card" style={{ backgroundImage: `url("${event.img}")` }}>
              <div className="card-overlay"></div>
              <div className="card-content">
                <span className="card-kicker">{event.kicker}</span>
                <h3 className="card-title">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats/Awards - Updated to match brochure */}
      <section className="stats-section">
        <div className="container">
          <div className="grid-3">
            <div className="stat-item"><h3>2016</h3><p>Founded</p></div>
            <div className="stat-item"><h3>1-on-1</h3><p>Founder-Led Service</p></div>
            <div className="stat-item"><h3>100%</h3><p>Dedicated Attention</p></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container bg-light">
        <div className="section-header">
          <h2 className="section-title">Words of Love</h2>
        </div>
        <div className="grid-3">
          {[
            { name: "Aisha & Rahul", text: "They made our wedding an absolute fairytale. Every detail was perfect!" },
            { name: "TechCorp India", text: "The annual gala was seamless. Highly professional team." },
            { name: "The Sharma Family", text: "Our 50th anniversary party was the talk of the town. Thank you!" }
          ].map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <h4 className="testimonial-author">- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to plan your next celebration?</h2>
          <p>Book a free consultation with our team today.</p>
          <a href="mailto:hello@rajhanshevent.com" className="btn btn-primary">
            Email Us
          </a>
        </div>
      </section>
    </main>
)}
