import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from './GlassCard'

export function CartBubble({ count = 0, total = 0, onClick }) {
    return (
        <AnimatePresence>
            {count > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-6 right-6 z-50 pointer-events-auto"
                    onClick={onClick}
                >
                    <GlassCard className="flex items-center gap-4 border-neon-blue shadow-[0_0_20px_rgba(0,242,255,0.4)] !rounded-full px-6 py-3 cursor-pointer bg-black/60">
                        <div className="relative">
                            <span className="text-2xl">🛒</span>
                            <span className="absolute -top-2 -right-2 bg-neon-purple text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                                {count}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-300 uppercase tracking-wider">Total</span>
                            <span className="text-lg font-bold text-neon-blue">₹{total}</span>
                        </div>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
