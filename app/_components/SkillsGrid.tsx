'use client';
import React from 'react';
import {
    Code2,
    Server,
    Terminal,
    BrainCircuit,
    Cloud,
    Wrench,
} from 'lucide-react';

// ── Skill categories ──────────────────────────────────────────────────────────

interface SkillCategory {
    id: string;
    label: string;
    Icon: React.ElementType;
    accent: string;
    glow: string;
    skills: string[];
}

const CATEGORIES: SkillCategory[] = [
    {
        id: 'frontend',
        label: 'Frontend Development',
        Icon: Code2,
        accent: '#61DAFB',
        glow: 'rgba(97,218,251,0.18)',
        skills: ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
        id: 'backend',
        label: 'Backend Development',
        Icon: Server,
        accent: '#339933',
        glow: 'rgba(51,153,51,0.18)',
        skills: ['Node.js', 'Express.js', 'FastAPI', 'MongoDB', 'SQL', 'REST APIs'],
    },
    {
        id: 'languages',
        label: 'Programming Languages',
        Icon: Terminal,
        accent: '#F7DF1E',
        glow: 'rgba(247,223,30,0.18)',
        skills: ['Python', 'TypeScript', 'JavaScript', 'C', 'Ruby', 'HTML5'],
    },
    {
        id: 'ai-ml',
        label: 'AI / ML & Data Science',
        Icon: BrainCircuit,
        accent: '#a855f7',
        glow: 'rgba(168,85,247,0.22)',
        skills: ['TensorFlow', 'scikit-learn', 'LangChain', 'Pandas', 'NumPy', 'Matplotlib', 'YOLOv8', 'OpenCV'],
    },
    {
        id: 'cloud',
        label: 'Cloud & DevOps',
        Icon: Cloud,
        accent: '#FF9900',
        glow: 'rgba(255,153,0,0.18)',
        skills: ['AWS', 'Docker', 'Vercel', 'GitHub Actions'],
    },
    {
        id: 'tools',
        label: 'Tools & Ecosystem',
        Icon: Wrench,
        accent: '#06B6D4',
        glow: 'rgba(6,182,212,0.18)',
        skills: ['Git', 'GitHub', 'Postman', 'Figma', 'Power BI', 'Jupyter Notebook'],
    },
];

// ── Category Card ─────────────────────────────────────────────────────────────

const CategoryCard = ({ cat }: { cat: SkillCategory }) => (
    <div
        className="skill-cat-card"
        style={{
            '--cat-accent': cat.accent,
            '--cat-glow': cat.glow,
        } as React.CSSProperties}
    >
        {/* Top accent bar */}
        <div className="skill-cat-card__bar" />

        {/* Header */}
        <div className="skill-cat-card__header">
            <span className="skill-cat-card__icon-wrap">
                <cat.Icon size={18} />
            </span>
            <h3 className="skill-cat-card__title">{cat.label}</h3>
        </div>

        {/* Pills */}
        <div className="skill-cat-card__pills">
            {cat.skills.map((skill) => (
                <span key={skill} className="skill-pill">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

// ── Main Export ───────────────────────────────────────────────────────────────

export function SkillsGrid() {
    return (
        <div className="skills-cat-grid">
            {CATEGORIES.map((cat) => (
                <CategoryCard key={cat.id} cat={cat} />
            ))}
        </div>
    );
}
