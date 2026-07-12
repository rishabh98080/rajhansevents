
import './Services.css';

export const metadata = {
  title: "Our Event Planning Services | Raj Hansh Event",
  description: "From luxury weddings to professional corporate events, explore the wide range of management services offered by Raj Hansh Event.",
};
export default function Services() {
  // Exactly matching the 8 services from the brochure
  const services = [
    { title: 'Wedding Planning', kicker: 'Explore Our Services', img: '/monalisa.jpg' },
    { title: 'Birthday & Anniversary', kicker: 'Explore Our Services', img: '/monalisa.jpg' },
    { title: 'Corporate Events', kicker: 'Explore Our Services', img: '/monalisa.jpg' },
    { title: 'Decor & Design', kicker: 'Explore Our Services', img: '/monalisa.jpg' },
    { title: 'Catering Coordination', kicker: 'Explore Our Services', img: '/monalisa.jpg' },
    { title: 'Venue Selection', kicker: 'Explore Our Services', img: '/monalisa.jpg' },
    { title: 'Entertainment & Logistics', kicker: 'Explore Our Services', img: '/monalisa.jpg' },
    { title: 'Photography & Films', kicker: 'Explore Our Services', img: '/monalisa.jpg' }
  ];

  return (
    <main className="services-page">
      {/* --- Main Services Grid --- */}
      <section className="services-container">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">End-to-end event planning, tailored to your vision.</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card" 
              style={{ backgroundImage: `url("${service.img}")` }}
            >
              <div className="card-overlay"></div>
              
              <div className="card-content">
                <span className="card-kicker">{service.kicker}</span>
                <h3 className="card-title">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Extended Section: Why Choose Us (Updated from Brochure) --- */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Dedicated Event Manager</h3>
              <p>One point of contact for your entire event journey - no confusion, no miscommunication.</p>
            </div>
            <div className="feature">
              <h3>Transparent Pricing</h3>
              <p>Clear, itemised quotations with no hidden costs, so you always know where your budget goes.</p>
            </div>
            <div className="feature">
              <h3>Trusted Vendor Network</h3>
              <p>Nearly a decade of relationships with Ranchi's best decorators, caterers, and artists.</p>
            </div>
            <div className="feature">
              <h3>On-Ground Execution</h3>
              <p>Our team is present at every event, managing logistics in real time so you don't have to.</p>
            </div>
            <div className="feature">
              <h3>Custom Theming</h3>
              <p>Every event is designed around your story — no two celebrations from us look the same.</p>
            </div>
            <div className="feature">
              <h3>Local Expertise</h3>
              <p>Deep knowledge of venues and vendors across Jharkhand, with the ability to travel beyond.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}