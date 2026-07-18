import { supabase } from '../api/supabaseClient'; 
import './About.css'; 

export const metadata = {
  title: "Raj Hansh", 
  description: "Transform your special occasions into unforgettable memories with Raj Hansh Event. Expert wedding, corporate, and birthday event planning in Ranchi.", 
};

export default async function About() {
  // Fetch all necessary data from Supabase in parallel for maximum speed
  const [
    { data: aboutData }, 
    { data: teamMembers }, 
  ] = await Promise.all([
    supabase.from('about_us').select('*').eq('identifier', 'about_main').single(), 
    supabase.from('team').select('*').order('created_at', { ascending: true }) 
  ]);

  // Keeping process steps static as requested
  const processSteps = [
    { step: '01', title: 'First Consultation', desc: 'We meet to understand your vision, guest list, and expectations for the celebration.' }, 
    { step: '02', title: 'Design & Curation', desc: 'We handle venue selection, decor themes, and catering coordination matched to your budget.' }, 
    { step: '03', title: 'On-Ground Logistics', desc: 'Managing entertainment, transport, and on-ground crew from start to finish.' }, 
    { step: '04', title: 'Final Farewell', desc: 'You stay fully present in your celebration while we execute the event seamlessly.' } 
  ];

  return (
    <main className="about-page">
      
      {/* --- Section 1: Brand Story --- */}
      <section className="container story-section">
        {/* REDESIGNED HEADER TO FIX SPACING AND ALIGNMENT */}
        <div className="elegant-section-header" style={{ textAlign: 'left', marginInline: '0', marginBottom: '3rem' }}>
          <span className="section-kicker">— OUR STORY</span>
          <h1 className="elegant-section-title">Nine years of orchestrating royal experiences.</h1>
        </div>
        
        <div className="story-content">
          <div className="story-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800" 
              alt="Raj Hansh Event Decor" 
              className="story-image" 
            />
          </div>
          
          <div className="story-text-wrapper">
            <div className="story-desc">
              {aboutData?.description ? (
                aboutData.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p> 
                ))
              ) : (
                <p>Founded in Ranchi, Raj Hansh Event began as a family-run wedding planning boutique and grew into Jharkhand's most trusted name for premium celebrations. Our team blends traditional cultural sensibility with modern production values — every event we deliver feels handmade, not manufactured.</p> 
              )}
            </div>
            
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-icon">📅</span> 
                <h3>850+</h3> 
                <p>EVENTS</p> 
              </div>
              <div className="stat-box">
                <span className="stat-icon">👥</span> 
                <h3>800+</h3> 
                <p>HAPPY CLIENTS</p> 
              </div>
              <div className="stat-box">
                <span className="stat-icon">🏆</span> 
                <h3>12</h3> 
                <p>AWARDS</p> 
              </div>
              <div className="stat-box">
                <span className="stat-icon">✨</span> 
                <h3>9</h3> 
                <p>YEARS</p> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Mission & Promise --- */}
      <section className="container mission-promise-section">
        <div className="mission-box">
          <div className="box-overline">MISSION</div> 
          <h2>Our Mission</h2> 
          <p>To transform your most cherished moments into experiences that guests will remember for a lifetime.</p> 
        </div>
        <div className="promise-box">
          <div className="box-overline text-gold">PROMISE</div> 
          <h2>Our Promise</h2> 
          <p>Uncompromising quality, punctual delivery and personal attention from a single point of contact — always.</p> 
        </div>
      </section>

      {/* --- Section 3: Working Process --- */}
      <section className="process-section">
        <div className="container">
          
          {/* REDESIGNED HEADER */}
          <div className="elegant-section-header">
            <span className="section-kicker text-gold">— HOW WE WORK</span>
            <h2 className="elegant-section-title text-light">From the very first consultation to the final farewell.</h2>
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

      {/* --- Section 4: Team Photos --- */}
      <section className="container team-section">
        
        {/* REDESIGNED HEADER */}
        <div className="elegant-section-header" style={{ marginBottom: '4rem' }}>
          <span className="section-kicker">— THE PEOPLE BEHIND THE MAGIC</span>
          <h2 className="elegant-section-title">Meet the Team</h2>
        </div>
        
        <div className="team-grid">
          {teamMembers && teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <div key={member.identifier} className="team-card squarish-card">
                <div className="team-img-wrapper">
                  <img 
                    src={member.photo_url || 'https://via.placeholder.com/400x400'} 
                    alt={member.name} 
                    className="team-img" 
                  />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3> 
                  <span className="team-role">TEAM MEMBER</span> 
                </div>
              </div>
            ))
          ) : (
            <p>Loading team members...</p> 
          )}
        </div>
      </section>

      {/* --- Section 5: Call to Action --- */}
      <section className="container cta-section">
        <button className="cta-button">BOOK A FREE CONSULTATION</button> 
      </section>
      
    </main>
  );
}