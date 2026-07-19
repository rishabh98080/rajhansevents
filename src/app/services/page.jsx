import { supabase } from '@/app/api/supabaseClient';
import './Services.css';

export const metadata = {
  title: "Raj Hansh",
  description: "From luxury weddings to professional corporate events, explore the wide range of management services offered by Raj Hansh Event.",
};

export default async function Services() {
  // Fetch live services data from Supabase[cite: 1]
  const { data: servicesData } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true });

  // Fallback data mirroring the elegant structure from the screenshot
  const fallbackServices = [
    { identifier: 'srv-1', tag: 'WEDDING', title: 'Wedding Planning', desc: 'End-to-end open wedding orchestration — floral design, catering, decor & rituals crafted to your traditions.', image_url: '/monalisa.jpg' },
    { identifier: 'srv-2', tag: 'BIRTHDAY', title: 'Birthday Celebrations', desc: 'Themed birthday parties for every age — from magical first birthdays to milestone soirees.', image_url: '/monalisa.jpg' },
    { identifier: 'srv-3', tag: 'ANNIVERSARY', title: 'Anniversary Celebrations', desc: 'Celebrate romance with intimate, meticulously designed anniversary experiences.', image_url: '/monalisa.jpg' },
    { identifier: 'srv-4', tag: 'CORPORATE', title: 'Corporate & Commercial Events', desc: 'Product launches, conferences, gala dinners and brand activations executed with precision.', image_url: '/monalisa.jpg' },
    { identifier: 'srv-5', tag: 'DECOR & DESIGN', title: 'Decoration & Floral Design', desc: 'Bespoke archway installations, centerpieces and lighting design for unforgettable venues.', image_url: '/monalisa.jpg' },
    { identifier: 'srv-6', tag: 'CATERING', title: 'Catering & Culinary', desc: 'Multi-cuisine food counters and plated fine dining curated by award-winning chefs.', image_url: '/monalisa.jpg' }
  ];

  const displayServices = servicesData && servicesData.length > 0 ? servicesData : fallbackServices; //[cite: 1]

  // Replaced "Why Choose Us" with a text-only Planning Process section[cite: 1]
  const planningProcess = [
    { step: '01', title: 'Initial Consultation', desc: 'We sit down with you to understand your vision, preferences, and budget, ensuring we align completely with your dream.' },
    { step: '02', title: 'Design & Curation', desc: 'Our team crafts a meticulous plan, pulling together the best vendors, themes, and timelines tailored just for you.' },
    { step: '03', title: 'Flawless Execution', desc: 'On the big day, we handle every single detail behind the scenes so you can focus on making beautiful memories with your guests.' }
  ]; //[cite: 1]

  return (
    <main className="services-page">
      {/* --- Main Services Grid --- */}
      <section className="services-container">
        
        {/* Updated Header Style */}
        <div className="services-header-content">
            <span className="section-kicker">— OUR SIGNATURE SERVICES</span>
            <h1 className="services-title">Every detail, thoughtfully composed.</h1>
            <p className="services-subtitle">From intimate ceremonies to landmark corporate galas — we bring your vision to life with quiet luxury and meticulous execution.</p>
        </div>
        
        <div className="services-grid">
          {displayServices.map((service, index) => (
            <div key={service.identifier || index} className="service-card">
              {/* Image Top Half */}
              <div className="card-image-wrapper">
                <span className="card-tag">{service.tag || 'SERVICE'}</span>
                <img src={service.image_url} alt={service.title} className="card-image" />
              </div>
              
              {/* Text Bottom Half */}
              <div className="card-content">
                <hr className="card-divider" />
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.desc || 'Experience our premium services tailored just for your special occasion.'}</p>
                <a href="#quote" className="card-quote-link">GET A QUOTE &gt;</a>
              </div>
            </div>
          ))}
        </div>

        <div className="services-footer-link">
          <a href="#all-services">VIEW ALL SERVICES</a>
        </div>
      </section>

      {/* --- Extended Section: Our Process --- */}
      {/* Kept exactly as you loved it! */}
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
      <section className="brochure-section" style = {{textAlign: 'center', margin: '40px 0'}}>
        <a href="/brochure.pdf" download>Download Brochure</a>
      </section>
    </main>
  );
}