import { supabase } from '@/app/api/supabaseClient';
import './Services.css';

export const metadata = {
  title: "Raj Hansh",
  description: "From luxury weddings to professional corporate events, explore the wide range of management services offered by Raj Hansh Event.",
};

export default async function Services() {
  // Fetch live services data from Supabase
  const { data: servicesData } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true });

  // Fallback data mirroring the original brochure structure
  const fallbackServices = [
    { identifier: 'srv-1', title: 'Wedding Planning', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' },
    { identifier: 'srv-2', title: 'Birthday & Anniversary', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' },
    { identifier: 'srv-3', title: 'Corporate Events', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' },
    { identifier: 'srv-4', title: 'Decor & Design', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' },
    { identifier: 'srv-5', title: 'Catering Coordination', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' },
    { identifier: 'srv-6', title: 'Venue Selection', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' },
    { identifier: 'srv-7', title: 'Entertainment & Logistics', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' },
    { identifier: 'srv-8', title: 'Photography & Films', kicker: 'Explore Our Services', image_url: '/monalisa.jpg' }
  ];

  const displayServices = servicesData && servicesData.length > 0 ? servicesData : fallbackServices;

  // Keeping the 'Why Choose Us' features static as they weren't strictly defined in the CMS schema
  // (Though you could easily add a 'features' table later if you want to make them dynamic!)
  const whyChooseUs = [
    { title: 'Dedicated Event Manager', desc: 'One point of contact for your entire event journey - no confusion, no miscommunication.' },
    { title: 'Transparent Pricing', desc: 'Clear, itemised quotations with no hidden costs, so you always know where your budget goes.' },
    { title: 'Trusted Vendor Network', desc: "Nearly a decade of relationships with Ranchi's best decorators, caterers, and artists." },
    { title: 'On-Ground Execution', desc: "Our team is present at every event, managing logistics in real time so you don't have to." },
    { title: 'Custom Theming', desc: 'Every event is designed around your story — no two celebrations from us look the same.' },
    { title: 'Local Expertise', desc: 'Deep knowledge of venues and vendors across Jharkhand, with the ability to travel beyond.' }
  ];

  return (
    <main className="services-page">
      {/* --- Main Services Grid --- */}
      <section className="services-container">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">End-to-end event planning, tailored to your vision.</p>
        
        <div className="services-grid">
          {displayServices.map((service, index) => (
            <div 
              key={service.identifier || index} 
              className="service-card" 
              style={{ backgroundImage: `url("${service.image_url}")` }}
            >
              <div className="card-overlay"></div>
              
              <div className="card-content">
                {/* Fallback to static kicker if one isn't provided by DB */}
                <span className="card-kicker">{service.kicker || 'Explore Our Services'}</span>
                <h3 className="card-title">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Extended Section: Why Choose Us --- */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="feature">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}