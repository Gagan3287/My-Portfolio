'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import { MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

const COLORS = [
    'bg-yellow-500 text-black',
    'bg-blue-500 text-white',
    'bg-teal-500 text-black',
    'bg-indigo-500 text-white',
];

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About Me',
        url: '/#about-me',
    },
    {
        name: 'Education',
        url: '/#my-education',
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    // ── Lock / unlock body scroll when menu opens ────────────────────────────
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isMenuOpen]);

    // ── Close menu on Escape key ─────────────────────────────────────────────
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const handleNavClick = useCallback(
        (url: string) => {
            setIsMenuOpen(false);
            // Small delay so menu close animation starts before navigation
            setTimeout(() => router.push(url), 50);
        },
        [router],
    );

    return (
        <>
            {/* ── Hamburger button ─────────────────────────────────────────────
                Fixed so it is always visible and above every other element.
                z-[9999] ensures it sits above FloatingCompanion (z-[9998])
                and Preloader (z-[100]).
            ─────────────────────────────────────────────────────────────────── */}
            <button
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                className={cn(
                    'group size-12 fixed top-5 right-5 md:right-10 z-[9999]',
                )}
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                <span
                    className={cn(
                        'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px]',
                        {
                            'rotate-45 -translate-y-1/2': isMenuOpen,
                            'md:group-hover:rotate-12': !isMenuOpen,
                        },
                    )}
                />
                <span
                    className={cn(
                        'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px]',
                        {
                            '-rotate-45 -translate-y-1/2': isMenuOpen,
                            'md:group-hover:-rotate-12': !isMenuOpen,
                        },
                    )}
                />
            </button>

            {/* ── Backdrop overlay ─────────────────────────────────────────────
                z-[9990]: above page content, below the menu panel and button.
                pointer-events controlled by visibility so it only intercepts
                taps when the menu is actually open.
            ─────────────────────────────────────────────────────────────────── */}
            <div
                aria-hidden="true"
                className={cn(
                    'fixed inset-0 z-[9990] bg-black/70 transition-opacity duration-300',
                    isMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none',
                )}
                onClick={() => setIsMenuOpen(false)}
                // Swallow touch events so the page beneath can't scroll
                onTouchMove={(e) => e.preventDefault()}
            />

            {/* ── Slide-in menu panel ──────────────────────────────────────────
                z-[9995]: above the overlay (9990) and FloatingCompanion (9998
                is on the page itself — once the overlay covers it the companion
                is no longer interactive anyway). The button (9999) is always on top.
                
                REMOVED overflow-hidden so child elements are never clipped and
                pointer events always propagate correctly.
            ─────────────────────────────────────────────────────────────────── */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)]',
                    'transform transition-transform duration-700 z-[9995]',
                    'flex flex-col lg:justify-center py-10',
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                {/* Animated background blob (decorative only) */}
                <div
                    aria-hidden="true"
                    className={cn(
                        'absolute inset-0 scale-150 translate-x-1/2 rounded-[50%]',
                        'bg-background-light duration-700 delay-150 pointer-events-none',
                        { 'translate-x-0': isMenuOpen },
                    )}
                />

                {/* ── Menu content ─────────────────────────────────────────── */}
                <div className="relative z-10 grow flex md:items-center w-full max-w-[300px] mx-8 sm:mx-auto">
                    <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
                        {/* Social links */}
                        <div className="max-lg:order-2">
                            <p className="text-muted-foreground mb-5 md:mb-8">
                                SOCIAL
                            </p>
                            <ul className="space-y-3">
                                {SOCIAL_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-lg capitalize hover:underline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigation links */}
                        <div>
                            <p className="text-muted-foreground mb-5 md:mb-8">
                                MENU
                            </p>
                            <ul className="space-y-3">
                                {MENU_LINKS.map((link, idx) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => handleNavClick(link.url)}
                                            className="group text-xl flex items-center gap-3"
                                            // Explicit touch handler for mobile browsers
                                            onTouchEnd={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link.url);
                                            }}
                                        >
                                            <span
                                                className={cn(
                                                    'size-3.5 bg-white/20 rounded-full flex items-center justify-center',
                                                    'group-hover:scale-[200%] transition-all',
                                                    COLORS[idx],
                                                )}
                                            >
                                                <MoveUpRight
                                                    size={8}
                                                    className="scale-0 group-hover:scale-100 transition-all"
                                                />
                                            </span>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Get in touch */}
                <div className="relative z-10 w-full max-w-[300px] mx-8 sm:mx-auto">
                    <p className="text-muted-foreground mb-4">GET IN TOUCH</p>
                    <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {GENERAL_INFO.email}
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
