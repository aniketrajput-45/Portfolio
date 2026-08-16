import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const tableRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text lines slide up reveal for single-line categories, titles, and badges
      const items = gsap.utils.toArray('.achievement-anim-wrapper > span');
      items.forEach((item) => {
        gsap.fromTo(item, 
          { y: '105%', rotate: 1 },
          {
            y: '0%',
            rotate: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
              end: 'top 82%',
              scrub: 1.1,
            }
          }
        );
      });

      // 2. Fade in up for descriptions to prevent clipping
      const descs = gsap.utils.toArray('.row-desc');
      descs.forEach((desc) => {
        gsap.fromTo(desc, 
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: desc,
              start: 'top 95%',
              end: 'top 85%',
              scrub: 1.1,
            }
          }
        );
      });

      // 3. Horizontal borders scale trigger
      const borders = gsap.utils.toArray('.achievement-row-border');
      borders.forEach((border) => {
        gsap.fromTo(border,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: border,
              start: 'top 92%',
              end: 'top 80%',
              scrub: 1.1,
            }
          }
        );
      });

    }, tableRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    {
      category: "EDUCATION // ACADEMIC",
      title: "Techno Main Salt Lake",
      description: "Pursuing Engineering degree while maintaining a strong 8.12 CGPA academic record.",
      tag: "8.12 CGPA"
    },
    {
      category: "COMPETITION // HACKATHON",
      title: "Hackolution finalist",
      description: "Advanced to the national finals of the national-level hackathon challenge.",
      tag: "NATIONAL FINALIST"
    },
    {
      category: "ENTERPRISE // HACKATHON",
      title: "Odoo Hackathon finalist",
      description: "Selected as a finalist in the national-level corporate platform innovation challenge.",
      tag: "NATIONAL FINALIST"
    },
    {
      category: "FOCUS // EXTRACURRICULAR",
      title: "DSA, Projects & Sports",
      description: "Actively solving data structure patterns, building full stack web projects, and playing sports.",
      tag: "ACTIVE ATHLETE"
    }
  ];

  return (
    <section id="achievements" className="content-section achievements-section" ref={tableRef}>
      <h2 className="section-title achievements-title">Achievements</h2>
      
      <div className="achievements-table">
        {/* Table Top border */}
        <div className="achievement-row-border" style={{ height: '1px', background: 'var(--border)', width: '100%' }}></div>
        
        {achievements.map((item, index) => (
          <div key={index} className="achievement-row">
            <div className="achievement-left">
              <span className="achievement-anim-wrapper category-text">
                <span>{item.category}</span>
              </span>
              <h3 className="achievement-anim-wrapper row-title">
                <span>{item.title}</span>
              </h3>
              <p className="row-desc">
                {item.description}
              </p>
            </div>
            
            <div className="achievement-right">
              <span className="achievement-anim-wrapper badge-text">
                <span>[ {item.tag} ]</span>
              </span>
            </div>

            {/* Row Bottom border */}
            <div className="achievement-row-border"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
