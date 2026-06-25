'use client';
import SectionTitle from '@/components/SectionTitle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ExternalLink, X, ShieldCheck, Award, Cloud, Settings, Shield, Globe, Bot, Lightbulb, Network, Radio, Trophy, ShieldAlert, Code, Cpu, FileBadge } from 'lucide-react';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Certification data ────────────────────────────────────────────────────────

const CERTIFICATIONS = [
    {
        name: 'AWS Cloud Foundations',
        issuer: 'Amazon Web Services',
        file: '/CERTIFICATIONS/AWS_Academy_Graduate___Cloud_Foundations.pdf',
        accent: '#FF9900',
        glow: 'rgba(255,153,0,0.25)',
        logo: <Cloud size={24} />,
        category: 'Cloud',
        year: '2025',
    },
    {
        name: 'AWS Cloud Developing',
        issuer: 'Amazon Web Services',
        file: '/CERTIFICATIONS/AWS_Academy_Graduate___Cloud_Developing___Training_Badge_Badge20251109-31-5056z1.pdf',
        accent: '#FF9900',
        glow: 'rgba(255,153,0,0.25)',
        logo: <Settings size={24} />,
        category: 'Cloud',
        year: '2025',
    },
    {
        name: 'AWS Cloud Security Builder',
        issuer: 'Amazon Web Services',
        file: '/CERTIFICATIONS/AWS_Academy_Graduate___Cloud_Security_Builder___Training_Badge_Badge20251113-31-6jkyzb.pdf',
        accent: '#FF9900',
        glow: 'rgba(255,153,0,0.25)',
        logo: <Shield size={24} />,
        category: 'Security',
        year: '2025',
    },
    {
        name: 'AWS Cloud Web App Builder',
        issuer: 'Amazon Web Services',
        file: '/CERTIFICATIONS/AWS_Academy_Graduate___Cloud_Web_Application_Builder___Training_Badge_Badge20251113-33-hixyxf.pdf',
        accent: '#FF9900',
        glow: 'rgba(255,153,0,0.25)',
        logo: <Globe size={24} />,
        category: 'Cloud',
        year: '2025',
    },
    {
        name: 'Azure AI Fundamentals',
        issuer: 'Microsoft Azure',
        file: '/CERTIFICATIONS/Azure AI Fundamentals.pdf',
        accent: '#0078D4',
        glow: 'rgba(0,120,212,0.25)',
        logo: <Bot size={24} />,
        category: 'AI',
        year: '2024',
    },
    {
        name: 'IBM Certification',
        issuer: 'IBM',
        file: '/CERTIFICATIONS/ibm certification.pdf',
        accent: '#1F70C1',
        glow: 'rgba(31,112,193,0.25)',
        logo: <Lightbulb size={24} />,
        category: 'Technology',
        year: '2024',
    },
    {
        name: 'CCNA: Intro to Networks',
        issuer: 'Cisco',
        file: '/CERTIFICATIONS/CCNA Introduction to Networks (COURSE COMPLETION).pdf',
        accent: '#1BA0D7',
        glow: 'rgba(27,160,215,0.25)',
        logo: <Network size={24} />,
        category: 'Networking',
        year: '2024',
    },
    {
        name: 'CCNA Certificate',
        issuer: 'Cisco',
        file: '/CERTIFICATIONS/CCNA-_Introduction_to_Networks_certificate_2403a52222-sru-edu-in_2c11c8f1-879d-4b36-8e74-b66784cff6b7.pdf',
        accent: '#1BA0D7',
        glow: 'rgba(27,160,215,0.25)',
        logo: <Radio size={24} />,
        category: 'Networking',
        year: '2024',
    },
    {
        name: 'AIAC Certification',
        issuer: 'AIAC',
        file: '/CERTIFICATIONS/AIAC Certifications.pdf',
        accent: '#a855f7',
        glow: 'rgba(168,85,247,0.25)',
        logo: <Trophy size={24} />,
        category: 'AI',
        year: '2024',
    },
    {
        name: 'Basic Cybersecurity',
        issuer: 'NCC',
        file: '/CERTIFICATIONS/V.Gagan-Basic Cybersecurity Course (NCC) Certificate.pdf',
        accent: '#ef4444',
        glow: 'rgba(239,68,68,0.25)',
        logo: <ShieldAlert size={24} />,
        category: 'Security',
        year: '2024',
    },
    {
        name: 'Python Basic Certificate',
        issuer: 'HackerRank',
        file: '/CERTIFICATIONS/python_basic certificate.pdf',
        accent: '#22c55e',
        glow: 'rgba(34,197,94,0.25)',
        logo: <Code size={24} />,
        category: 'Programming',
        year: '2024',
    },
    {
        name: 'Jetson Nano',
        issuer: 'NVIDIA',
        file: '/CERTIFICATIONS/jetson Nano nvidia.pdf',
        accent: '#76b900',
        glow: 'rgba(118,185,0,0.25)',
        logo: <Cpu size={24} />,
        category: 'AI',
        year: '2024',
    },
    {
        name: 'Additional Certification',
        issuer: 'Various',
        file: '/CERTIFICATIONS/cert 2.pdf',
        accent: '#6366f1',
        glow: 'rgba(99,102,241,0.25)',
        logo: <FileBadge size={24} />,
        category: 'General',
        year: '2024',
    },
];

