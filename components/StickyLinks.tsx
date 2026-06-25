'use client';
import React from 'react';
import { SOCIAL_LINKS, GENERAL_INFO } from '@/lib/data';

const socialIcons: Record<string, React.ReactNode> = {
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    ),
    leetcode: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
    ),
    email: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
};

const StickyLinks = () => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 3500);
        return () => clearTimeout(timer);
    }, []);

    const allLinks = [
        ...SOCIAL_LINKS,
        { name: 'Email', url: `https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}` }
    ];

    return (
        <div
            className="max-xl:hidden fixed left-6 bottom-1/2 translate-y-1/2 z-50 flex flex-col items-center transition-all duration-700"
            style={{
                opacity: visible ? 1 : 0,
                transform: `translateY(50%) ${visible ? 'translateX(0)' : 'translateX(-20px)'}`,
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            {/* Glowing pill container */}
            <div
                className="flex flex-col items-center gap-5 px-3 py-5 rounded-full relative"
                style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    boxShadow:
                        '0 0 30px rgba(168, 85, 247, 0.25), 0 0 60px rgba(168, 85, 247, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
            >
                {/* Top glow dot */}
                <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                        background: 'rgba(168, 85, 247, 0.8)',
                        boxShadow: '0 0 8px rgba(168, 85, 247, 1)',
                    }}
                />

                {allLinks.map((link) => {
                    const iconKey = link.name.toLowerCase();
                    const icon = socialIcons[iconKey];
                    if (!icon) return null;
                    return (
                        <a
                            key={link.name}
                            href={link.url}
                            target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            aria-label={link.name}
                            className="group flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
                            style={{
                                color: 'rgba(200, 200, 200, 0.7)',
                            }}
                        >
                            <span
                                className="transition-all duration-300 group-hover:scale-110"
                                style={{
                                    filter: 'drop-shadow(0 0 0px rgba(168,85,247,0))',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLSpanElement).style.filter =
                                        'drop-shadow(0 0 6px rgba(168,85,247,0.9))';
                                    (e.currentTarget as HTMLSpanElement).style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLSpanElement).style.filter =
                                        'drop-shadow(0 0 0px rgba(168,85,247,0))';
                                    (e.currentTarget as HTMLSpanElement).style.color =
                                        'rgba(200,200,200,0.7)';
                                }}
                            >
                                {icon}
                            </span>
                        </a>
                    );
                })}

                {/* Bottom glow dot */}
                <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                        background: 'rgba(168, 85, 247, 0.8)',
                        boxShadow: '0 0 8px rgba(168, 85, 247, 1)',
                    }}
                />
            </div>
        </div>
    );
};

export default StickyLinks;
