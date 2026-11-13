import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { PROFILES } from '@/lib/site';

export const metadata: Metadata = {
    title: 'About Me - Full Stack Developer from Warangal',
    description:
        'About Vengala Gagan Chandra Tej: B.Tech CSE (AI & ML) student at SR University, Warangal. Full Stack developer building RAG systems, federated learning and MERN apps.',
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <article className="mx-auto max-w-3xl px-6 py-32">
            <h1 className="font-anton text-5xl uppercase">Vengala Gagan Chandra Tej</h1>
            <p className="mt-3 text-lg text-muted-foreground">
                Full Stack Developer and AI/ML student from Warangal, Telangana
            </p>

            <p className="mt-8 text-lg leading-relaxed">
                I am Vengala Gagan Chandra Tej, a B.Tech Computer Science (AI &amp; ML) student at
                SR University, Warangal, graduating in 2028. I build full-stack web applications
                and applied AI systems, including RAG-based assistants, federated learning
                platforms and MERN stack products. This website is my developer portfolio.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                I study at SR University, Warangal. See the{' '}
                <Link href="/sr-university" className="underline">
                    SR University student developer portfolios
                </Link>{' '}
                page, or read my{' '}
                <Link href="/blog" className="underline">
                    blog
                </Link>
                .
            </p>

            <h2 className="mt-12 text-3xl font-semibold">What I work with</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Python, JavaScript, TypeScript, C, React, Next.js, Node.js, Express, FastAPI,
                Tailwind CSS, PostgreSQL, MongoDB, Redis, AWS, Docker, machine learning, deep
                learning and RAG systems.
            </p>

            <h2 className="mt-12 text-3xl font-semibold">Projects</h2>
            <ul className="mt-4 space-y-3 text-lg">
                {projects.map((p) => (
                    <li key={p.slug}>
                        <Link href={`/projects/${p.slug}`} className="font-semibold underline">
                            {p.name}
                        </Link>
                        <span className="text-muted-foreground">: {p.tagline}</span>
                    </li>
                ))}
            </ul>

            <h2 className="mt-12 text-3xl font-semibold">Achievements</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-muted-foreground">
                <li>1st Prize, Health Domain, Pragathi 2.0, SR University (AyuLink, team lead)</li>
                <li>Smart India Hackathon 2026, selected in the college internal round (VanSetu)</li>
                <li>Oracle Certified Foundations Associate (Agentic AI)</li>
                <li>NVIDIA Fundamentals of Deep Learning</li>
                <li>MERN Full Stack and Data Science virtual internships (AICTE-EduSkills)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-semibold">Find me online</h2>
            <ul className="mt-4 space-y-2 text-lg">
                {PROFILES.map((p) => (
                    <li key={p.name}>
                        <a
                            href={p.url}
                            target="_blank"
                            rel="me noopener noreferrer"
                            className="underline"
                        >
                            {p.name}
                        </a>
                    </li>
                ))}
            </ul>
        </article>
    );
}