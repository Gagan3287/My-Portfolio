'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Download, FileText } from 'lucide-react';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="pb-section" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-4xl md:text-6xl font-thin mb-20 slide-up-and-fade">
                    I believe in building technology that is not only functional
                    but meaningful — crafting solutions that bridge complex
                    ideas and real-world impact.
                </h2>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade">
                    This is me.
                </p>

                <div className="grid md:grid-cols-12 mt-9 gap-8 items-center">
                    <div className="md:col-span-6 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-5xl font-anton uppercase tracking-wide slide-up-and-fade">
                                Hi, I&apos;m Gagan.
                            </p>
                            <div className="text-lg text-muted-foreground mt-6 space-y-4">
                                <p className="slide-up-and-fade">
                                    I&apos;m Vengala Gagan Chandra Tej, a Computer
                                    Science student and AI / Software Engineer passionate about full-stack
                                    development, cloud computing, and building
                                    intelligent digital experiences.
                                </p>
                                <p className="slide-up-and-fade">
                                    With hands-on experience in AWS, Azure, and
                                    modern web technologies, I strive to deliver
                                    solutions that are performant, secure, and
                                    impactful. I love learning, building, and
                                    sharing knowledge with the community.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-6 flex justify-center slide-up-and-fade">
                        <div className="relative group w-full max-w-[420px] aspect-[3/4] overflow-hidden">
                            {/* Image Container */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src="/avatar-45deg.png"
                                    alt="Gagan 3D Avatar - 45-Degree View"
                                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Resume Section ──────────────────────────────────────────── */}
                <div className="mt-20 slide-up-and-fade">
                    {/* Section label */}
                    <p className="pb-3 border-b text-muted-foreground mb-8">
                        My Resume.
                    </p>

                    {/* Resume card */}
                    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-md overflow-hidden shadow-2xl">
                        {/* Top accent bar */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

                        {/* Header bar */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 border border-primary/25">
                                    <FileText size={16} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Gagan_Final_Resume.pdf</p>
                                    <p className="text-xs text-muted-foreground">Vengala Gagan Chandra Tej · Full Stack Developer & AI Engineer</p>
                                </div>
                            </div>
                            <a
                                href="/Gagan_Final_Resume.pdf"
                                download="Gagan_Final_Resume.pdf"
                                className="resume-download-btn"
                                aria-label="Download Resume"
                            >
                                <Download size={15} />
                                <span>Download</span>
                            </a>
                        </div>

                        {/* PDF Embed */}
                        <div className="resume-embed-wrapper">
                            <iframe
                                src="/Gagan_Final_Resume.pdf"
                                title="Gagan Final Resume"
                                className="resume-iframe"
                                data-lenis-prevent
                            />
                            {/* Subtle corner glow */}
                            <div className="absolute inset-0 pointer-events-none rounded-b-2xl bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;
