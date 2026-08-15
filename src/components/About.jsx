export default function About() {
  const codeLines = [
    { ln: '01', code: <><span className="syn-keyword">package</span> dev.aniket;</> },
    { ln: '02', code: <></> },
    { ln: '03', code: <><span className="syn-keyword">public class</span> <span className="syn-class">AniketSingh</span> <span className="syn-keyword">implements</span> <span className="syn-class">Developer</span> &#123;</> },
    { ln: '04', code: <><span className="syn-comment">    // Debugging life with meme patches.</span></> },
    { ln: '05', code: <><span className="syn-keyword">    private final</span> String <span className="syn-prop">name</span> = <span className="syn-string">"Aniket Kumar Singh"</span>;</> },
    { ln: '06', code: <><span className="syn-keyword">    private final</span> String <span className="syn-prop">title</span> = <span className="syn-string">"Full Stack Developer"</span>;</> },
    { ln: '07', code: <><span className="syn-keyword">    private</span> String[] <span className="syn-prop">focus</span> = &#123;<span className="syn-string">"Java"</span>, <span className="syn-string">"MERN"</span>, <span className="syn-string">"DSA"</span>&#125;;</> },
    { ln: '08', code: <></> },
    { ln: '09', code: <><span className="syn-keyword">    public</span> String[] <span className="syn-prop">getSkills</span>() &#123;</> },
    { ln: '10', code: <><span className="syn-keyword">        return new</span> String[] &#123;</> },
    { ln: '11', code: <><span className="syn-string">            "React.js"</span>, <span className="syn-string">"Node.js"</span>, <span className="syn-string">"Express.js"</span>,</> },
    { ln: '12', code: <><span className="syn-string">            "MySQL"</span>, <span className="syn-string">"MongoDB"</span>, <span className="syn-string">"REST APIs"</span>,</> },
    { ln: '13', code: <><span className="syn-string">            "Git"</span>, <span className="syn-string">"GitHub"</span>, <span className="syn-string">"IntelliJ"</span>, <span className="syn-string">"Postman"</span></> },
    { ln: '14', code: <><span className="syn-comment">            // Algorithms, Data Structures &amp; OOP focus</span></> },
    { ln: '15', code: <>        &#125;;</> },
    { ln: '16', code: <>    &#125;</> },
    { ln: '17', code: <><span className="syn-comment"></span>&#125;<span className="syn-cursor"></span></> }
  ];

  return (
    <section id="about" className="content-section">
      {/* Title with Block Reveal wrapper */}
      <h2 className="section-title block-reveal">
        <span className="block-reveal-content">About Me</span>
      </h2>
      
      <div className="about-grid">
        <div className="ide-window">
          <div className="ide-header">
            <div className="ide-dots">
              <div className="ide-dot close"></div>
              <div className="ide-dot minimize"></div>
              <div className="ide-dot zoom"></div>
            </div>
            <div className="ide-title">AniketSingh.java</div>
            <div style={{ width: '40px' }}></div> {/* spacer */}
          </div>

          <div className="ide-content">
            {codeLines.map((line, idx) => (
              <div key={idx} className="ide-line">
                <div className="ide-ln">{line.ln}</div>
                <div className="ide-code">{line.code}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
