'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useState, useCallback } from 'react';
import AvatarCanvas from './AvatarCanvas';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const sectionRef = React.useRef<HTMLElement>(null);
    const avatarWrapRef = React.useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

    // Track mouse position globally relative to page
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    }, []);

    // Update container rect on mount
    React.useEffect(() => {
        const updateRect = () => {
            if (sectionRef.current) {
                setContainerRect(sectionRef.current.getBoundingClientRect());
            }
        };
        updateRect();
        window.addEventListener('resize', updateRect);
        return () => window.removeEventListener('resize', updateRect);
    }, []);

    // Slide-up-fade scroll animation (existing)
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });
            tl.fromTo(
                '.banner-slide',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    // Entrance animation for avatar
    useGSAP(() => {
        if (!avatarWrapRef.current) return;
        gsap.fromTo(
            avatarWrapRef.current,
            { opacity: 0, scale: 0.85, x: 60 },
            {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.4,
            },
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            id="banner"
            onMouseMove={handleMouseMove}
        >
            <ArrowAnimation />

            {/* Full-width hero container */}
            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex items-center justify-between gap-6"
                ref={containerRef}
            >
                {/* ── Left: Text content ─────────────────────────────────────── */}
                <div className="flex flex-col justify-center items-start max-w-[520px] z-10 flex-shrink-0">
                    <h1 className="banner-title banner-slide leading-[.95] text-6xl sm:text-[80px] font-anton">
                        <span className="text-primary">FULL STACK</span>
                        <br />
                        <span className="ml-4">DEVELOPER</span>
                    </h1>

                    <p className="banner-description banner-slide mt-6 text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Gagan Chandra Tej
                        </span>
                        . A passionate Computer Science student and developer
                        building innovative, scalable web &amp; cloud solutions.
                    </p>

                    <Button
                        as="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={GENERAL_INFO.upworkProfile}
                        variant="primary"
                        className="mt-9 banner-button banner-slide"
                    >
                        Let&apos;s Talk
                    </Button>

                    <div className="flex items-center gap-2 mt-3 banner-slide">
                        <span className="size-3 rounded-full bg-white" />
                        <span className="text-sm text-muted-foreground">
                            Available for full-time opportunities
                        </span>
                    </div>

                    {/* Stats — visible below avatar on mobile, inline on desktop */}
                    <div className="flex items-center gap-8 mt-10 banner-slide md:hidden">
                        <div className="text-center">
                            <h5 className="text-3xl font-anton text-primary mb-1">13+</h5>
                            <p className="text-muted-foreground text-sm">Certifications</p>
                        </div>
                        <div className="text-center">
                            <h5 className="text-3xl font-anton text-primary mb-1">1</h5>
                            <p className="text-muted-foreground text-sm">Projects Built</p>
                        </div>
                        <div className="text-center">
                            <h5 className="text-3xl font-anton text-primary mb-1">AWS</h5>
                            <p className="text-muted-foreground text-sm">Certified</p>
                        </div>
                    </div>
                </div>

                {/* ── Right: 3D Avatar + glassmorphism backdrop ──────────────── */}
                <div
                    ref={avatarWrapRef}
                    className="avatar-hero-wrap"
                    style={{ opacity: 0 }} // GSAP will animate this in
                >
                    {/* Glassmorphism glow ring */}
                    <div className="avatar-glass-ring" aria-hidden="true" />

                    {/* Neon ambient light streaks */}
                    <div className="avatar-light-streak avatar-light-streak--1" aria-hidden="true" />
                    <div className="avatar-light-streak avatar-light-streak--2" aria-hidden="true" />

                    {/* Canvas */}
                    <AvatarCanvas mousePos={mousePos} containerRect={containerRect} />

                    {/* Stats overlay — desktop only */}
                    <div className="avatar-stats-overlay banner-slide hidden md:flex">
                        <div className="avatar-stat-chip">
                            <span className="stat-num">13+</span>
                            <span className="stat-label">Certifications</span>
                        </div>
                        <div className="avatar-stat-chip">
                            <span className="stat-num">1</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="avatar-stat-chip">
                            <span className="stat-num">AWS</span>
                            <span className="stat-label">Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