const PREVIEW_COUNT = 6;

// ─── Category badge colors ─────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
    Cloud: '#FF9900',
    Security: '#ef4444',
    AI: '#a855f7',
    Networking: '#1BA0D7',
    Technology: '#1F70C1',
    Programming: '#22c55e',
    General: '#6366f1',
};

// ─── CertCard ─────────────────────────────────────────────────────────────────

const CertCard = ({
    cert,
    index,
}: {
    cert: (typeof CERTIFICATIONS)[0];
    index: number;
}) => (
    <a
        href={cert.file}
        target="_blank"
        rel="noopener noreferrer"
        className="cert-card group"
        style={{ '--accent': cert.accent, '--glow': cert.glow } as React.CSSProperties}
    >
        {/* Top accent line */}
        <div className="cert-card__top-bar" />

        {/* Header row */}
        <div className="cert-card__header">
            <span className="cert-card__logo">{cert.logo}</span>
            <ExternalLink
                size={14}
                className="cert-card__ext-icon"
            />
        </div>

        {/* Content */}
        <div className="cert-card__body">
            <p className="cert-card__name">{cert.name}</p>
            <p className="cert-card__issuer">{cert.issuer}</p>
        </div>

        {/* Footer */}
        <div className="cert-card__footer">
            <span
                className="cert-card__category"
                style={{ color: CATEGORY_COLORS[cert.category] ?? '#a855f7' }}
            >
                {cert.category}
            </span>
            <span className="cert-card__year">{cert.year}</span>
        </div>

        {/* Hover glow overlay */}
        <div className="cert-card__glow-overlay" />
    </a>
);

// ─── Certifications section ───────────────────────────────────────────────────

const Certifications = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showAll, setShowAll] = useState(false);

    useGSAP(
        () => {
            gsap.fromTo(
                '.cert-card',
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.08,
                    duration: 0.55,
                    ease: 'power2.out',
                },
            );

            // Animate stat numbers
            gsap.from('.cert-stat-number', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                textContent: 0,
                duration: 1.5,
                ease: 'power1.out',
                snap: { textContent: 1 },
                stagger: 0.2,
            });
        },
        { scope: containerRef },
    );

    return (
        <>
            <section className="pb-section pt-10" id="certifications">
                <div className="container" ref={containerRef}>

                    {/* ── Section header ─────────────────────────────────────── */}
                    <SectionTitle title="Certifications" />

                    {/* ── Stats bar ──────────────────────────────────────────── */}
                    <div className="cert-stats-row">
                        <div className="cert-stat-chip">
                            <ShieldCheck size={18} className="cert-stat-icon" />
                            <span className="cert-stat-number">13</span>
                            <span className="cert-stat-label">Total Certs</span>
                        </div>
                        <div className="cert-stat-chip">
                            <Award size={18} className="cert-stat-icon cert-stat-icon--aws" />
                            <span className="cert-stat-number">4</span>
                            <span className="cert-stat-label">AWS Badges</span>
                        </div>
                        <div className="cert-stat-chip">
                            <Bot size={18} className="cert-stat-icon" />
                            <span className="cert-stat-number">3</span>
                            <span className="cert-stat-label">AI / ML</span>
                        </div>
                        <div className="cert-stat-chip">
                            <Radio size={18} className="cert-stat-icon" />
                            <span className="cert-stat-number">2</span>
                            <span className="cert-stat-label">Networking</span>
                        </div>
                    </div>

                    {/* ── Cards grid ─────────────────────────────────────────── */}
                    <div className="cert-grid">
                        {CERTIFICATIONS.slice(0, PREVIEW_COUNT).map((cert, i) => (
                            <CertCard key={cert.name} cert={cert} index={i} />
                        ))}
                    </div>

                    {/* ── CTA ────────────────────────────────────────────────── */}
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setShowAll(true)}
                            className="cert-view-all-btn"
                        >
                            <span>View All {CERTIFICATIONS.length} Certifications</span>
                            <span className="cert-view-all-arrow">→</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Full-screen modal ─────────────────────────────────────────── */}
            {showAll && (
                <div className="cert-modal-backdrop" onClick={() => setShowAll(false)}>
                    <div
                        className="cert-modal-panel"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="cert-modal-header">
                            <div>
                                <h2 className="cert-modal-title">All Certifications</h2>
                                <p className="cert-modal-sub">
                                    {CERTIFICATIONS.length} certifications earned across Cloud, AI, Networking &amp; more
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAll(false)}
                                className="cert-modal-close"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal grid */}
                        <div className="cert-modal-grid">
                            {CERTIFICATIONS.map((cert, i) => (
                                <CertCard key={cert.name} cert={cert} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Certifications;
