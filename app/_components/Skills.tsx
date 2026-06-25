'use client';
import { useRef } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { SkillsGrid } from './SkillsGrid';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Fade and scale in the whole section
            gsap.from(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                opacity: 0,
                scale: 0.98,
                y: 40,
                duration: 1,
                ease: 'power3.out',
            });
            
            // Text stagger animation
            gsap.from('.skills-header-text', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
            });
        },
        { scope: containerRef },
    );

    return (
        <section id="my-stack" ref={containerRef} className="py-24 relative overflow-hidden">
            {/* Background "TECH STACK" Watermark */}
            <div 
                className="absolute top-10 left-1/2 -translate-x-1/2 text-[14vw] font-anton text-transparent tracking-widest select-none pointer-events-none opacity-[0.06] z-0 uppercase whitespace-nowrap font-black"
                style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.4)' }}
            >
                TECH STACK
            </div>

            <div className="container relative z-10">
                <div className="text-center mb-16">
                    <h2 className="skills-header-text text-5xl md:text-7xl font-anton uppercase tracking-wider mb-4">
                        Technical Skills
                    </h2>
                    <p className="skills-header-text text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto tracking-wide">
                        Technologies and tools I use to build AI-powered solutions.
                    </p>
                </div>

                <div className="w-full">
                    <SkillsGrid />
                </div>
            </div>
            
            {/* Ambient background particles/glow for the section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </section>
    );
};

export default Skills;

