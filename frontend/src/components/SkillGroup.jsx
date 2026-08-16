import { motion } from "framer-motion";

export default function SkillGroup({ title, items, delay = 0 }) {
  return (
    <motion.div
      className="skill-group glass-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="skill-group-title">{title}</div>
      <div className="skill-cloud">
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </motion.div>
  );
}
