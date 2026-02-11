import { useState } from 'react'
import { GlassCard } from './GlassCard'
import { motion } from 'framer-motion'
import { GameModal } from './GameModal'
import { MenuGrid } from './MenuGrid'
import { OffersModal } from './OffersModal'
import { CartBubble } from './CartBubble'
import { LiveStatus } from './LiveStatus'

export function Overlay() {
    const [isGameOpen, setIsGameOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isOffersOpen, setIsOffersOpen] = useState(false)

    // Mock Cart State (Will be connected to global store later)
    const [cartCount, setCartCount] = useState(2)
    const [cartTotal, setCartTotal] = useState(150)

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-8 z-10">
            <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
            <MenuGrid isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <OffersModal isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} />

            {/* Commercial Widgets */}
            <CartBubble count={cartCount} total={cartTotal} onClick={() => console.log('Open Cart')} />
            <LiveStatus />

            {/* Header */}
            <header className="flex justify-between items-center pointer-events-auto">
                <h1 className="text-4xl font-futuristic text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-lg">
                    NSEC CANTEEN
                </h1>
                <nav className="flex gap-6">
                    <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-neon-blue transition-colors font-bold cursor-pointer">MENU</button>
                    <button onClick={() => setIsOffersOpen(true)} className="text-white hover:text-neon-purple transition-colors font-bold cursor-pointer">OFFERS</button>
                </nav>
            </header>

            {/* Floating Prices */}
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <GlassCard className="flex flex-col items-center">
                        <h3 className="text-xl font-bold font-futuristic text-neon-blue">Mega Roll</h3>
                        <span className="text-3xl font-bold">₹70/-</span>
                    </GlassCard>
                </motion.div>
            </div>

            <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <GlassCard className="flex flex-col items-center">
                        <h3 className="text-xl font-bold font-futuristic text-neon-purple">Cold Coffee</h3>
                        <span className="text-3xl font-bold">₹15/-</span>
                    </GlassCard>
                </motion.div>
            </div>

            {/* Footer / Call to Action */}
            <div className="w-full flex justify-center pb-10 pointer-events-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2, type: 'spring' }}
                    className="text-center"
                >
                    <GlassCard
                        onClick={() => setIsGameOpen(true)}
                        className="border-neon-blue shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:shadow-[0_0_50px_rgba(0,242,255,0.6)] transition-shadow"
                    >
                        <h2 className="text-2xl font-bold mb-2">SCAN TO PLAY & WIN</h2>
                        <p className="text-sm text-gray-300">Unlock daily discounts and secret menu items</p>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    )
}
