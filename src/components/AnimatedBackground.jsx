import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Cloud, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export function AnimatedBackground() {
    const starsRef = useRef()
    const cloudRef = useRef()

    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.y -= delta * 0.05
            starsRef.current.rotation.x += delta * 0.02
        }
        if (cloudRef.current) {
            cloudRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 2
        }
    })

    return (
        <group>
            {/* Deep Space Background Color */}
            <color attach="background" args={['#050510']} />

            {/* Distant Stars */}
            <Stars
                ref={starsRef}
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />

            {/* Floating Sparkles (Neon Dust) */}
            <Sparkles
                count={500}
                scale={20}
                size={4}
                speed={0.4}
                opacity={0.5}
                color="#bc13fe" // Neon Purple
            />
            <Sparkles
                count={300}
                scale={15}
                size={6}
                speed={0.3}
                opacity={0.4}
                color="#00f2ff" // Neon Blue
            />

            {/* Atmospheric Fog */}
            <fog attach="fog" args={['#050510', 5, 30]} />

            {/* Subtle Moving Clouds for Depth */}
            <group ref={cloudRef} position={[0, -10, -20]}>
                <Cloud opacity={0.3} speed={0.4} width={20} depth={5} segments={20} color="#201c40" />
            </group>
        </group>
    )
}
