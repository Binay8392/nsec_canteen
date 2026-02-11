import { Environment, Float, OrbitControls, Sparkles, PerspectiveCamera } from '@react-three/drei'
import { FloatingFood } from './FloatingFood'
import { FloatingQR } from './FloatingQR'
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing'

export function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />
            <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />

            {/* Background & Atmosphere - Handled by CSS Overlay now */}
            {/* <AnimatedBackground /> */}

            {/* Environment for reflections */}
            <Environment preset="night" />

            {/* Floating Elements */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <FloatingFood />
            </Float>

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <FloatingQR position={[0, -3.5, 0]} />
            </Float>

            {/* Particles/Atmosphere */}
            <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#00f2ff" />
            <Sparkles count={30} scale={8} size={6} speed={0.3} opacity={0.3} color="#bc13fe" />

            {/* Post Processing */}
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.8} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>

            {/* Controls (Subtle) */}
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </>
    )
}
