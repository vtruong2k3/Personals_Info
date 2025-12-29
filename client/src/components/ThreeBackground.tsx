// @ts-nocheck
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sphere, Box, Torus, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Mouse Parallax Camera Controller
const CameraController = () => {
    const { camera } = useThree();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMouse({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        // Smooth camera parallax
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    });

    return null;
};

// Glass Sphere with neon glow
const GlassSphere = ({ position, scale = 1 }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
            <Sphere ref={meshRef} args={[scale, 64, 64]} position={position}>
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={0.95}
                    roughness={0.1}
                    thickness={1.5}
                    ior={1.5}
                    chromaticAberration={0.1}
                    anisotropy={1}
                    distortion={0.2}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    color="#3B82F6"
                />
            </Sphere>
        </Float>
    );
};

// Metallic rotating torus
const MetallicTorus = ({ position }: any) => {
    const torusRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (torusRef.current) {
            torusRef.current.rotation.x += 0.003;
            torusRef.current.rotation.y += 0.002;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            <Torus ref={torusRef} args={[2.5, 0.3, 32, 100]} position={position}>
                <meshStandardMaterial
                    color="#7C3AED"
                    emissive="#7C3AED"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </Torus>
        </Float>
    );
};

// Glass Box with glow
const GlassBox = ({ position }: any) => {
    const boxRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (boxRef.current) {
            boxRef.current.rotation.x += 0.002;
            boxRef.current.rotation.y += 0.003;
            boxRef.current.rotation.z += 0.001;
        }
    });

    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
            <Box ref={boxRef} args={[1.5, 1.5, 1.5]} position={position}>
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={0.9}
                    roughness={0.15}
                    thickness={1}
                    ior={1.5}
                    chromaticAberration={0.15}
                    color="#06B6D4"
                />
            </Box>
        </Float>
    );
};

// Small glowing orbs - increased emissive for glow effect
const GlowingOrbs = () => {
    return (
        <>
            <Float speed={2.5} rotationIntensity={0.2} floatIntensity={2}>
                <Sphere args={[0.4, 32, 32]} position={[5, -2, -4]}>
                    <meshStandardMaterial
                        color="#3B82F6"
                        emissive="#3B82F6"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </Sphere>
            </Float>

            <Float speed={3} rotationIntensity={0.2} floatIntensity={2.5}>
                <Sphere args={[0.3, 32, 32]} position={[-6, 3, -5]}>
                    <meshStandardMaterial
                        color="#7C3AED"
                        emissive="#7C3AED"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </Sphere>
            </Float>

            <Float speed={2.8} rotationIntensity={0.2} floatIntensity={2.2}>
                <Sphere args={[0.35, 32, 32]} position={[7, 2, -6]}>
                    <meshStandardMaterial
                        color="#06B6D4"
                        emissive="#06B6D4"
                        emissiveIntensity={1.8}
                        toneMapped={false}
                    />
                </Sphere>
            </Float>

            <Float speed={3.2} rotationIntensity={0.2} floatIntensity={2.8}>
                <Sphere args={[0.25, 32, 32]} position={[-4, -3, -7]}>
                    <meshStandardMaterial
                        color="#3B82F6"
                        emissive="#3B82F6"
                        emissiveIntensity={2.2}
                        toneMapped={false}
                    />
                </Sphere>
            </Float>
        </>
    );
};

const ThreeBackground = () => {
    return (
        <div className="three-background">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                {/* Camera Controller for Parallax */}
                <CameraController />

                {/* Lighting Setup - increased intensity for glow */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#3B82F6" />
                <pointLight position={[-10, -10, -5]} intensity={1.5} color="#7C3AED" />
                <pointLight position={[0, 5, 5]} intensity={1.2} color="#06B6D4" />
                <directionalLight position={[5, 5, 5]} intensity={0.8} color="#3B82F6" />

                {/* Background */}
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 10, 35]} />

                {/* Environment for reflections */}
                <Environment preset="city" />

                {/* Stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={4000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.3}
                />

                {/* 3D Objects */}
                <GlassSphere position={[-3, 1, -6]} scale={1.5} />
                <GlassSphere position={[4, -1, -8]} scale={1} />
                <MetallicTorus position={[0, 0, -10]} />
                <GlassBox position={[-5, -2, -7]} />
                <GlassBox position={[6, 2, -9]} />
                <GlowingOrbs />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
