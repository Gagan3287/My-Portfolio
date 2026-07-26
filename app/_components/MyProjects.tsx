'use client';
import SectionTitle from '@/components/SectionTitle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ExternalLink, Sparkles, Brain, Zap, Globe, Bot, GraduationCap, Github } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Project data ──────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        id: 'studymate-ai',
        name: 'StudyMate AI',
        tagline: 'AI-Powered Study & Placement Companion for Engineering Students',
        description:
            `StudyMate AI is a full-stack platform that transforms how engineering students study and prepare for placements. Students upload their own class notes and PDFs, and the platform generates instant summaries, flashcards, and quizzes \u2014 while a RAG-grounded chatbot answers questions using only their own uploaded material, with real source citations, so answers stay accurate and grounded in the actual syllabus rather than the open internet. A self-trained machine learning model predicts each flashcard's memory retention probability to drive adaptive spaced-repetition scheduling, going beyond fixed revision intervals. An interactive knowledge graph visualizes how concepts connect across a student's notes, and a resume-vs-job-description skill-gap analyzer helps with placement prep.`,
        features: [
            'AI-generated summaries, flashcards & quizzes from your own notes',
            'RAG-grounded doubt-solving chat with real source page citations',
            'Self-trained ML retention model (Half-Life Regression) for adaptive spaced repetition',
            'Interactive knowledge graph across all uploaded documents',
            'Resume vs job-description skill-gap analyzer for placement prep',
        ],
        tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Gemini', 'Groq', 'Scikit-Learn', 'Tailwind CSS', 'Vercel', 'Render'],
        url: 'https://studymate-aix.vercel.app/',
        github: 'https://github.com/Gagan3287/Student-Ai',
        accent: '#06b6d4',
        accentSecondary: '#3b82f6',
        glow: 'rgba(6,182,212,0.28)',
        status: 'Live',
        year: '2026',
        Icon: GraduationCap,
    },
    {
        id: 'quill-ai',
        name: 'Quill AI',
        tagline: 'Your Intelligent Writing & Research Companion',
        description:
            'Quill AI is a next-generation AI-powered platform designed to supercharge writing, research, and knowledge synthesis. Leveraging advanced large language models, Quill AI helps you brainstorm ideas, draft content, summarize documents, answer complex questions, and refine your prose — all in a seamless, intuitive interface. Whether you are a student, researcher, developer, or creative professional, Quill AI adapts to your workflow and amplifies your productivity.',
        features: [
            'AI-powered writing & content generation',
            'Smart document summarisation',
            'Context-aware Q&A and research assistant',
            'Real-time grammar & style suggestions',
            'Multi-model support for diverse tasks',
        ],
        tech: ['Next.js', 'OpenAI', 'Vercel', 'TypeScript', 'Tailwind CSS'],
        url: 'https://quill-ai-eight.vercel.app/',
        github: 'https://github.com/Gagan3287/Quill-AI',
        accent: '#a855f7',
        accentSecondary: '#6366f1',
        glow: 'rgba(168,85,247,0.28)',
        status: 'Live',
        year: '2026',
        Icon: Brain,
    },
    {
        id: 'rulebot',
        name: 'RuleBot – Intelligent Rule-Based AI Chatbot',
        tagline: 'Smart Conversations Powered by a Rule-Based Engine',
        description:
            'RuleBot is a full-stack AI chatbot that delivers intelligent, context-aware responses through a deterministic rule-based engine — no generative AI required. It features a sleek Next.js frontend, a high-performance FastAPI backend, seamless REST API communication, full Docker containerisation, and cloud deployment on Vercel & Render. The project demonstrates clean frontend-backend integration, scalable API design, and a modular architecture that is easy to extend.',
        features: [
            'Rule-based AI response engine',
            'Responsive Next.js chat UI',
            'FastAPI backend with REST API',
            'Dockerised & cloud-deployed (Vercel + Render)',
            'Modular, easily extensible architecture',
        ],
        tech: ['Next.js', 'React', 'FastAPI', 'Python', 'Docker', 'REST API', 'Vercel', 'Render'],
        url: 'https://codsoft-task-01-phi.vercel.app/',
        github: 'https://github.com/Gagan3287/Rule-Bot_Ai',
        accent: '#a9f755b2',
        accentSecondary: '#17850dc6',
        glow: 'rgba(52, 198, 49, 0.66)',
        status: 'Live',
        year: '2026',
        Icon: Bot,
    },
];

// ─── Tech tag component ────────────────────────────────────────────────────────

const TechTag = ({ label }: { label: string }) => (
    <span className="project-tech-tag">{label}</span>
);

// ─── Feature item ──────────────────────────────────────────────────────────────

const FeatureItem = ({ text }: { text: string }) => (
    <li className="project-feature-item">
        <Sparkles size={13} className="project-feature-icon" />
        <span>{text}</span>
    </li>
);

// ─── Project card ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project }: { project: (typeof PROJECTS)[number] }) => (
    <div
        className="project-card"
        style={
            {
                '--proj-accent': project.accent,
                '--proj-accent2': project.accentSecondary,
                '--proj-glow': project.glow,
            } as React.CSSProperties
        }
    >
        {/* Top accent gradient bar */}
        <div className="project-card__top-bar" />

        {/* Glow overlay */}
        <div className="project-card__glow-overlay" />

        {/* ── Inner layout ── */}
        <div className="project-card__inner">

            {/* Left: icon + meta */}
            <div className="project-card__left">
                <div className="project-card__icon-wrap">
                    <project.Icon size={28} />
                </div>

                {/* Status + Year */}
                <div className="project-card__meta">
                    <span className="project-card__status">
                        <span className="project-card__status-dot" />
                        {project.status}
                    </span>
                    <span className="project-card__year">{project.year}</span>
                </div>

                {/* CTA buttons */}
                <div className="project-cta-group">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-open-btn"
                        id={`open-${project.id}`}
                    >
                        <Globe size={16} />
                        <span>Open Website</span>
                        <ExternalLink size={14} className="project-open-btn__arrow" />
                    </a>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-source-btn"
                            id={`source-${project.id}`}
                        >
                            <Github size={16} />
                            <span>Source Code</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Right: content */}
            <div className="project-card__right">
                <div className="project-card__header">
                    <h3 className="project-card__name">{project.name}</h3>
                    <p className="project-card__tagline">{project.tagline}</p>
                </div>

                <p className="project-card__description">{project.description}</p>

                {/* Features */}
                <ul className="project-features-list">
                    {project.features.map((f) => (
                        <FeatureItem key={f} text={f} />
                    ))}
                </ul>

                {/* Tech stack */}
                <div className="project-tech-row">
                    <Zap size={13} className="project-tech-zap" />
                    {project.tech.map((t) => (
                        <TechTag key={t} label={t} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// ─── MyProjects section ───────────────────────────────────────────────────────

const MyProjects = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.project-card',
                { y: 50, opacity: 0, scale: 0.96 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.12,
                    duration: 0.65,
                    ease: 'power2.out',
                },
            );

            gsap.fromTo(
                '.project-card__left',
                { x: -30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 78%',
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: 0.15,
                },
            );

            gsap.fromTo(
                '.project-card__right',
                { x: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 78%',
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: 0.25,
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="pb-section pt-10" id="projects">
            <div className="container" ref={containerRef}>
                {/* Section header */}
                <SectionTitle title="My Projects" />

                {/* Subtitle */}
                <p className="projects-subtitle">
                    A showcase of my latest work — where ideas meet execution.
                </p>

                {/* Cards */}
                <div className="projects-list">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyProjects;
