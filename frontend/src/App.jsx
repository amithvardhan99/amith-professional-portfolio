import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Network,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";
import SectionHeading from "./components/SectionHeading";
import Reveal from "./components/Reveal";
import MetricCard from "./components/MetricCard";
import ProjectCard from "./components/ProjectCard";
import SkillGroup from "./components/SkillGroup";
import ContactForm from "./components/ContactForm";
import { getProfile } from "./data/api";

const iconMap = {
  data: Database,
  ai: BrainCircuit,
  code: Code2,
  network: Network,
  work: BriefcaseBusiness,
};

function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile).catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    document.title = profile
      ? `${profile.name} | ${profile.title}`
      : "Amith Vardhan Reddy Surasani | Data Scientist";
  }, [profile]);

  if (error) {
    return <div className="load-error"><h1>Portfolio unavailable</h1><p>{error}</p></div>;
  }

  if (!profile) {
    return <div className="loading-screen"><div className="loader-orb" /><p>Building the experience...</p></div>;
  }

  const nav = [
    ["About", "about"],
    ["Experience", "experience"],
    ["Projects", "projects"],
    ["Skills", "skills"],
    ["Education", "education"],
    ["Contact", "contact"],
  ];

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <header className="nav-wrap">
        <nav className="nav container">
          <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">A</span>
            <span>AMITH<span className="brand-dot">.</span></span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let's talk <ArrowUpRight size={15} /></a>
          </div>

          <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <motion.div
              className="availability-pill"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="pulse-dot" /> {profile.availability}
            </motion.div>

            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              DATA SCIENCE • AI • ANALYTICS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Turning complex data into{" "}
              <span className="gradient-text">intelligent products.</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {profile.summary}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <a className="primary-button" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="secondary-button" href="#contact">Get in touch <Mail size={16} /></a>
            </motion.div>

            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="orbital-card">
              <div className="orbital-ring ring-one" />
              <div className="orbital-ring ring-two" />
              <div className="orbital-core">
                <div className="core-initials">AV</div>
                <span>DATA<br />SCIENTIST</span>
              </div>
              <div className="orbit-node node-one"><Database size={17} /></div>
              <div className="orbit-node node-two"><BrainCircuit size={17} /></div>
              <div className="orbit-node node-three"><Code2 size={17} /></div>
              <div className="orbit-label label-one">ML</div>
              <div className="orbit-label label-two">NLP</div>
              <div className="orbit-label label-three">AI</div>
            </div>
          </motion.div>
        </section>

        <section className="metrics container" aria-label="Selected impact metrics">
          {profile.metrics.map((metric, i) => {
            const Icon = iconMap[metric.icon] || Target;
            return <MetricCard key={metric.label} {...metric} icon={Icon} />;
          })}
        </section>

        <section className="section container" id="about">
          <SectionHeading
            eyebrow="01 / ABOUT"
            title="A data scientist with an end-to-end mindset."
            description="From data acquisition and wrangling to modeling, AI applications and stakeholder-facing insights."
          />
          <div className="about-grid">
            <Reveal className="about-story">
              {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </Reveal>
            <Reveal className="about-highlights glass-card" delay={0.08}>
              {profile.focusAreas.map((item, i) => {
                const Icon = iconMap[item.icon] || Sparkles;
                return (
                  <div className="focus-item" key={item.title}>
                    <div className="focus-icon"><Icon size={18} /></div>
                    <div><strong>{item.title}</strong><span>{item.description}</span></div>
                    <span className="focus-index">0{i + 1}</span>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section className="section container" id="experience">
          <SectionHeading
            eyebrow="02 / EXPERIENCE"
            title="Building practical AI and data systems."
            description="Selected experience translated into outcomes, systems and technologies."
          />
          <div className="timeline">
            {profile.experience.map((job, i) => (
              <Reveal className="timeline-item" key={`${job.company}-${job.start}`} delay={i * 0.06}>
                <div className="timeline-marker"><span /></div>
                <div className="timeline-content glass-card">
                  <div className="experience-header">
                    <div>
                      <span className="role-kicker">{job.type}</span>
                      <h3>{job.role}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                    <span className="date-pill">{job.start} — {job.end}</span>
                  </div>
                  <p className="company-description">{job.description}</p>
                  <ul className="bullet-list">
                    {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <div className="tag-list">
                    {job.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <SectionHeading
              eyebrow="03 / PROJECTS"
              title="Projects that show the range."
              description="Applied machine learning, deep learning, agentic AI and intelligent application development."
            />
            <div className="project-grid">
              {profile.projects.map((project, i) => <ProjectCard project={project} index={i} key={project.name} />)}
            </div>
          </div>
        </section>

        <section className="section container" id="skills">
          <SectionHeading
            eyebrow="04 / TOOLKIT"
            title="The stack behind the work."
            description="A focused technical toolkit spanning analytics, ML, AI applications and data workflows."
          />
          <div className="skills-grid">
            {profile.skills.map((group, i) => <SkillGroup key={group.title} {...group} delay={i * 0.04} />)}
          </div>
        </section>

        <section className="section container" id="education">
          <SectionHeading
            eyebrow="05 / EDUCATION"
            title="Academic foundation."
            description="Information systems, data management and engineering foundations supporting applied data science."
          />
          <div className="education-grid">
            <div className="education-column">
              {profile.education.map((item, i) => (
                <Reveal className="education-card glass-card" key={item.school} delay={i * 0.08}>
                  <div className="edu-icon"><GraduationCap size={21} /></div>
                  <div className="edu-main">
                    <div className="edu-top"><span>{item.period}</span><strong>GPA {item.gpa}</strong></div>
                    <h3>{item.degree}</h3>
                    <p>{item.school}</p>
                    <span className="edu-location">{item.location}</span>
                    {item.coursework?.length > 0 && (
                      <div className="coursework">
                        <small>Relevant coursework</small>
                        <div className="tag-list">{item.coursework.map((c) => <span key={c}>{c}</span>)}</div>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="credentials-panel glass-card" delay={0.1}>
              <div className="panel-heading"><Award size={18} /><span>CERTIFICATIONS</span></div>
              <div className="credential-list">
                {profile.certifications.map((cert) => <div key={cert}><ChevronRight size={14} />{cert}</div>)}
              </div>
              <div className="panel-heading awards-heading"><Trophy size={18} /><span>HONORS & AWARDS</span></div>
              <div className="credential-list">
                {profile.awards.map((award) => <div key={award}><ChevronRight size={14} />{award}</div>)}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container">
            <ContactForm email={profile.email} />
          </div>
        </section>
      </main>

      <footer className="footer container">
        <div>
          <a href="#top" className="brand"><span className="brand-mark">A</span><span>AMITH<span className="brand-dot">.</span></span></a>
          <p>Data Science • AI • Analytics</p>
        </div>
        <div className="footer-right">
          <span>Hyderabad, Telangana, India</span>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          <a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a>
        </div>
        <span className="copyright">© {new Date().getFullYear()} {profile.name}</span>
      </footer>
    </div>
  );
}

export default App;
