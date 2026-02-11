import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export function CartSheet({ count = 0, total = 0, onClick }) {
    if (count === 0) return null

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full z-50 p-4 pointer-events-auto"
        >
            <div
                onClick={onClick}
                className="w-full max-w-md mx-auto bg-cyber-charcoal/90 backdrop-blur-xl border-t border-x border-white/10 rounded-t-2xl p-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-cyber-charcoal transition-colors group"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-cyber-cyan/10 p-3 rounded-xl text-cyber-cyan group-hover:scale-110 transition-transform">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">{count} items</span>
                        <span className="text-white text-xl font-bold font-futuristic">₹{total}</span>
                    </div>
                </div>

                <button className="flex items-center gap-2 bg-cyber-cyan text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors">
                    <span>CHECKOUT</span>
                    <ArrowRight size={18} />
                </button>
            </div>
        </motion.div>
    )
}
