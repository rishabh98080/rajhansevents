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

  // Replaced "Why Choose Us" with a text-only Planning Process section
  const planningProcess = [
    { step: '01', title: 'Initial Consultation', desc: 'We sit down with you to understand your vision, preferences, and budget, ensuring we align completely with your dream.' },
    { step: '02', title: 'Design & Curation', desc: 'Our team crafts a meticulous plan, pulling together the best vendors, themes, and timelines tailored just for you.' },
    { step: '03', title: 'Flawless Execution', desc: 'On the big day, we handle every single detail behind the scenes so you can focus on making beautiful memories with your guests.' }
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
                <span className="card-kicker">{service.kicker || 'Explore Our Services'}</span>
                <h3 className="card-title">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Extended Section: Our Process --- */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">How We Bring It to Life</h2>
          <div className="process-grid">
            {planningProcess.map((item, index) => (
              <div key={index} className="process-card">
                <span className="process-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}