'use client';

import { useEffect, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

export default function CursorParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const createParticle = () => {
            const newParticle: Particle = {
                x: mousePosition.x,
                y: mousePosition.y,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                opacity: 1,
            };
            setParticles((prev) => [...prev, newParticle]);
        };

        const interval = setInterval(createParticle, 50);

        return () => clearInterval(interval);
    }, [mousePosition]);

    useEffect(() => {
        const updateParticles = () => {
            setParticles((prev) =>
                prev
                    .map((particle) => ({
                        ...particle,
                        x: particle.x + particle.speedX,
                        y: particle.y + particle.speedY,
                        opacity: particle.opacity - 0.02,
                    }))
                    .filter((particle) => particle.opacity > 0)
            );
        };

        const animationFrame = requestAnimationFrame(updateParticles);
        return () => cancelAnimationFrame(animationFrame);
    }, [particles]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {particles.map((particle, index) => (
                <div
                    key={index}
                    className="absolute rounded-full bg-pink-500/30 dark:bg-pink-400/30"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        opacity: particle.opacity,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}
        </div>
    );
} 