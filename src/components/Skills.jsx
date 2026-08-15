import PhysicsCanvas from './PhysicsCanvas';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Java', 'C', 'Python', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
      title: 'Web Development',
      skills: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'Authentication', 'API Integration']
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'MySQL']
    },
    {
      title: 'Tools & Workflow',
      skills: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Postman', 'npm']
    },
    {
      title: 'Core Focus',
      skills: ['Data Structures & Algorithms', 'OOP', 'Problem Solving']
    }
  ];

  return (
    <section id="skills" className="content-section">
      <h2 className="section-title block-reveal">
        <span className="block-reveal-content">Skills</span>
      </h2>
      
      <div className="skills-container" style={{ marginBottom: '4rem' }}>
        {skillCategories.map((category, catIdx) => (
          <div key={catIdx} className="skills-category">
            <h3 className="skills-category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="skill-card">
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PhysicsCanvas />
    </section>
  );
}
