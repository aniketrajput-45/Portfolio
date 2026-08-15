import { useState } from 'react';

function ProjectItem({ project, onSelect }) {
  const [transformStyle, setTransformStyle] = useState('none');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const maxRotate = 6; // subtle, elegant tilt
    const rotateX = -((y - centerY) / centerY) * maxRotate;
    const rotateY = ((x - centerX) / centerX) * maxRotate;
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('none');
  };

  return (
    <div 
      className="project-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{ transform: transformStyle }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(project);
        }
      }}
    >
      <div className="project-num">{project.num}</div>
      <h3 className="project-name">{project.name}</h3>
      <div className="project-arrow">
        <svg 
          width="24" 
          height="24" 
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
  );
}

export default function Work({ onSelectProject }) {
  const projects = [
    {
      num: '01',
      name: 'NYAYSARTHI',
      tagline: 'Justice-Tech / Legal Helper Platform',
      description: 'A comprehensive justice-tech platform designed to simplify legal access for citizens. Features include automated legal document templates, lawyer directories, simplified law guides, and client dashboards for managing cases.',
      stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Authentication'],
      github: 'https://github.com/aniketrajput-45',
      demo: null
    },
    {
      num: '02',
      name: 'TRANSITOPS',
      tagline: 'Transit Operations / Fleet Management',
      description: 'A logistics and transit operation solution built to streamline fleet management. Offers vehicle tracking integration, fuel expenditure analytics, maintenance reporting, expense logs, driver profile configurations, and real-time dashboard updates.',
      stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'Chart.js'],
      github: 'https://github.com/aniketrajput-45',
      demo: null
    },
    {
      num: '03',
      name: 'AGRISATHI',
      tagline: 'Agriculture Assistant / Farmer Portal',
      description: 'An agricultural assistant portal helping farmers optimize crop yields and access resources. Integrates weather forecasts, localized farming advisories, market crop price indexes, and diagnostic forums.',
      stack: ['Java', 'Python', 'HTML5', 'CSS3', 'MySQL', 'REST APIs'],
      github: 'https://github.com/aniketrajput-45',
      demo: null
    }
  ];

  return (
    <section id="work" className="content-section">
      <h2 className="section-title block-reveal">
        <span className="block-reveal-content">Work</span>
      </h2>
      
      <div className="work-list">
        {projects.map((project) => (
          <ProjectItem 
            key={project.num} 
            project={project} 
            onSelect={onSelectProject} 
          />
        ))}
      </div>
    </section>
  );
}
