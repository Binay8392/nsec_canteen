import { GlassCard } from './GlassCard'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_OFFERS = [
    { id: 1, title: 'STUDENT COMBO', description: 'Chicken Roll + Cold Coffee', price: 99, originalPrice: 110, color: 'border-neon-blue' },
    { id: 2, title: 'HAPPY HOUR', description: 'Flat 20% off on all heavy meals', price: '20% OFF', originalPrice: null, color: 'border-neon-purple' },
    { id: 3, title: 'EXAM BUSTER', description: 'Double Chocolate Brownie', price: 40, originalPrice: 60, color: 'border-white' },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
}

export function OffersModal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-4xl z-50 overflow-y-auto max-h-[90vh] custom-scrollbar"
                    >
                        <div className="flex justify-between items-center mb-8 sticky top-0 md:static z-10">
                            <h2 className="text-3xl md:text-5xl font-futuristic text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 drop-shadow-[0_0_10px_rgba(188,19,254,0.8)]">
                                EXCLUSIVE DEALS
                            </h2>
                            <button onClick={onClose} className="text-white hover:text-neon-blue text-3xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center">×</button>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8"
                        >
                            {MOCK_OFFERS.map((item) => (
                                <motion.div key={item.id} variants={itemVariants}>
                                    <GlassCard className={`relative h-full flex flex-col justify-between border-2 ${item.color} shadow-[0_0_20px_rgba(0,0,0,0.5)] group hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden`}>
                                        {/* Decorative Background Glow */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-3xl rounded-full group-hover:bg-white/20 transition-colors" />

                                        <div className="mb-4">
                                            <h3 className="font-futuristic text-2xl mb-2 text-white italic">{item.title}</h3>
                                            <div className="h-1 w-12 bg-white/50 mb-3 rounded-full" />
                                            <p className="text-gray-300 font-mono">{item.description}</p>
                                        </div>

                                        <div className="mt-4 flex items-end justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 uppercase tracking-widest">Valid Today</span>
                                                {item.originalPrice && <span className="text-sm text-red-400 line-through">₹{item.originalPrice}</span>}
                                            </div>
                                            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm">
                                                <span className={`text-2xl font-bold ${item.id === 2 ? 'text-neon-purple' : 'text-neon-blue'}`}>
                                                    {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                                                </span>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="mt-2 text-center text-gray-500 text-xs uppercase tracking-widest border-t border-white/10 pt-4">
                            * Terms & Conditions Apply • Show ID at Counter
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
