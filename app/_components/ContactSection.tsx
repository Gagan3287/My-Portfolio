'use client';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import {
    Github,
    Linkedin,
    Mail,
    Instagram,
    ArrowUp,
} from 'lucide-react';
import { GENERAL_INFO } from '@/lib/data';
import FooterAvatarWrapper from '@/components/FooterAvatarWrapper';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Ticker ────────────────────────────────────────────────────────────────────

const TICKER_TEXT =
    'FULL STACK DEVELOPER \u00a0|\u00a0 AI/ML ENGINEER \u2022 REACT \u00b7 NEXT.JS \u00b7 PYTHON \u00b7 FASTAPI \u2022 SR UNIVERSITY, WARANGAL \u00b7 OPEN TO INTERNSHIPS \u00a0\u00a0\u00a0';

function Ticker() {
    return (
        <div className="connect-ticker-wrap" aria-hidden="true">
            <div className="connect-ticker-track">
                {/* Duplicate for seamless loop */}
                {[0, 1].map((i) => (
                    <span key={i} className="connect-ticker-segment">
                        {TICKER_TEXT}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ── Contact cards ─────────────────────────────────────────────────────────────

const CONTACT_CARDS = [
    {
        id: 'github',
        label: 'GitHub',
        handle: '@Gagan3287',
        href: 'https://github.com/Gagan3287',
        accent: '#e2e8f0',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width={26} height={26}>
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        handle: 'vengala-gagan',
        href: 'https://www.linkedin.com/in/vengala-gagan-176a9433a',
        accent: '#0a66c2',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width={26} height={26}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        id: 'email',
        label: 'Email',
        handle: 'tejchandra100',
        href: `https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}`,
        accent: '#ea4335',
        icon: <Mail size={26} />,
    },
    {
        id: 'instagram',
        label: 'Instagram',
        handle: '@gagan_vengala',
        href: 'https://www.instagram.com/gagan_vengala/',
        accent: '#e1306c',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width={26} height={26}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
];

// ── Scroll-to-top button ──────────────────────────────────────────────────────

function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Scroll to top"
            id="scroll-to-top-btn"
            className="scroll-top-btn"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.7)',
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            <ArrowUp size={20} />
        </button>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Headline reveal
            gsap.fromTo(
                '.connect-headline',
                { y: 48, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.connect-headline',
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                },
            );

            // Cards stagger
            gsap.fromTo(
                '.connect-card',
                { y: 40, opacity: 0, scale: 0.94 },
                {
                    scrollTrigger: {
                        trigger: '.connect-cards-grid',
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out',
                },
            );

            // Status pill
            gsap.fromTo(
                '.connect-status-row',
                { y: 28, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.connect-status-row',
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    delay: 0.15,
                },
            );
        },
        { scope: sectionRef },
    );

    return (
        <>
            {/* Ticker */}
            <Ticker />

            {/* Main connect section */}
            <section
                ref={sectionRef}
                className="connect-section"
                id="contact"
            >
                {/* Ambient glow blobs */}
                <div className="connect-glow connect-glow--left" aria-hidden="true" />
                <div className="connect-glow connect-glow--right" aria-hidden="true" />

                <div className="container relative z-10">
                    {/* ── Headline ── */}
                    <div className="connect-headline">
                        <h2 className="connect-headline__text">
                            Let&apos;s build something{' '}
                            <span className="connect-headline__highlight">
                                remarkable
                            </span>{' '}
                            together.
                        </h2>
                    </div>

                    {/* ── Contact cards ── */}
                    <div className="connect-cards-grid">
                        {CONTACT_CARDS.map((card) => (
                            <a
                                key={card.id}
                                href={card.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="connect-card"
                                id={`contact-${card.id}`}
                                style={{
                                    '--card-accent': card.accent,
                                } as React.CSSProperties}
                            >
                                <span className="connect-card__icon">{card.icon}</span>
                                <span className="connect-card__label">{card.label}</span>
                                <span className="connect-card__handle">{card.handle}</span>
                                <div className="connect-card__arrow">↗</div>
                            </a>
                        ))}
                    </div>

                    {/* ── Status row ── */}
                    <div className="connect-status-row">
                        <span className="connect-status-pill">
                            <span className="connect-status-dot" />
                            Open to Internships
                        </span>
                    </div>

                    {/* ── Mascot / Companion Avatar ── */}
                    <FooterAvatarWrapper />
                </div>

                {/* ── Footer bar ── */}
                <div className="connect-footer-bar">
                    <span className="connect-footer-bar__left">
                        © 2026 Vengala Gagan Chandra Tej
                    </span>
                    <span className="connect-footer-bar__right">
                        Designed &amp; Engineered with 🤍 by Gagan
                    </span>
                </div>
            </section>

            {/* Scroll-to-top */}
            <ScrollToTop />
        </>
    );
}
