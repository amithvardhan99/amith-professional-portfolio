import { motion } from "framer-motion";

export default function MetricCard({ value, label, icon: Icon }) {
  return (
    <motion.div
      className="metric-card glass-card"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
    >
      <div className="metric-icon"><Icon size={18} /></div>
      <strong>{value}</strong>
      <span>{label}</span>
    </motion.div>
  );
}
