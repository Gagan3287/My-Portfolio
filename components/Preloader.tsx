'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.inOut' },
            });

            // 1. Letters pop up from below
            tl.to('.preloader-letter', {
                y: 0,
                stagger: 0.07,
                duration: 0.55,
                ease: 'power2.out',
            });

            // 2. Hold for a moment so the name is fully readable
            tl.to('.preloader-letter', {
                delay: 0.55,
                y: '-105%',
                stagger: 0.06,
                duration: 0.45,
                ease: 'power2.in',
            });

            // 3. Wipe the entire overlay upward — page revealed cleanly
            tl.to(
                preloaderRef.current,
                {
                    yPercent: -100,
                    duration: 0.7,
                    ease: 'power3.inOut',
                },
                '-=0.15', // slight overlap with letter exit for continuity
            );
        },
        { scope: preloaderRef },
    );

    return (
        <div
            ref={preloaderRef}
            className="preloader-overlay"
            aria-hidden="true"
        >
            {/* Solid background — always covers the page */}
            <div className="preloader-bg" />

            {/* Subtle neon accent line */}
            <div className="preloader-accent-line" />

            {/* Name display */}
            <p className="preloader-name-wrap">
                {'GAGAN'.split('').map((char, i) => (
                    <span key={i} className="preloader-letter-clip">
                        <span className="preloader-letter">{char}</span>
                    </span>
                ))}
            </p>

            {/* Subtle tagline under name */}
            <span className="preloader-tagline">Portfolio</span>
        </div>
    );
};

export default Preloader;
