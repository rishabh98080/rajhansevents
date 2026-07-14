"use client"

import styles from './Manage.module.css';
import { supabase } from '@/app/pages/api/supabaseClient';

export default function ManagePage() {
    const categories = ['All', 'Weddings', 'Corporate', 'Social', 'Destination'];
    const uploadToSupabase = async (file, fixedFileName) => {
      if (!file) return null;

      if (!supabase) {
        console.error("Supabase client is not initialized!");
        return null;
      }

      const filePath = `uploads/${fixedFileName}`;

      const { data, error } = await supabase.storage
        .from('website-assets')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type 
        });

      if (error) {
        console.error("Upload error:", error);
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from('website-assets')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const clean = (obj) => Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null && v !== "")
      );

      const getFileUrl = async (fileInput, fixedFileName) => {
        if (fileInput?.files?.[0]) {
          console.log(`Uploading ${fileInput.files[0].name} as ${fixedFileName}`);
          return await uploadToSupabase(fileInput.files[0], fixedFileName);
        }
        return null;
      };

      const payload = {
        websiteSettings: clean({
          logo_url: await getFileUrl(e.target.logo, "logo.jpg"),
          banner_video_url: await getFileUrl(e.target.banner_video, "banner_video.mp4"),
          home_title: e.target.banner_title?.value,
          home_description: e.target.banner_text?.value,
          founded: e.target.founded?.value,
          email: e.target.email?.value,
          phone: e.target.phone?.value,
          location: e.target.location?.value,
          instagram: e.target.insta?.value,
          facebook: e.target.fb?.value
        }),

        expertise: (await Promise.all([1, 2, 3].map(async (i) => clean({
          title: e.target[`expertise_title${i}`]?.value,
          image_url: await getFileUrl(e.target[`expertise_img${i}`], `expertise_${i}.jpg`)
        })))).filter(item => item.title),

        featured: (await Promise.all([1, 2, 3].map(async (i) => clean({
          title: e.target[`feat_title${i}`]?.value,
          image_url: await getFileUrl(e.target[`feat_img${i}`], `feat_${i}.jpg`)
        })))).filter(f => f.title),

        word_of_love: [1, 2, 3].map(i => clean({
          comment: e.target[`love_comment${i}`]?.value,
          name: e.target[`love_name${i}`]?.value
        })).filter(w => w.comment),

        about: clean({
          description: e.target.about_desc?.value
        }),

        team: (await Promise.all([1, 2, 3].map(async (i) => clean({
          name: e.target[`team_n${i}`]?.value,
          photo_url: await getFileUrl(e.target[`team_p${i}`], `team_${i}.jpg`)
        })))).filter(t => t.name),

        services: (await Promise.all([1, 2, 3].map(async (i) => clean({
          title: e.target[`serv_title${i}`]?.value,
          image_url: await getFileUrl(e.target[`serv_img${i}`], `service_${i}.jpg`)
        })))).filter(s => s.title),

        packages: [1].map(i => clean({
          name: e.target[`pkg${i}_name`]?.value,
          features: [
            e.target[`pkg${i}_f1`]?.value,
            e.target[`pkg${i}_f2`]?.value,
            e.target[`pkg${i}_f3`]?.value,
            e.target[`pkg${i}_f4`]?.value
          ].filter(Boolean),
          price: e.target[`pkg${i}_price`]?.value
        })).filter(p => p.name),

        portfolio: {
          category: e.target.category?.value
        },

        testimonials: [1].map(i => clean({
          stars: e.target[`stars${i}`]?.value ? parseInt(e.target[`stars${i}`].value) : null,
          comment: e.target[`t_comm${i}`]?.value,
          name: e.target[`t_name${i}`]?.value
        })).filter(t => t.comment),

        watch_experience: (await Promise.all([1].map(async (i) => clean({
          title: e.target[`exp_title${i}`]?.value,
          video_url: await getFileUrl(e.target[`exp_vid${i}`], `exp_vid_${i}.mp4`)
        })))).filter(v => v.title),

        smiles: (await Promise.all([1, 2, 3].map(async (i) => clean({
          image_url: await getFileUrl(e.target[`smile_img${i}`], `smile_${i}.jpg`)
        })))).filter(s => s.image_url)
      };

      const hasData = Object.values(payload).some(section =>
        Array.isArray(section) ? section.length > 0 : Object.keys(section).length > 0
      );

      if (!hasData) {
        alert("No changes detected.");
        return;
      }

      await fetch('http://localhost:5000/api/save', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
    };

    return (
      <div className={styles.container}>
        <h1>Website Content Manager</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
            
            {/* HOME SECTION */}
            <section className={styles.section}>
                <h2>Home Page</h2>
                <label>Logo</label> 
                <input type="file" name="logo" className={styles.input} placeholder="Upload image file (PNG/JPG)" />
                
                <label>Video Banner</label> 
                <input type="file" name="banner_video" className={styles.input} placeholder="Upload video file (MP4)" />
                
                <label>Title on Banner</label> 
                <input type="text" name="banner_title" className={styles.input} placeholder="Text string - Main heading title" />
                
                <label>Text under Title</label> 
                <textarea name="banner_text" className={styles.input} placeholder="Long text string - Subtitle context description"></textarea>
                
                <h3>Our Expertise (3 items)</h3>
                <div className={styles.group}>
                    <input type="file" name="expertise_img1" className={styles.input} placeholder="Upload image file" /> 
                    <input type="text" name="expertise_title1" className={styles.input} placeholder="Title string for item 1" />
                    
                    <input type="file" name="expertise_img2" className={styles.input} placeholder="Upload image file" /> 
                    <input type="text" name="expertise_title2" className={styles.input} placeholder="Title string for item 2" />
                    
                    <input type="file" name="expertise_img3" className={styles.input} placeholder="Upload image file" /> 
                    <input type="text" name="expertise_title3" className={styles.input} placeholder="Title string for item 3" />
                </div>

                <h3>Featured (3 items)</h3>
                <div className={styles.group}>
                    <input type="file" name="feat_img1" className={styles.input} placeholder="Upload image file" /> 
                    <input type="text" name="feat_title1" className={styles.input} placeholder="Text title for featured item 1" />
                    
                    <input type="file" name="feat_img2" className={styles.input} placeholder="Upload image file" /> 
                    <input type="text" name="feat_title2" className={styles.input} placeholder="Text title for featured item 2" />
                    
                    <input type="file" name="feat_img3" className={styles.input} placeholder="Upload image file" /> 
                    <input type="text" name="feat_title3" className={styles.input} placeholder="Text title for featured item 3" />
                </div>

                <label>Founded Date/Text</label> 
                <input type="text" name="founded" className={styles.input} placeholder="Text string or date format (e.g., Est. 2010)" />

                <h3>Words of Love (Testimonials)</h3>
                <textarea name="love_comment1" className={styles.input} placeholder="Comment description string 1"></textarea> 
                <input type="text" name="love_name1" className={styles.input} placeholder="Author name string 1" />
                
                <textarea name="love_comment2" className={styles.input} placeholder="Comment description string 2"></textarea> 
                <input type="text" name="love_name2" className={styles.input} placeholder="Author name string 2" />
                
                <textarea name="love_comment3" className={styles.input} placeholder="Comment description string 3"></textarea> 
                <input type="text" name="love_name3" className={styles.input} placeholder="Author name string 3" />

                <h3>Contact Info</h3>
                <input type="email" name="email" className={styles.input} placeholder="Email format (e.g., contact@domain.com)" />
                <input type="tel" name="phone" className={styles.input} placeholder="Telephone number format (e.g., +123456789)" />
                <input type="text" name="location" className={styles.input} placeholder="Physical location address string" />
                <input type="text" name="insta" className={styles.input} placeholder="Valid Instagram profile URL address" />
                <input type="text" name="fb" className={styles.input} placeholder="Valid Facebook profile URL address" />
            </section>

            {/* ABOUT US */}
            <section className={styles.section}>
                <h2>About Us</h2>
                <textarea name="about_desc" className={styles.input} placeholder="Long paragraph text detailing the company backstory"></textarea>
                
                <h3>Team</h3>
                <input type="file" name="team_p1" className={styles.input} placeholder="Upload profile picture" /> 
                <input type="text" name="team_n1" className={styles.input} placeholder="Team member name 1" />
                
                <input type="file" name="team_p2" className={styles.input} placeholder="Upload profile picture" /> 
                <input type="text" name="team_n2" className={styles.input} placeholder="Team member name 2" />
                
                <input type="file" name="team_p3" className={styles.input} placeholder="Upload profile picture" /> 
                <input type="text" name="team_n3" className={styles.input} placeholder="Team member name 3" />
                
                <h3>Services</h3>
                <input type="file" name="serv_img1" className={styles.input} placeholder="Upload service vector/image" /> 
                <input type="text" name="serv_title1" className={styles.input} placeholder="Service title 1 description" />
                
                <input type="file" name="serv_img2" className={styles.input} placeholder="Upload service vector/image" /> 
                <input type="text" name="serv_title2" className={styles.input} placeholder="Service title 2 description" />
                
                <input type="file" name="serv_img3" className={styles.input} placeholder="Upload service vector/image" /> 
                <input type="text" name="serv_title3" className={styles.input} placeholder="Service title 3 description" />
            </section>

            {/* PACKAGES */}
            <section className={styles.section}>
                <h2>Packages</h2>
                <div className={styles.group}>
                    <input type="text" name="pkg1_name" className={styles.input} placeholder="Package name title designation" />
                    <input type="text" name="pkg1_f1" className={styles.input} placeholder="Feature text item line 1" /> 
                    <input type="text" name="pkg1_f2" className={styles.input} placeholder="Feature text item line 2" /> 
                    <input type="text" name="pkg1_f3" className={styles.input} placeholder="Feature text item line 3" /> 
                    <input type="text" name="pkg1_f4" className={styles.input} placeholder="Feature text item line 4" />
                    <input type="text" name="pkg1_price" className={styles.input} placeholder="Price designation value (e.g., $99/mo)" />
                </div>
            </section>

            {/* PORTFOLIO */}
            <section className={styles.section}>
                <h2>Portfolio</h2>
                <input type="file" name="port_photos" multiple className={styles.input} placeholder="Select multiple static image showcase items" />
                <input type="file" name="port_videos" multiple className={styles.input} placeholder="Select multiple video showcase items" />
                <label>Category</label>
                <select name="category" className={styles.input} defaultValue="All">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
            </section>

            {/* TESTIMONIALS & SMILES */}
            <section className={styles.section}>
                <h2>Testimonials</h2>
                <input type="number" name="stars1" min="1" max="5" className={styles.input} placeholder="Numeric value ranking score rating from 1 to 5" /> 
                <textarea name="t_comm1" className={styles.input} placeholder="Textual feedback response dialogue review commentary"></textarea> 
                <input type="text" name="t_name1" className={styles.input} placeholder="Review author signature tag name identification" />
                
                <h3>Watch Their Experience</h3>
                <input type="file" name="exp_vid1" className={styles.input} placeholder="Upload media presentation video clip" /> 
                <input type="text" name="exp_title1" className={styles.input} placeholder="Caption context text string title statement" />
                
                <h3>Smiles We Created</h3>
                <input type="file" name="smile_img1" className={styles.input} placeholder="Showcase smile gallery image item 1" /> 
                <input type="file" name="smile_img2" className={styles.input} placeholder="Showcase smile gallery image item 2" /> 
                <input type="file" name="smile_img3" className={styles.input} placeholder="Showcase smile gallery image item 3" />
            </section>

            <button type="submit" className={styles.button}>Submit Content</button>
        </form>
      </div>
    );
}