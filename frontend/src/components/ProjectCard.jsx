import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card glass-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -7 }}
    >
      <div className="project-topline">
        <span className="project-number">0{index + 1}</span>
        <Sparkles size={17} />
      </div>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      <div className="tag-list">
        {project.stack.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="project-links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
