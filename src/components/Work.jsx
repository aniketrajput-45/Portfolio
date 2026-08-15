import { useState } from 'react';

export default function Work({ onSelectProject }) {
  const projects = [
    {
      num: '01',
      name: 'NYAYSARTHI',
      subtitle: 'Justice-Tech',
      tagline: 'Justice-Tech / Legal Helper Platform',
      description: 'A comprehensive justice-tech platform designed to simplify legal access for citizens. Features include automated legal document templates, lawyer directories, simplified law guides, and client dashboards for managing cases.',
      stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      github: 'https://github.com/aniketrajput-45',
      demo: null,
      svg: (
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Scales of justice visual */}
          <path d="M100 20 L100 100 M70 100 L130 100" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M60 40 L140 40" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
          {/* Left scale */}
          <path d="M60 40 L45 75 L75 75 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          {/* Right scale */}
          <path d="M140 40 L125 75 L155 75 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      )
    },
    {
      num: '02',
      name: 'TRANSITOPS',
      subtitle: 'Fleet Operations',
      tagline: 'Transit Operations / Fleet Management',
      description: 'A logistics and transit operation solution built to streamline fleet management. Offers vehicle tracking integration, fuel expenditure analytics, maintenance reporting, expense logs, driver profile configurations, and real-time dashboard updates.',
      stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Chart.js'],
      github: 'https://github.com/aniketrajput-45',
      demo: null,
      svg: (
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Fleet routing / tracking chart */}
          <rect x="20" y="80" width="160" height="2" fill="currentColor" fillOpacity="0.4" />
          {/* Graph bars */}
          <rect x="35" y="50" width="18" height="30" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="70" y="30" width="18" height="50" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="105" y="40" width="18" height="40" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="140" y="20" width="18" height="60" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          {/* Trend line */}
          <path d="M44 45 L79 25 L114 35 L149 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        </svg>
      )
    },
    {
      num: '03',
      name: 'AGRISATHI',
      subtitle: 'Farmer Portal',
      tagline: 'Agriculture Assistant / Farmer Portal',
      description: 'An agricultural assistant portal helping farmers optimize crop yields and access resources. Integrates weather forecasts, localized farming advisories, market crop price indexes, and diagnostic forums.',
      stack: ['Java', 'Python', 'HTML5', 'CSS3', 'MySQL', 'REST APIs'],
      github: 'https://github.com/aniketrajput-45',
      demo: null,
      svg: (
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Plant / Growth leaf schematic */}
          <path d="M100 100 L100 20" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M100 70 Q70 60 70 45 Q70 30 100 50 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M100 50 Q130 40 130 25 Q130 10 100 30 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M100 90 Q125 80 125 65 Q125 50 100 70 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      )
    }
  ];

  return (
    <section id="work" className="content-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '100px' }}>
      <h2 className="section-title block-reveal">
        <span className="block-reveal-content">Work</span>
      </h2>
      
      <div className="projects-wrapper">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="project-block"
            onClick={() => onSelectProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectProject(project);
              }
            }}
          >
            {/* Number */}
            <div className="project-block__number">{project.num}</div>

            {/* Shift Title wrapper */}
            <div className="project-block__title-wrap">
              <h3 className="project-block__title">{project.name}</h3>
            </div>

            {/* Sliding Subtitle */}
            <div className="project-block__second-title-wrap">
              <h3 className="project-block__second-title">{project.subtitle}</h3>
            </div>

            {/* Image/SVG Container mask */}
            <div className="project-block__img-wrap">
              <div className="project-block__img-inner">
                {project.svg}
              </div>
            </div>

            {/* Delayed description */}
            <p className="project-block__text">{project.description}</p>

            {/* Key list items */}
            <ul className="project-block__list">
              {project.stack.map((tech, tIdx) => (
                <li key={tIdx}>
                  <span>[{tech}]</span>
                </li>
              ))}
            </ul>

            {/* Click to open details */}
            <div className="project-block__arrow">
              <span>VIEW DETAILS</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
