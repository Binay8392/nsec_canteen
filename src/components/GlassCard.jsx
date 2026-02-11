import { motion } from 'framer-motion'

export function GlassCard({ children, className = '', onClick }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 242, 255, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={onClick}
            className={`p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-neon cursor-pointer ${className}`}
        >
            {children}
        </motion.div>
    )
}
