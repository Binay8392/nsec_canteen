import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'

export function LiveStatus() {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        >
            <GlassCard className="!rounded-full px-4 py-2 flex items-center gap-3 border-white/20 bg-black/50 backdrop-blur-md">
                <div className="relative">
                    <div className="w-3 h-3 bg-neon-green rounded-full shadow-[0_0_10px_#39ff14] animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-75" />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Kitchen Status</span>
                    <span className="text-sm font-bold text-white">Moderate Heat • 12m Wait</span>
                </div>
            </GlassCard>
        </motion.div>
    )
}
