import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, MeshWobbleMaterial, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

function ChickenRoll({ position }) {
    const mesh = useRef()
    // Rotate slightly
    useFrame((state, delta) => {
        mesh.current.rotation.y += delta * 0.2
    })

    return (
        <group position={position} dispose={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={mesh} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                    {/* Cylinder for the roll */}
                    <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
                    <meshStandardMaterial color="#d4a056" roughness={0.4} metalness={0.1} />
                </mesh>

                {/* Filling sticking out */}
                <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                    <sphereGeometry args={[0.28, 32, 32]} />
                    <meshStandardMaterial color="#8B4513" roughnes={0.8} />
                </mesh>
                <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                    <sphereGeometry args={[0.28, 32, 32]} />
                    <meshStandardMaterial color="#8B4513" roughnes={0.8} />
                </mesh>

                {/* Wrapper/Paper */}
                <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.31, 0.31, 0.6, 32, 1, true]} />
                    <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.8} />
                </mesh>
            </Float>

            {/* Floating Label */}
            <Text position={[1, 0.5, 0]} fontSize={0.2} color="#00f2ff" font="https://fonts.gstatic.com/s/orbitron/v25/yMJMMIlzdpvBhQQL_SC3X9yhFKS09A.woff">
                Double Egg Chicken Roll
            </Text>
        </group>
    )
}

function Coffee({ position }) {
    return (
        <group position={position} dispose={null}>
            <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
                {/* Cup Glass */}
                <mesh>
                    <cylinderGeometry args={[0.35, 0.25, 1, 32]} />
                    {/* Detailed glass material */}
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={5}
                        thickness={0.5}
                        chromaticAberration={0.1}
                        anisotropy={0.1}
                        color="#ffffff"
                    />
                </mesh>

                {/* Coffee Liquid */}
                <mesh position={[0, -0.1, 0]}>
                    <cylinderGeometry args={[0.33, 0.23, 0.7, 32]} />
                    <MeshWobbleMaterial factor={0.1} speed={2} color="#3d2314" />
                </mesh>

                {/* Ice Cubes */}
                <mesh position={[0, 0.2, 0]} rotation={[Math.random(), Math.random(), Math.random()]}>
                    <boxGeometry args={[0.15, 0.15, 0.15]} />
                    <MeshTransmissionMaterial thickness={0.2} roughness={0.1} color="#ffffff" />
                </mesh>
                <mesh position={[0.1, 0.1, 0.1]} rotation={[Math.random(), Math.random(), Math.random()]}>
                    <boxGeometry args={[0.12, 0.12, 0.12]} />
                    <MeshTransmissionMaterial thickness={0.2} roughness={0.1} color="#ffffff" />
                </mesh>
            </Float>

            <Text position={[-0.8, -0.5, 0]} fontSize={0.2} color="#bc13fe" font="https://fonts.gstatic.com/s/orbitron/v25/yMJMMIlzdpvBhQQL_SC3X9yhFKS09A.woff">
                Cold Coffee
            </Text>
        </group>
    )
}

export function FloatingFood() {
    return (
        <group>
            <ChickenRoll position={[-1.2, 0.5, 0]} />
            <Coffee position={[1.2, -0.5, 0]} />
        </group>
    )
}
