import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { Overlay } from './components/Overlay'
import { Suspense } from 'react'

function App() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Responsiveness
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Overlay />
    </div>
  )
}

export default App
