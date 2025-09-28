import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

function AvatarModel(props) {
  const group = useRef()
  const mixerRef = useRef()
  // Resolve bundled model URLs so they work after build and on refresh
  const webModelUrl = new URL('../../Web_model.glb', import.meta.url).href
  const roboModelUrl = new URL('../../robo.glb', import.meta.url).href
  const { scene: webScene, animations: webAnimations } = useGLTF(webModelUrl)
  const { scene: roboScene, animations: roboAnimations } = useGLTF(roboModelUrl)

  const [hovered, setHovered] = useState(false)

  // Set up animation mixer for robo animations
  useEffect(() => {
    if (roboScene && roboAnimations && roboAnimations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(roboScene)
      
      // Play all animations from robo.glb
      roboAnimations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip)
        action.setLoop(THREE.LoopRepeat, Infinity)
        action.play()
      })
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
      }
    }
  }, [roboScene, roboAnimations])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y += 0.005
      group.current.position.y = Math.sin(t * 0.8) * 0.02
      const targetScale = hovered ? 1.05 : 1.0
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)
    }
    
    // Update animation mixer
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
  })

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
      dispose={null}
    >
      <primitive object={webScene} />
      <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <primitive object={roboScene} />
      </group>
    </group>
  )
}

const AvatarCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 40 }} shadows gl={{ alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#3B82F6" />
      <pointLight position={[3, 2, 3]} intensity={0.6} color="#8B5CF6" />
      <Suspense fallback={
        <Html center>
          <div style={{
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 12,
            color: '#e5e7eb',
            fontSize: 14
          }}>Loading interview scene…</div>
        </Html>
      }>
        <AvatarModel position={[0, -1, 0]} scale={[6, 6, 6]} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={1.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  )
}

export default AvatarCanvas

