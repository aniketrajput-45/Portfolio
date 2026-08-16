import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import userPhoto from '../assets/user_photo.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text lines slide up reveal
      const lineWrappers = gsap.utils.toArray('.anim-line-wrapper > span');
      lineWrappers.forEach((line) => {
        gsap.fromTo(line, 
          { y: '105%', rotate: 1 },
          {
            y: '0%',
            rotate: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 95%',
              end: 'top 82%',
              scrub: 1.1,
            }
          }
        );
      });

      // 2. Images reveal with clip path and scale down
      const animImages = gsap.utils.toArray('.anim-img img');
      animImages.forEach((img) => {
        gsap.fromTo(img,
          { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scale: 1.25 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 88%',
              end: 'top 65%',
              scrub: 1.1,
            }
          }
        );
      });

      // 3. Section Titles and headers reveal
      const headers = gsap.utils.toArray('.anim-header');
      headers.forEach((header) => {
        gsap.fromTo(header,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 92%',
              end: 'top 78%',
              scrub: 1.1,
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="content-section about-section-wrapper" ref={containerRef}>
      <h2 className="about-title anim-header">about me</h2>
      
      <div className="about__wrapper">
        <div className="about-container">
          
          {/* Top Info line */}
          <div className="about-first__wrapper">
            <div className="about-first-top">
              <p><span>2/5</span></p>
              <p><span>for me</span></p>
              <p><span>dsgn/2</span></p>
            </div>
          </div>

          <div className="about-second__wrapper">
            {/* Left Col / Main Grid */}
            <div className="about-second__top">
              <h4 className="anim-header"><span>about me</span></h4>
              
              {/* Row 1: Intro block */}
              <div className="about-second-text text-first">
                <div className="text-first__img anim-img">
                  <img src={userPhoto} alt="Aniket Kumar Singh" />
                </div>
                <p className="text-first__text">
                  <span className="anim-line-wrapper">
                    <span>Hello!</span>
                  </span>
                  <span className="anim-line-wrapper">
                    <span>I’m Aniket Singh</span>
                  </span>
                </p>
              </div>

              {/* Row 2: Experience block */}
              <div className="about-second-text text-second">
                <h3 className="anim-header">
                  my experience
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 21" fill="none" style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
                    <path d="M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </h3>
                <div className="text-second__text">
                  <span className="anim-line-wrapper">
                    <span>a Full Stack Developer with over 3</span>
                  </span>
                  <span className="anim-line-wrapper">
                    <span>years of experience in creating digital</span>
                  </span>
                  <span className="anim-line-wrapper">
                    <span>products and scaling code architectures.</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3: Quote block */}
            <div className="about-second-title">
              <h2 className="anim-header">
                It’s not just a<br />
                profession   -   it’s a way<br />
                of thinking.
              </h2>
            </div>

            {/* Row 4: Drive block */}
            <div className="about-second-text text-first abs-t">
              <p className="anim-line-wrapper">
                <span>My work is part of my lifestyle. As</span>
              </p>
              <p className="anim-line-wrapper">
                <span>a developer, I am constantly</span>
              </p>
              <p className="anim-line-wrapper">
                <span>observing the world: I notice how</span>
              </p>
              <p className="anim-line-wrapper">
                <span>systems scale, how code executes,</span>
              </p>
              <p className="anim-line-wrapper">
                <span>how data flows.</span>
              </p>
            </div>

            {/* Row 5: Philosophy block */}
            <div className="about-second-text text-second ast-s">
              <h3 className="anim-header">
                my philosophy
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 21" fill="none" style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
                  <path d="M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </h3>
              <div className="text-second__text">
                <span className="anim-line-wrapper">
                  <span>I value logic, clean code, and</span>
                </span>
                <span className="anim-line-wrapper">
                  <span>performance — both in design and in</span>
                </span>
                <span className="anim-line-wrapper">
                  <span>life. I am close to the idea of</span>
                </span>
                <span className="anim-line-wrapper">
                  <span>conscious minimalism: leaving only what</span>
                </span>
                <span className="anim-line-wrapper">
                  <span>makes sense and works for results.</span>
                </span>
              </div>
            </div>

            {/* Row 6: Lifestyle block */}
            <div className="about-second-text text-third">
              <div className="text-third__wrapper">
                {/* Visual monospace text grid in place of stock photos */}
                <div className="text-third__deco-grid">
                  <div className="deco-tile">
                    <span className="tile-code">#include &lt;dsa&gt;</span>
                  </div>
                  <div className="deco-tile">
                    <span className="tile-code">class Portfolio &#123;&#125;</span>
                  </div>
                </div>

                <div className="text-third__title">
                  <h3 className="anim-header">
                    my lifestyle
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 21" fill="none" style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
                      <path d="M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </h3>
                  <div className="text-second__text">
                    <span className="anim-line-wrapper">
                      <span>I look for engineering elegance everywhere:</span>
                    </span>
                    <span className="anim-line-wrapper">
                      <span>in clean code structures, in the</span>
                    </span>
                    <span className="anim-line-wrapper">
                      <span>details of architecture, in optimized</span>
                    </span>
                    <span className="anim-line-wrapper">
                      <span>database queries, and even in the</span>
                    </span>
                    <span className="anim-line-wrapper">
                      <span>simple automation of daily life.</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
