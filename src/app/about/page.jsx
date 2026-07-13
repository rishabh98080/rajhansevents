

import './About.css';


export const metadata = {
  title: "Raj Hansh",
  description: "Transform your special occasions into unforgettable memories with Raj Hansh Event. Expert wedding, corporate, and birthday event planning in Ranchi.",
};
export default function About() {
  const whyChooseUs = [
    { title: 'Dedicated Event Manager', desc: 'One point of contact for your entire event journey - no confusion, no miscommunication.' },
    { title: 'Transparent Pricing', desc: 'Clear, itemised quotations with no hidden costs, so you always know where your budget goes.' },
    { title: 'Trusted Vendor Network', desc: "Nearly a decade of relationships with Ranchi's best decorators, caterers, and artists." },
    { title: 'On-Ground Execution', desc: "Our team is present at every event, managing logistics in real time so you don't have to." },
    { title: 'Custom Theming', desc: 'Every event is designed around your story — no two celebrations from us look the same.' },
    { title: 'Local Expertise', desc: 'Deep knowledge of venues and vendors across Jharkhand, with the ability to travel beyond.' }
  ];

  const processSteps = [
    { step: '01', title: 'First Consultation', desc: 'We meet to understand your vision, guest list, and expectations for the celebration.' },
    { step: '02', title: 'Design & Curation', desc: 'We handle venue selection, decor themes, and catering coordination matched to your budget.' },
    { step: '03', title: 'On-Ground Logistics', desc: 'Managing entertainment, transport, and on-ground crew from start to finish.' },
    { step: '04', title: 'Final Farewell', desc: 'You stay fully present in your celebration while we execute the event seamlessly.' }
  ];

  const teamMembers = [
    { id: 1, name: 'Founder Name', role: 'Founder & Lead Planner', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800' },
    { id: 2, name: 'Team Member', role: 'Head of Logistics', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800' },
    { id: 3, name: 'Team Member', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800' }
  ];

  return (
    <main className="about-page">
      {/* --- Section 1: Brand Story --- */}
      <section className="about-container">
        <div className="about-header">
          <h1>Our Story</h1>
          <p>Turning milestones into unforgettable memories since 2016.</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Rooted & Refined</h2>
            <p>
              Raj Hansh Event is a Ranchi-based event management company specialising in weddings, birthdays, anniversaries, and corporate events. We are a fresh, founder-led team built on genuine passion for hospitality and design, and it shows in the personal attention every single client receives.
            </p>
            <p>
              Because we are early in our journey, every event gets our complete, undivided focus. We believe every celebration tells a story, and we blend traditional Indian hospitality with contemporary design sensibilities to create experiences that feel both rooted and refined.
            </p>
            <div className="about-stats">
              <div>
                <h3>2016</h3>
                <span>Founded</span>
              </div>
              <div>
                <h3>100%</h3>
                <span>Dedicated Attention</span>
              </div>
              <div>
                <h3>1-on-1</h3>
                <span>Founder-Led Service</span>
              </div>
            </div>
          </div>
          
          <div className="about-image-wrapper">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" alt="Raj Hansh Event Decor" className="about-image" />
          </div>
        </div>
      </section>

      {/* --- Section 2: Working Process --- */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-light">How We Work</h2>
            <p className="section-subtitle text-gold">From the very first consultation to the final farewell.</p>
          </div>
          <div className="process-grid">
            {processSteps.map((item, index) => (
              <div key={index} className="process-step-card">
                <div className="step-number">{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Why Choose Raj Hansh --- */}
      <section className="why-us-section container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">What sets Raj Hansh Event apart.</p>
        </div>
        <div className="why-us-grid">
          {whyChooseUs.map((feature, index) => (
            <div key={index} className="why-us-card">
              <div className="why-us-icon">✦</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 4: Team Photos --- */}
      <section className="team-section container bg-light-ivory">
        <div className="section-header">
          <h2 className="section-title">Meet The Team</h2>
          <p className="section-subtitle">A founder-led team built on genuine passion.</p>
        </div>
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-img-wrapper">
                <img src={member.img} alt={member.name} className="team-img" />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}