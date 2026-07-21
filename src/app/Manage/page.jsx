'use client';

import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { uploadImage } from '../../utils/supabaseUpload';
import styles from './Manage.module.css';
import imageCompression from 'browser-image-compression';

export default function ManagePage() {
const [loading, setLoading] = useState(false);
  
  // Section States
  const [homeData, setHomeData] = useState({ identifier: 'home_main', logo: null, banner_video: null, banner_title: '', banner_text: '', founded: '' });
  const [expertiseData, setExpertiseData] = useState({ identifier: '', title: '', file: null });
  const [featuredData, setFeaturedData] = useState({ identifier: '', title: '', file: null });
  const [contactData, setContactData] = useState({ identifier: 'contact_main', email: '', phone: '', location: '', insta: '', fb: '' });
  const [aboutData, setAboutData] = useState({ identifier: 'about_main', description: '' });
  const [teamData, setTeamData] = useState({ identifier: '', name: '', file: null });
  const [serviceData, setServiceData] = useState({ identifier: '', title: '', file: null });
  const [packageData, setPackageData] = useState({ identifier: '', pkg_name: '', f1: '', f2: '', f3: '', f4: '', price: '' });
  const [portfolioData, setPortfolioData] = useState({ identifier: '', file: null, category: '', media_type: 'image', title : '' });
  const [testimonialData, setTestimonialData] = useState({ identifier: '', name: '', comment: '', stars: 5 });
  const [experienceData, setExperienceData] = useState({ identifier: '', title: '', file: null });
  const [smileData, setSmileData] = useState({ identifier: '', file: null });

  // Compression helper tailored for WebP and dynamic sizing
  const compressImage = async (file, isThumbnail = false) => {
    if (!file || !file.type.startsWith('image/')) {
      return file;
    }

    const options = {
      maxSizeMB: isThumbnail ? 0.1 : 1.5, // 100KB for thumbs, 1.5MB for standards
      maxWidthOrHeight: isThumbnail ? 600 : 1920,
      useWebWorker: true,
      fileType: 'image/webp', // Force conversion to WebP format
    };

    try {
      const compressedBlob = await imageCompression(file, options);
      // Strip original extension and enforce .webp
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const fileName = isThumbnail ? `thumb_${baseName}.webp` : `${baseName}.webp`;
      
      return new File([compressedBlob], fileName, { type: 'image/webp', lastModified: Date.now() });
    } catch (error) {
      console.error('Error compressing image:', error);
      return file;
    }
  };

  // Universal Submit Handler
  const handleSubmit = async (e, table, payload, fileData = null, secondaryFileData = null) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalPayload = { ...payload };

      const processFileUpload = async (fileInfo) => {
        if (!fileInfo || !fileInfo.file) return;

        // Portfolio Logic: High-Res Original + Compressed Thumbnail
        if (table === 'portfolio' && fileInfo.file.type.startsWith('image/')) {
          // Convert the original to a high-quality WebP for consistency
          const originalFile = await compressImage(fileInfo.file, false); 
          // Generate the tiny thumbnail WebP
          const thumbnailFile = await compressImage(fileInfo.file, true);

          const originalUrl = await uploadImage(originalFile, fileInfo.bucket);
          const thumbnailUrl = await uploadImage(thumbnailFile, fileInfo.bucket);

          finalPayload[fileInfo.columnName] = originalUrl;
          finalPayload['thumbnail_url'] = thumbnailUrl;
        } 
        // Standard Logic: Compress all other images and save as the only file
        else if (fileInfo.file.type.startsWith('image/')) {
          const compressedFile = await compressImage(fileInfo.file, false);
          const fileUrl = await uploadImage(compressedFile, fileInfo.bucket);
          finalPayload[fileInfo.columnName] = fileUrl;
        } 
        // Videos: Upload as is, but block massive files to prevent freezing
        else if (fileInfo.file.type.startsWith('video/')) {
          if (fileInfo.file.size > 50 * 1024 * 1024) { // 50MB limit
             throw new Error("Video exceeds 50MB. Please compress it manually before uploading.");
          }
          const fileUrl = await uploadImage(fileInfo.file, fileInfo.bucket);
          finalPayload[fileInfo.columnName] = fileUrl;
        }
      };

      await processFileUpload(fileData);
      await processFileUpload(secondaryFileData);

      const { error } = await supabase.from(table).upsert(finalPayload, { onConflict: 'identifier' });

      if (error) throw error;
      alert(`${table} updated successfully!`);
    } catch (error) {
      alert(`Error updating ${table}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.manageContainer}>
      <h1>Website Content Manager</h1>

      <section className={styles.section}>
        <h2>Home Page Main</h2>
        <form onSubmit={(e) => handleSubmit(
          e, 'home_content', 
          { identifier: homeData.identifier, banner_title: homeData.banner_title, banner_text: homeData.banner_text, founded: homeData.founded },
          { file: homeData.logo, bucket: 'home', columnName: 'logo_url' },
          { file: homeData.banner_video, bucket: 'home', columnName: 'banner_video_url' }
        )}>
          <label>Logo</label>
          <input type="file" accept="image/*" onChange={e => setHomeData({...homeData, logo: e.target.files[0]})} />
          <label>Banner Media (Video/Image)</label>
          <input type="file" accept="video/*,image/*" onChange={e => setHomeData({...homeData, banner_video: e.target.files[0]})} />
          <input type="text" placeholder="Title on Banner" onChange={e => setHomeData({...homeData, banner_title: e.target.value})} />
          <textarea placeholder="Text under Title" onChange={e => setHomeData({...homeData, banner_text: e.target.value})} />
          <input type="text" placeholder="Founded Date/Text" onChange={e => setHomeData({...homeData, founded: e.target.value})} />
          <button type="submit" disabled={loading}>Save Home Data</button>
        </form>

        <h3>Our Expertise (Add 3 items one by one)</h3>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'expertise', { identifier: expertiseData.identifier, title: expertiseData.title }, { file: expertiseData.file, bucket: 'home', columnName: 'image_url' })}>
          <input type="text" placeholder="Identifier (e.g., exp-1)" required onChange={e => setExpertiseData({...expertiseData, identifier: e.target.value})} />
          <input type="text" placeholder="Title" required onChange={e => setExpertiseData({...expertiseData, title: e.target.value})} />
          <input type="file" required onChange={e => setExpertiseData({...expertiseData, file: e.target.files[0]})} />
          <button type="submit" disabled={loading}>Save Expertise Item</button>
        </form>

        <h3>Featured (Add 3 items one by one)</h3>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'featured', { identifier: featuredData.identifier, title: featuredData.title }, { file: featuredData.file, bucket: 'home', columnName: 'image_url' })}>
          <input type="text" placeholder="Identifier (e.g., feat-1)" required onChange={e => setFeaturedData({...featuredData, identifier: e.target.value})} />
          <input type="text" placeholder="Title" required onChange={e => setFeaturedData({...featuredData, title: e.target.value})} />
          <input type="file" required onChange={e => setFeaturedData({...featuredData, file: e.target.files[0]})} />
          <button type="submit" disabled={loading}>Save Featured Item</button>
        </form>

        <h3>Contact Info</h3>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'contact_info', { identifier: contactData.identifier, email: contactData.email, phone: contactData.phone, location: contactData.location, insta: contactData.insta, fb: contactData.fb })}>
          <input type="email" placeholder="Email" onChange={e => setContactData({...contactData, email: e.target.value})} />
          <input type="tel" placeholder="Phone" onChange={e => setContactData({...contactData, phone: e.target.value})} />
          <input type="text" placeholder="Location" onChange={e => setContactData({...contactData, location: e.target.value})} />
          <input type="text" placeholder="Instagram URL" onChange={e => setContactData({...contactData, insta: e.target.value})} />
          <input type="text" placeholder="Facebook URL" onChange={e => setContactData({...contactData, fb: e.target.value})} />
          <button type="submit" disabled={loading}>Save Contact Info</button>
        </form>
      </section>

      <section className={styles.section}>
        <h2>About Us</h2>
        <form onSubmit={(e) => handleSubmit(e, 'about_us', { identifier: aboutData.identifier, description: aboutData.description })}>
          <textarea placeholder="About description" required onChange={e => setAboutData({...aboutData, description: e.target.value})} />
          <button type="submit" disabled={loading}>Save About Text</button>
        </form>

        <h3>Team</h3>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'team', { identifier: teamData.identifier, name: teamData.name }, { file: teamData.file, bucket: 'team', columnName: 'photo_url' })}>
          <input type="text" placeholder="Identifier (e.g., team-1)" required onChange={e => setTeamData({...teamData, identifier: e.target.value})} />
          <input type="text" placeholder="Name" required onChange={e => setTeamData({...teamData, name: e.target.value})} />
          <input type="file" accept="image/*" required onChange={e => setTeamData({...teamData, file: e.target.files[0]})} />
          <button type="submit" disabled={loading}>Save Team Member</button>
        </form>

        <h3>Services</h3>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'services', { identifier: serviceData.identifier, title: serviceData.title }, { file: serviceData.file, bucket: 'services', columnName: 'image_url' })}>
          <input type="text" placeholder="Identifier (e.g., serv-1)" required onChange={e => setServiceData({...serviceData, identifier: e.target.value})} />
          <input type="text" placeholder="Service Title" required onChange={e => setServiceData({...serviceData, title: e.target.value})} />
          <input type="file" accept="image/*" required onChange={e => setServiceData({...serviceData, file: e.target.files[0]})} />
          <button type="submit" disabled={loading}>Save Service</button>
        </form>
      </section>

      <section className={styles.section}>
        <h2>Packages</h2>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'packages', { identifier: packageData.identifier, pkg_name: packageData.pkg_name, f1: packageData.f1, f2: packageData.f2, f3: packageData.f3, f4: packageData.f4, price: packageData.price })}>
          <input type="text" placeholder="Identifier (e.g., pkg-1)" required onChange={e => setPackageData({...packageData, identifier: e.target.value})} />
          <input type="text" placeholder="Package Name" required onChange={e => setPackageData({...packageData, pkg_name: e.target.value})} />
          <input type="text" placeholder="Feature 1" onChange={e => setPackageData({...packageData, f1: e.target.value})} />
          <input type="text" placeholder="Feature 2" onChange={e => setPackageData({...packageData, f2: e.target.value})} />
          <input type="text" placeholder="Feature 3" onChange={e => setPackageData({...packageData, f3: e.target.value})} />
          <input type="text" placeholder="Feature 4" onChange={e => setPackageData({...packageData, f4: e.target.value})} />
          <input type="text" placeholder="Price" required onChange={e => setPackageData({...packageData, price: e.target.value})} />
          <button type="submit" disabled={loading}>Save Package</button>
        </form>
      </section>

      <section className={styles.section}>
        <h2>Portfolio (Upload One by One)</h2>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'portfolio', { identifier: portfolioData.identifier, category: portfolioData.category, media_type: portfolioData.media_type,title: portfolioData.title }, { file: portfolioData.file, bucket: 'portfolio', columnName: 'media_url' })}>
          <input type="text" placeholder="Identifier (e.g., port-1)" required onChange={e => setPortfolioData({...portfolioData, identifier: e.target.value})} />
          <input type="text" placeholder="Title of the image" required onChange={e => setPortfolioData({...portfolioData, title: e.target.value})} />
          
          <select required defaultValue="" onChange={e => setPortfolioData({...portfolioData, category: e.target.value})}>
            <option value="" disabled>Select Category</option>
            <option value="wedding-planning">Wedding Planning</option>
            <option value="birthday-anniversary">Birthday & Anniversary</option>
            <option value="corporate-events">Corporate Events</option>
            <option value="decor-design">Decor & Design</option>
            <option value="catering-coordination">Catering Coordination</option>
            <option value="venue-selection">Venue Selection</option>
            <option value="entertainment-logistics">Entertainment & Logistics</option>
            <option value="photography-films">Photography & Films</option>
          </select>
          
          <select required defaultValue="image" onChange={e => setPortfolioData({...portfolioData, media_type: e.target.value})}>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
          
          <input type="file" required onChange={e => setPortfolioData({...portfolioData, file: e.target.files[0]})} />
          <button type="submit" disabled={loading}>Save to Portfolio</button>
        </form>
      </section>

      <section className={styles.section}>
        <h2>Testimonials</h2>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'testimonials', { identifier: testimonialData.identifier, name: testimonialData.name, comment: testimonialData.comment, stars: testimonialData.stars })}>
          <input type="text" placeholder="Identifier (e.g., test-1)" required onChange={e => setTestimonialData({...testimonialData, identifier: e.target.value})} />
          <input type="text" placeholder="Name" required onChange={e => setTestimonialData({...testimonialData, name: e.target.value})} />
          <textarea placeholder="Comment" required onChange={e => setTestimonialData({...testimonialData, comment: e.target.value})} />
          <input type="number" min="1" max="5" placeholder="Stars (1-5)" required onChange={e => setTestimonialData({...testimonialData, stars: parseInt(e.target.value)})} />
          <button type="submit" disabled={loading}>Save Testimonial</button>
        </form>

        <h3>Watch Their Experience</h3>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'experiences', { identifier: experienceData.identifier, title: experienceData.title }, { file: experienceData.file, bucket: 'testimonials', columnName: 'video_url' })}>
          <input type="text" placeholder="Identifier" required onChange={e => setExperienceData({...experienceData, identifier: e.target.value})} />
          <input type="text" placeholder="Title" required onChange={e => setExperienceData({...experienceData, title: e.target.value})} />
          <input type="file" accept="video/*, image/*" required onChange={e => setExperienceData({...experienceData, file: e.target.files[0]})} />
          <button type="submit" disabled={loading}>Save Experience Media</button>
        </form>

        <h3>Smiles We Created</h3>
        <form className={styles.group} onSubmit={(e) => handleSubmit(e, 'smiles', { identifier: smileData.identifier }, { file: smileData.file, bucket: 'smiles', columnName: 'image_url' })}>
          <input type="text" placeholder="Identifier" required onChange={e => setSmileData({...smileData, title: e.target.value})} />
          <input type="file" accept="image/*" required onChange={e => setSmileData({...smileData, file: e.target.files[0]})} />
          <button type="submit" disabled={loading}>Save Smile Image</button>
        </form>
      </section>
    </div>
  );
}