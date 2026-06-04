import { useEffect, useRef } from 'react';
import ShinyText from './components/ShinyText';
import GlareHover from './components/GlareHover';
import SplashCursor from './components/SplashCursor';

const SectionTitle = ({ text }) => {
  const chars = text.split('');
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          titleRef.current.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2 className="section-title" ref={titleRef}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="letter-split"
          style={{ transitionDelay: `${index * 0.06}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h2>
  );
};

const ProjectCard = ({ children }) => (
  <GlareHover
    width="100%"
    height="100%"
    background="var(--bg-card)"
    borderColor="var(--border-color)"
    borderRadius="16px"
    glareColor="#ffffff"
    glareOpacity={0.15}
    glareAngle={-45}
    className="project-card glass-card"
    style={{ display: 'flex', placeItems: 'stretch' }}
  >
    {children}
  </GlareHover>
);

function App() {
  useEffect(() => {
    // Scroll Reveal Animation Setup for fade-in elements
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for anchor links
    const handleSmoothScroll = function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    const handleMouseMove = (e) => {
      const bgFx = document.querySelector('.bg-fx');
      if (bgFx) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        
        if (blob1) blob1.style.transform = `translate(${x}px, ${y}px)`;
        if (blob2) blob2.style.transform = `translate(${-x}px, ${-y}px)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={true}
        RAINBOW_MODE={false}
        COLOR="#A855F7"
      />
      <div className="bg-fx">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero section-padding">
          <div className="container hero-content">
            <p className="greeting">Hello, I am</p>
            <h1 className="name">
              <ShinyText 
                text="Pranav Hariharan" 
                speed={2} 
                delay={3.0}
                color="#A2D9BA"
                shineColor="#E2F5EA" 
                spread={145}
                direction="left"
                yoyo={false}
                pauseOnHover={true}
                disabled={false}
                runOnce={true} 
              />
            </h1>
            <h2 className="tagline">Full Stack Developer and ML enthusiast</h2>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Contact Me</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section-padding fade-in">
          <div className="container">
            <SectionTitle text="About Me" />
            <div className="about-content glass-card">
              <p>
                I’m an AI &amp; Data Science undergraduate at IIIT Kottayam focused on building impactful software products that combine intelligent systems with polished user experiences. My work spans machine learning pipelines, full-stack web platforms, voice interfaces, civic-tech applications, and real-time collaborative systems.
              </p>
              <p>
                I enjoy solving practical problems through clean architecture, scalable systems, and deployable products rather than just prototypes. I’m especially interested in AI agents, intelligent automation, developer tooling, and human-centered software experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="education section-padding fade-in">
          <div className="container">
            <SectionTitle text="Education" />
            <div className="timeline">
              <div className="timeline-item glass-card">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Expected Graduation: May 2028</div>
                <h3 className="timeline-title">Indian Institute of Information Technology Kottayam</h3>
                <h4 className="timeline-subtitle">B.Tech — Computer Science &amp; Engineering (AI &amp; Data Science)</h4>
                <p className="timeline-detail">CGPA: <strong>9.76</strong></p>
              </div>
              <div className="timeline-item glass-card">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Graduated: April 2024</div>
                <h3 className="timeline-title">The PSBB Millennium School</h3>
                <h4 className="timeline-subtitle">AISSCE</h4>
                <p className="timeline-detail">Score: <strong>97.8%</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience section-padding fade-in">
          <div className="container">
            <SectionTitle text="Experience" />
            <div className="experience-card glass-card">
              <div className="exp-header">
                <div>
                  <h3 className="role">Java Developer Intern</h3>
                  <h4 className="company">Elevate Labs</h4>
                </div>
                <div className="duration">Jun 2025 – Jul 2025</div>
              </div>
              <div className="exp-body">
                <h5>Responsibilities &amp; Achievements</h5>
                <ul>
                  <li>Built an end-to-end college admission management system in Java.</li>
                  <li>Automated seat allocation across multiple courses and reservation categories using a merit-ranking algorithm.</li>
                  <li>Designed backend modules for: Application processing, Eligibility verification, and Admission status tracking.</li>
                  <li>Enforced modular architecture with Git-based version control.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects section-padding fade-in">
          <div className="container">
            <SectionTitle text="Projects" />
            <div className="project-grid">
              {/* AuditFlow */}
              <ProjectCard>
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">AuditFlow</h3>
                    <a href="https://auditflow-alpha.vercel.app/" className="btn-live">Live</a>
                  </div>
                  <p className="project-subtitle">Intelligent Bill Extraction Platform</p>
                  <p className="project-desc">Eliminates manual data entry for auditors by automatically extracting key financial fields — vendor, GST, bill number, date, and totals — from scanned invoices and bill images.</p>
                  <ul className="project-highlights">
                    <li>Automated invoice data extraction</li>
                    <li>AI-powered OCR workflow</li>
                    <li>One-click Excel export</li>
                    <li>Reduced invoice processing time from minutes to seconds</li>
                  </ul>
                  <div className="project-footer">
                    <div className="tech-stack">
                      <span>HTML</span><span>JavaScript</span><span>Groq API</span><span>Vercel</span>
                    </div>
                    <a href="https://github.com/PranavHariharan19/Auditflow" className="btn-repo">Visit Repository</a>
                  </div>
                </div>
              </ProjectCard>

              {/* Voice Assistant */}
              <ProjectCard>
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">Voice Assistant</h3>
                    <a href="https://voice-assistant-sand-three.vercel.app/" className="btn-live">Live</a>
                  </div>
                  <p className="project-subtitle">Voice-Powered Scheduling System</p>
                  <p className="project-desc">Built to eliminate the friction of opening a calendar app mid-task by allowing users to schedule, reschedule, and delete events entirely through voice interaction.</p>
                  <ul className="project-highlights">
                    <li>Natural language calendar management</li>
                    <li>Speech-to-intent AI pipeline</li>
                    <li>Fully screenless interaction loop</li>
                    <li>Voice confirmations using synthesized speech</li>
                  </ul>
                  <div className="project-footer">
                    <div className="tech-stack">
                      <span>Next.js</span><span>Web Speech API</span><span>Gemini API</span><span>Supabase</span>
                    </div>
                    <a href="https://github.com/PranavHariharan19/Voice-Assistant" className="btn-repo">Visit Repository</a>
                  </div>
                </div>
              </ProjectCard>

              {/* Learnmate Vidya */}
              <ProjectCard>
                <div className="project-content">
                  <h3 className="project-title">Learnmate Vidya</h3>
                  <p className="project-subtitle">Adaptive Learning Intelligence Platform</p>
                  <p className="project-desc">Adaptive learning platform featuring collaborative sessions, quizzes, whiteboards, and behavioral analytics.</p>
                  <ul className="project-highlights">
                    <li>Real-time collaborative learning</li>
                    <li>Student behavioral metrics engine</li>
                    <li>Automated SWOT analysis</li>
                    <li>Personalized recommendation system</li>
                    <li>Logged 5+ interaction types</li>
                  </ul>
                  <div className="project-footer">
                    <div className="tech-stack">
                      <span>React</span><span>Node.js</span><span>Firebase</span>
                    </div>
                    <a href="https://github.com/venkatayaswanth-IIITan/Learnmate-Vidya" className="btn-repo">Visit Repository</a>
                  </div>
                </div>
              </ProjectCard>

              {/* CLIMORAE */}
              <ProjectCard>
                <div className="project-content">
                  <h3 className="project-title">CLIMORAE</h3>
                  <p className="project-subtitle">Climate Resilience Web Platform</p>
                  <p className="project-desc">Climate-focused civic platform combining real-time analytics, gamification, AI assistance, and public engagement tools.</p>
                  <ul className="project-highlights">
                    <li>Interactive climate analytics dashboard</li>
                    <li>Real-time weather API integration</li>
                    <li>AI chatbot for climate &amp; agriculture</li>
                    <li>Civic event coordination portal</li>
                    <li>Gamified learning system</li>
                  </ul>
                  <div className="project-footer">
                    <div className="tech-stack">
                      <span>React</span><span>Node.js</span><span>PostgreSQL</span>
                    </div>
                    <a href="https://github.com/a6hinandh/Climate_Resilience" className="btn-repo">Visit Repository</a>
                  </div>
                </div>
              </ProjectCard>

              {/* Civic Report */}
              <ProjectCard>
                <div className="project-content">
                  <h3 className="project-title">Civic Report</h3>
                  <p className="project-subtitle">Civic Issue Reporting App</p>
                  <p className="project-desc">Cross-platform civic reporting application enabling citizens to report public issues with media uploads and geo-visualization.</p>
                  <ul className="project-highlights">
                    <li>Dual-interface mobile application</li>
                    <li>Heatmap-based issue density visualization</li>
                    <li>Complaint management dashboard</li>
                    <li>Upvotes, comments, and media uploads</li>
                    <li>Geographic clustering for issue tracking</li>
                  </ul>
                  <div className="project-footer">
                    <div className="tech-stack">
                      <span>Flutter</span><span>Firebase</span><span>Supabase</span>
                    </div>
                    <a href="https://github.com/PranavHariharan19/CivicReport" className="btn-repo">Visit Repository</a>
                  </div>
                </div>
              </ProjectCard>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills section-padding fade-in">
          <div className="container">
            <SectionTitle text="Skills" />
            <div className="skills-grid">
              <div className="skill-category glass-card">
                <h3>Languages</h3>
                <div className="skill-tags">
                  <span>Python</span><span>Java</span><span>C</span>
                </div>
              </div>
              <div className="skill-category glass-card">
                <h3>AI / ML</h3>
                <div className="skill-tags">
                  <span>TensorFlow</span><span>Keras</span><span>Scikit-learn</span><span>MLflow</span><span>Prefect</span>
                </div>
              </div>
              <div className="skill-category glass-card">
                <h3>Data Science</h3>
                <div className="skill-tags">
                  <span>NumPy</span><span>Pandas</span><span>Matplotlib</span><span>Seaborn</span>
                </div>
              </div>
              <div className="skill-category glass-card">
                <h3>Frameworks &amp; Tools</h3>
                <div className="skill-tags">
                  <span>React</span><span>Next.js</span><span>Flutter</span><span>Node.js</span><span>Git</span><span>Google Cloud Platform</span>
                </div>
              </div>
              <div className="skill-category glass-card">
                <h3>Databases</h3>
                <div className="skill-tags">
                  <span>Firebase</span><span>PostgreSQL</span><span>MySQL</span><span>Supabase</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source & Certifications */}
        <section id="achievements" className="achievements section-padding fade-in">
          <div className="container">
            <div className="split-grid">
              <div className="achievements-col">
                <SectionTitle text="Open Source &amp; Achievements" />
                <div className="glass-card">
                  <h3 className="item-title">GirlScript Summer of Code Contributor — 2026</h3>
                  
                  <div className="sub-item mt-3">
                    <h4>Open Source Track</h4>
                    <p>Selected contributor for GsSOC 2026 in the Open Source Track.</p>
                  </div>
                  
                  <div className="sub-item mt-3">
                    <h4>AI Agents Track</h4>
                    <p>Selected contributor for GsSOC 2026 in the AI Agents Track.</p>
                  </div>
                </div>
              </div>
              
              <div className="certifications-col">
                <SectionTitle text="Certifications" />
                <div className="glass-card">
                  <h3 className="item-title">Data Science with Python — Finlatics</h3>
                  <p className="mt-2">Hands-on exploratory data analysis using:</p>
                  <ul className="cert-list">
                    <li>NumPy</li>
                    <li>Pandas</li>
                    <li>Matplotlib</li>
                    <li>Seaborn</li>
                  </ul>
                  <p className="mt-2"><em>Worked with real-world datasets</em></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section-padding fade-in">
          <div className="container">
            <div className="contact-box glass-card text-center">
              <SectionTitle text="Get In Touch" />
              <p className="contact-text">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
              
              <div className="contact-links mt-4">
                <a href="mailto:pranavhariharanofficial@gmail.com" className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  pranavhariharanofficial@gmail.com
                </a>
                <div className="social-links mt-3">
                  <a href="https://www.linkedin.com/in/pranav-hariharan-4202a9320/" className="social-icon" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    LinkedIn
                  </a>
                  <a href="https://github.com/PranavHariharan19" className="social-icon" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container text-center">
          <p>&copy; 2026 Pranav Hariharan. Designed with precision.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
