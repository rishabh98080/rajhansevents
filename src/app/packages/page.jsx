
import './Packages.css';


export const metadata = {
  title: "Raj Hansh",
  description: "From luxury weddings to professional corporate events, explore the wide range of management services offered by Raj Hansh Event.",
};
export default function Packages() {
  // Core packages
  const packages = [
    { name: 'Silver', price: '₹1,50,000', features: ['Basic Planning', 'Venue Booking', 'Basic Decor', 'Catering Assistance'] },
    { name: 'Gold', price: '₹2,50,000', features: ['Full Planning', 'Premium Decor', 'Catering Management', 'Photography'] },
    { name: 'Platinum', price: '₹4,00,000', features: ['Luxury Planning', 'Celebrity Entertainment', '5-Star Hospitality', 'Complete Filming'] },
  ];

  // Updated to match the Raj Hansh Working Process styling
  const steps = [
    { num: '01', title: 'First Consultation', desc: 'We meet to understand your vision, guest list, and expectations for the celebration.' },
    { num: '02', title: 'Design & Curation', desc: 'Our team crafts a custom design board and detailed proposal with transparent pricing[cite: 13].' },
    { num: '03', title: 'On-Ground Logistics', desc: 'We handle all vendor bookings, entertainment, transport, and on-ground crew[cite: 13].' },
    { num: '04', title: 'Final Farewell', desc: 'You stay fully present in your celebration while we execute the event seamlessly[cite: 13].' }
  ];

  // FAQs
  const faqs = [
    { q: 'Can I customize a package?', a: 'Absolutely! Every event is designed around your story, and we provide clear, itemised quotations with no hidden costs[cite: 13].' },
    { q: 'Do you travel for destination events?', a: 'Yes! While we are based in Ranchi, we have deep knowledge of venues across Jharkhand and frequently travel beyond[cite: 13].' },
    { q: 'How far in advance should we book?', a: 'We recommend booking at least 6-8 months in advance so we can dedicate our 1-on-1 founder-led focus to your celebration[cite: 13].' }
  ];

  return (
    // Removed the global 'container' class from main so sections can stretch full-width
    <main className="packages-page">
      
      {/* --- Packages Section --- */}
      <section className="container packages-container">
        <div className="section-header">
          <h1 className="section-title text-center">Our Packages</h1>
          <p className="section-subtitle text-center">Choose the perfect package for your celebration.</p>
        </div>

        <div className="grid-3">
          {packages.map((pkg, index) => (
            <div key={index} className="pricing-card">
              <h3>{pkg.name}</h3>
              <div className="price">{pkg.price}</div>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>Starting From</p>
              <ul>
                {pkg.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>
              <button className="btn btn-outline" style={{ width: '100%' }}>Select Package</button>
            </div>
          ))}
        </div>

        <div className="custom-quote-section">
          <h3>Need a Custom Package?</h3>
          <p className="text-muted" style={{ margin: '1rem 0' }}>We can tailor everything exactly to your requirements with transparent pricing[cite: 13].</p>
          <a href="mailto:hello@rajhanshevent.com" className="btn btn-primary">Contact Us for Custom Quote</a>
        </div>
      </section>

      {/* --- How It Works Section (Now consistently styled with About page) --- */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-light text-center">How It Works</h2>
            <p className="section-subtitle text-gold text-center" style={{ marginBottom: '3rem' }}>From the very first consultation to the final farewell.</p>
          </div>
          <div className="process-grid">
            {steps.map((step, index) => (
              <div key={index} className="process-step-card">
                <div className="step-number">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="container faq-section">
        <div className="section-header">
          <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4>{faq.q}</h4>
              <p className="text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}