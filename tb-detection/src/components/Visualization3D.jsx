import React, { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, PerspectiveCamera } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

const LungShape = ({ position, scale, rotation }) => {
  const { scene } = useThree()

  const shape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.quadraticCurveTo(1, 0.5, 1, 1.5)
    shape.quadraticCurveTo(1, 3, 0, 3.5)
    shape.quadraticCurveTo(-1, 3, -1, 1.5)
    shape.quadraticCurveTo(-1, 0.5, 0, 0)
    return shape
  }, [])

  const geometry = useMemo(() => {
    const extrudeSettings = {
      steps: 1,
      depth: 0.5,
      bevelEnabled: false,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [shape])

  return (
    <mesh position={position} scale={scale} rotation={rotation} geometry={geometry}>
      <meshPhysicalMaterial color="#e57373" clearcoat={0.5} clearcoatRoughness={0.3} metalness={0.1} />
    </mesh>
  )
}

const InfectionSpot = ({ position }) => {
  const spotRef = useRef()

  useFrame((state) => {
    if (spotRef.current) {
      spotRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <mesh ref={spotRef} position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshPhysicalMaterial
        color="#ff4136"
        emissive="#ff4136"
        emissiveIntensity={0.5}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.2}
      />
    </mesh>
  )
}

const LungModel = ({ showInfection, rotationSpeed }) => {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group ref={groupRef}>
      <LungShape position={[-0.6, 0, 0]} scale={[0.5, 0.5, 0.5]} rotation={[0, 0, Math.PI / 12]} />
      <LungShape position={[0.6, 0, 0]} scale={[-0.5, 0.5, 0.5]} rotation={[0, 0, -Math.PI / 12]} />
      {showInfection && (
        <>
          <InfectionSpot position={[-0.3, 0.4, 0.3]} />
          <InfectionSpot position={[0.4, -0.3, 0.3]} />
        </>
      )}
    </group>
  )
}

const Visualization3D = () => {
  const [showInfection, setShowInfection] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)
  const [zoom, setZoom] = useState(1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-800">3D Lung Visualization</h2>
      <div className="h-[400px] mb-4 relative bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} zoom={zoom} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />
          <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
          <LungModel showInfection={showInfection} rotationSpeed={autoRotate ? rotationSpeed : 0} />
          <OrbitControls enableZoom={true} enableRotate={!autoRotate} />
         
        </Canvas>

         {/* <Html position={[0, 2, 0]}> */}
            <div className="bg-white bg-opacity-75 p-2 rounded text-sm">
              <p>Use mouse to interact:</p>
              <ul className="list-disc list-inside">
                <li>Left click + drag to rotate</li>
                <li>Right click + drag to pan</li>
                <li>Scroll to zoom</li>
              </ul>
            </div>
          {/* </Html> */}
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="infection-toggle"
              checked={showInfection}
              onChange={(e) => setShowInfection(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="infection-toggle">Show Infection</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rotation-toggle"
              checked={autoRotate}
              onChange={(e) => setAutoRotate(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="rotation-toggle">Auto Rotate</label>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="rotation-speed">Rotation Speed</label>
          <input
            type="range"
            id="rotation-speed"
            min="0"
            max="2"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(Number.parseFloat(e.target.value))}
            disabled={!autoRotate}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="zoom">Zoom</label>
          <input
            type="range"
            id="zoom"
            min="0.5"
            max="2"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number.parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Visualization3D
