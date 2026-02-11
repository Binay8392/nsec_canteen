import { GlassCard } from './GlassCard'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_MENU = [
    { id: 1, name: 'Chicken Roll', price: 60, category: 'Snacks' },
    { id: 2, name: 'Double Egg Roll', price: 50, category: 'Snacks' },
    { id: 3, name: 'Veg Chop', price: 10, category: 'Snacks' },
    { id: 4, name: 'Cold Coffee', price: 40, category: 'Beverages' },
    { id: 5, name: 'Fried Rice', price: 80, category: 'Meals' },
    { id: 6, name: 'Chilli Chicken', price: 120, category: 'Meals' },
]

export function MenuGrid({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center p-8 pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="w-full max-w-4xl z-50 h-[80vh] overflow-y-auto pr-2 custom-scrollbar"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-futuristic text-neon-blue">DIGITAL MENU</h2>
                            <button onClick={onClose} className="text-white hover:text-neon-purple text-xl">✕</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                            {MOCK_MENU.map((item) => (
                                <GlassCard key={item.id} className="relative flex flex-col group hover:border-neon-blue/50 !overflow-visible mt-8 border-white/10 bg-white/5">
                                    {/* Pop-out Image Placeholder */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center z-10">
                                        <span className="text-2xl">🍔</span>
                                    </div>

                                    <div className="mt-12 text-center">
                                        <h3 className="font-bold text-xl group-hover:text-neon-blue transition-colors font-futuristic">{item.name}</h3>
                                        <span className="text-xs text-gray-400 block mb-2">{item.category}</span>
                                        <span className="text-2xl font-bold text-neon-purple block mb-4">₹{item.price}</span>

                                        <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-neon-blue hover:text-black transition-all font-bold border border-white/20">
                                            ADD TO CART
                                        </button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
