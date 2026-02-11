import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function FloatingQR({ position }) {
    const mesh = useRef()
    const canvasRef = useRef(document.createElement('canvas'))

    useEffect(() => {
        // Draw a futuristic QR pattern on the canvas
        const canvas = canvasRef.current
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext('2d')

        // Background
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, 512, 512)

        // Neon Border
        ctx.strokeStyle = '#00f2ff'
        ctx.lineWidth = 10
        ctx.strokeRect(20, 20, 472, 472)

        // Random "Data" blocks
        ctx.fillStyle = '#bc13fe'
        for (let i = 0; i < 50; i++) {
            const x = Math.floor(Math.random() * 10) * 40 + 60
            const y = Math.floor(Math.random() * 10) * 40 + 60
            ctx.fillRect(x, y, 30, 30)
        }
        // Center Text
        ctx.font = 'bold 40px Arial'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.fillText('SCAN ME', 256, 256)

    }, [])

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.material.map.needsUpdate = true
        }
    })

    return (
        <mesh ref={mesh} position={position} rotation={[-Math.PI / 6, 0, 0]}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial>
                <canvasTexture attach="map" args={[canvasRef.current]} />
            </meshBasicMaterial>
        </mesh>
    )
}
