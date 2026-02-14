import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from './GlassCard'
import confetti from 'canvas-confetti'
import { Trophy, RefreshCw, X } from 'lucide-react'

export function GameModal({ isOpen, onClose }) {
    const canvasRef = useRef(null)
    const [gameState, setGameState] = useState('START') // START, PLAYING, GAMEOVER
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const [reward, setReward] = useState(0)
    const [couponCode, setCouponCode] = useState('')

    useEffect(() => {
        if (!isOpen || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId

        // Game Variables
        let birdY = canvas.height / 2
        let birdVelocity = 0
        let birdGravity = 0.5
        let jumpStrength = -8
        let pipeGap = 120
        let pipeSpeed = 3
        let pipes = []
        let frameCount = 0
        let currentScore = 0

        // Resize canvas for mobile
        const resizeCanvas = () => {
            const parent = canvas.parentElement
            if (parent) {
                canvas.width = Math.min(parent.clientWidth - 32, 400) // padding
                canvas.height = Math.min(window.innerHeight * 0.6, 500)
            }
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Input handling
        const jump = () => {
            if (gameState !== 'PLAYING') return
            birdVelocity = jumpStrength
        }

        // Attach handler to canvas
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); jump() }, { passive: false })
        canvas.addEventListener('mousedown', jump)

        // Spacebar handler
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault()
                if (gameState === 'START' || gameState === 'GAMEOVER') {
                    startGame()
                } else {
                    jump()
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        const startGame = () => {
            setGameState('PLAYING')
            setScore(0)
            setReward(0)
            setCouponCode('')
            birdY = canvas.height / 2
            birdVelocity = 0
            pipes = []
            frameCount = 0
            currentScore = 0
            loop()
        }

        const loop = () => {
            if (gameState !== 'PLAYING') {
                if (gameState === 'START') drawStartScreen(ctx, canvas)
                return
            }

            // Update physics
            birdVelocity += birdGravity
            birdY += birdVelocity

            // Generate pipes
            if (frameCount % 100 === 0) {
                const minHeight = 50
                const maxHeight = canvas.height - pipeGap - minHeight
                const height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
                pipes.push({ x: canvas.width, height: height, passed: false })
            }

            // Move pipes & collision
            pipes.forEach((pipe, index) => {
                pipe.x -= pipeSpeed

                // Checking collision
                // Bird is a circle radius 15 at (50, birdY)
                const birdX = 50
                const birdRadius = 15

                // Horizontal check
                if (birdX + birdRadius > pipe.x && birdX - birdRadius < pipe.x + 50) {
                    // Vertical check (hit top or bottom pipe)
                    if (birdY - birdRadius < pipe.height || birdY + birdRadius > pipe.height + pipeGap) {
                        endGame()
                    }
                }

                // Score update
                if (pipe.x + 50 < birdX && !pipe.passed) {
                    currentScore++
                    setScore(currentScore)
                    pipe.passed = true
                }

                // Remove offscreen
                if (pipe.x + 50 < 0) {
                    pipes.splice(index, 1)
                }
            })

            // Floor/Ceiling collision
            if (birdY + 15 > canvas.height || birdY - 15 < 0) {
                endGame()
            }

            // Draw
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw Pipes
            ctx.fillStyle = '#bc13fe' // Neon Purple
            ctx.shadowBlur = 10
            ctx.shadowColor = '#bc13fe'
            pipes.forEach(pipe => {
                // Top pipe
                ctx.fillRect(pipe.x, 0, 50, pipe.height)
                // Bottom pipe
                ctx.fillRect(pipe.x, pipe.height + pipeGap, 50, canvas.height - (pipe.height + pipeGap))
            })
            ctx.shadowBlur = 0

            // Draw Bird (Roll)
            ctx.fillStyle = '#ffd700' // Gold
            ctx.beginPath()
            ctx.arc(50, birdY, 15, 0, Math.PI * 2)
            ctx.fill()
            // Bird Glow
            ctx.shadowBlur = 15
            ctx.shadowColor = '#ffd700'
            ctx.stroke()
            ctx.shadowBlur = 0

            frameCount++
            animationFrameId = requestAnimationFrame(loop)
        }

        const endGame = () => {
            setGameState('GAMEOVER')
            if (currentScore > highScore) setHighScore(currentScore)

            // Calculate Cashback
            let earned = 0
            if (currentScore >= 20) earned = 20
            else if (currentScore >= 10) earned = 10
            else if (currentScore >= 5) earned = 5

            setReward(earned)
            if (earned > 0) {
                setCouponCode(`NSEC-${Math.floor(1000 + Math.random() * 9000)}-${earned}`)
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#00E5FF', '#7000FF', '#FFD700']
                })
            }

            cancelAnimationFrame(animationFrameId)
        }

        const drawStartScreen = (ctx, canvas) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = 'white'
            ctx.font = '20px Orbitron'
            ctx.textAlign = 'center'
            ctx.fillText('NEON FLAP', canvas.width / 2, canvas.height / 2 - 20)
            ctx.font = '14px Arial'
            ctx.fillText('Tap or Space to Fly', canvas.width / 2, canvas.height / 2 + 20)
        }

        // Initial render
        if (gameState === 'START') {
            drawStartScreen(ctx, canvas)
            // We need a loop to keep drawing start screen if resizing? No, just once is fine.
        } else if (gameState === 'PLAYING') {
            loop()
        }

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('keydown', handleKeyDown)
            canvas.removeEventListener('mousedown', jump)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [isOpen, gameState]) // Re-run effect when gameState changes to restart loop cleanly

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-full max-w-lg z-10"
                    >
                        <GlassCard className="flex flex-col items-center gap-4 border-neon-blue shadow-[0_0_50px_rgba(0,242,255,0.3)]">
                            <div className="flex justify-between w-full px-4">
                                <span className="text-neon-blue font-bold">Score: {score}</span>
                                <span className="text-neon-purple font-bold">High Score: {highScore}</span>
                            </div>

                            <canvas
                                ref={canvasRef}
                                className="border border-white/20 rounded-lg bg-black/80 w-full touch-none"
                            />

                            {gameState === 'GAMEOVER' && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 rounded-2xl p-6 text-center overflow-hidden">
                                    {/* Gravity Break Shockwave */}
                                    {reward >= 20 && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 1 }}
                                            animate={{ scale: 20, opacity: 0 }}
                                            transition={{ duration: 1 }}
                                            className="absolute bg-yellow-500/20 rounded-full w-20 h-20"
                                        />
                                    )}

                                    <h2 className={`text-4xl font-futuristic mb-2 drop-shadow-lg ${reward >= 20 ? 'text-yellow-400 animate-pulse' : 'text-red-500'}`}>
                                        {reward >= 20 ? 'GRAVITY BREAK! 🌌' : 'GAME OVER'}
                                    </h2>

                                    {reward > 0 ? (
                                        <div className="mb-6 z-10">
                                            <p className="text-white text-lg">YOU WON CASHBACK!</p>
                                            <motion.div
                                                initial={{ scale: 0.5 }}
                                                animate={{ scale: 1 }}
                                                className={`text-5xl font-bold my-2 ${reward >= 20 ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]' : 'text-[#39ff14]'}`}
                                            >
                                                ₹{reward}
                                            </motion.div>
                                            <div className={`px-4 py-2 rounded-lg border border-dashed mt-2 ${reward >= 20 ? 'bg-yellow-900/40 border-yellow-400/50' : 'bg-white/20 border-white/50'}`}>
                                                <p className="text-xs text-gray-300">COUPON CODE</p>
                                                <p className={`text-xl font-mono tracking-widest ${reward >= 20 ? 'text-yellow-300' : 'text-[#00f2ff]'}`}>{couponCode}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 mb-6 z-10">Score 5+ to win cashback!</p>
                                    )}

                                    <button
                                        onClick={() => setGameState('PLAYING')}
                                        className={`px-6 py-3 text-black font-bold rounded-full hover:scale-110 transition-transform mb-4 z-10 ${reward >= 20 ? 'bg-yellow-400' : 'bg-neon-blue'}`}
                                    >
                                        TRY AGAIN
                                    </button>
                                </div>
                            )}

                            {gameState === 'START' && (
                                <button
                                    onClick={() => setGameState('PLAYING')}
                                    className="px-8 py-3 bg-neon-purple text-white font-bold rounded-full hover:scale-105 transition-transform"
                                >
                                    START GAME
                                </button>
                            )}

                            <p className="text-xs text-center text-gray-400">
                                Use Spacebar or Tap screen to jump.
                            </p>

                            <button
                                onClick={onClose}
                                className="mt-2 text-sm text-gray-400 hover:text-white underline"
                            >
                                Exit Game
                            </button>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
