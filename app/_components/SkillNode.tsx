'use client';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import * as THREE from 'three';

interface SkillNodeProps {
    name: string;
    icon: React.ReactNode;
    radius: number;
    angle: number;
    speed: number;
    color: string;
    yOffset: number;
}

export const SkillNode = ({ name, icon, radius, angle, speed, color, yOffset }: SkillNodeProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    
    // Store current angle to animate it
    const angleRef = useRef(angle);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        // Slow down if hovered
        const currentSpeed = hovered ? speed * 0.1 : speed;
        angleRef.current += currentSpeed * delta;
        
        // Calculate orbital position
        const x = Math.cos(angleRef.current) * radius;
        const z = Math.sin(angleRef.current) * radius;
        
        groupRef.current.position.set(x, yOffset, z);
        
        // Make the node always face the camera
        groupRef.current.lookAt(state.camera.position);
    });

    return (
        <group ref={groupRef}>
            <Html center zIndexRange={[100, 0]}>
                <div 
                    className="relative cursor-pointer group"
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    {/* Icon container */}
                    <motion.div 
                        animate={{ 
                            scale: hovered ? 1.3 : 1,
                            boxShadow: hovered ? `0 0 25px ${color}99, inset 0 0 10px ${color}66` : '0 0 0px transparent'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-[#050a1f]/80 backdrop-blur-md border border-cyan-500/20"
                        style={{ color: hovered ? '#ffffff' : color }}
                    >
                        {icon}
                    </motion.div>

                    {/* Tooltip */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ 
                            opacity: hovered ? 1 : 0, 
                            y: hovered ? -60 : -40,
                            scale: hovered ? 1 : 0.9,
                            pointerEvents: hovered ? 'auto' : 'none'
                        }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl text-white text-sm font-medium tracking-wide shadow-2xl"
                    >
                        {name}
                        {/* Glow effect on tooltip */}
                        <div 
                            className="absolute inset-0 rounded-xl blur-md -z-10 opacity-30" 
                            style={{ background: color }}
                        />
                    </motion.div>
                </div>
            </Html>
        </group>
    );
};
