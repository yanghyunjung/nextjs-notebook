'use client';

import { useEffect, useState } from 'react';

export default function BackgroundParticles() {
    const [particles, setParticles] = useState<Array<{
        left: string;
        top: string;
        delay: string;
        duration: string;
    }>>([]);

    // useEffect 내부에 넣어서 컴포넌트가 렌더링될 때마다 새로운 값을 생성하도록 함. 클라이언트 사이드에서만 실행
    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${3 + Math.random() * 2}s`
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0">
            {particles.map((particle, index) => (
                <div
                    key={index}
                    className="absolute w-2 h-2 rounded-full bg-pink-500/30 dark:bg-pink-400/30 animate-float"
                    style={{
                        left: particle.left,
                        top: particle.top,
                        animationDelay: particle.delay,
                        animationDuration: particle.duration
                    }}
                />
            ))}
        </div>
    );
} 