import { useState } from 'react';

export default function Services() {
  const servicesList = [
    {
      num: '01',
      title: 'Frontend Dev',
      subtitle: 'Web Interfaces',
      desc: 'Building responsive, highly interactive web applications with clean layout architectures, fluid grid alignments, and smooth micro-animations.',
      skills: ['React.js', 'JavaScript', 'HTML5 & CSS3', 'Responsive Design', 'Micro-animations'],
      svg: (
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Wireframe browser mock */}
          <rect x="10" y="10" width="180" height="100" rx="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="10" y1="26" x2="190" y2="26" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="20" cy="18" r="3" fill="currentColor" fillOpacity="0.4" />
          <circle cx="30" cy="18" r="3" fill="currentColor" fillOpacity="0.4" />
          <circle cx="40" cy="18" r="3" fill="currentColor" fillOpacity="0.4" />
          {/* Grid blocks */}
          <rect x="22" y="38" width="50" height="30" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="82" y="38" width="96" height="30" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="22" y="78" width="156" height="20" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      )
    },
    {
      num: '02',
      title: 'Backend Dev',
      subtitle: 'API & Databases',
      desc: 'Constructing performant server systems, secure authentication middleware, and robust relational or non-relational database schemas.',
      skills: ['Node.js', 'Express.js', 'REST API Design', 'MongoDB', 'MySQL & Schemas'],
      svg: (
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Connected database nodes */}
          <rect x="70" y="10" width="60" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <text x="100" y="26" fill="currentColor" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">/SERVER</text>
          
          <path d="M100 34 L100 60 M100 60 L45 80 M100 60 L155 80" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
          
          <rect x="15" y="80" width="60" height="28" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <text x="45" y="96" fill="currentColor" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">SQL_DB</text>
          
          <rect x="125" y="80" width="60" height="28" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <text x="155" y="96" fill="currentColor" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">MONGO_NOSQL</text>
        </svg>
      )
    },
    {
      num: '03',
      title: 'Core Solver',
      subtitle: 'DSA & OOP Java',
      desc: 'Formulating efficient algorithms, structuring codebases with OOP inheritance, and debugging software through rigorous problem-solving logic.',
      skills: ['Java Core', 'Algorithms', 'Data Structures', 'OOP Paradigms', 'Problem Solving'],
      svg: (
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Binary Search Tree/Binary Node layout */}
          <circle cx="100" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="50" cy="60" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="150" cy="60" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="25" cy="100" r="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="75" cy="100" r="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          
          <line x1="91" y1="28" x2="59" y2="52" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="109" y1="28" x2="141" y2="52" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="43" y1="69" x2="32" y2="91" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="57" y1="69" x2="68" y2="91" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="content-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '100px' }}>
      {/* Title */}
      <h2 className="section-title block-reveal">
        <span className="block-reveal-content">Services</span>
      </h2>

      {/* Services Monochromatic Accordion wrapper */}
      <div className="services-wrapper">
        {servicesList.map((srv, idx) => (
          <div key={idx} className="services-block">
            {/* Number */}
            <div className="services-block__number">{srv.num}</div>

            {/* Shift Title wrapper */}
            <div className="services-block__title-wrap">
              <h3 className="services-block__title">{srv.title}</h3>
            </div>

            {/* Sliding Subtitle */}
            <div className="services-block__second-title-wrap">
              <h3 className="services-block__second-title">{srv.subtitle}</h3>
            </div>

            {/* Image/SVG Container mask */}
            <div className="services-block__img-wrap">
              <div className="services-block__img-inner">
                {srv.svg}
              </div>
            </div>

            {/* Delayed description */}
            <p className="services-block__text">{srv.desc}</p>

            {/* Key list items */}
            <ul className="services-block__list">
              {srv.skills.map((skill, sIdx) => (
                <li key={sIdx}>
                  <span>[{skill}]</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
