import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { PROFILES, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
    title: 'About Me - Full Stack Developer from Warangal',
    description:
        'About Vengala Gagan Chandra Tej: B.Tech CSE (AI & ML) student at SR University, Warangal. Full Stack developer building RAG systems, federated learning and MERN apps.',
    alternates: { canonical: '/about' },
};

const faqs = [
    {
        q: 'Who is Vengala Gagan Chandra Tej?',
        a: 'Vengala Gagan Chandra Tej is a Full Stack Developer and AI/ML student from Warangal, Telangana, India. He is a B.Tech Computer Science (AI & ML) student at SR University, Warangal, and is expected to graduate in 2028.',
    },
    {
        q: 'Is Gagan Vengala the same person?',
        a: 'Yes. Gagan Vengala, Vengala Gagan and Gagan Chandra Tej all refer to Vengala Gagan Chandra Tej. His GitHub username is Gagan3287.',
    },
    {
        q: 'Where does he study?',
        a: 'He studies B.Tech Computer Science (AI & ML) at SR University, Warangal, Telangana, and expects to graduate in 2028.',
    },
    {
        q: 'What does he build?',
        a: 'He builds full-stack web applications and applied AI systems, including RAG-based assistants, federated learning platforms and MERN stack products.',
    },
    {
        q: 'What projects has he built?',
        a: 'His projects include AyuLink, VanSetu, FedLearn Hub, StudyMate AI, Quill AI, HomelyHub, RuleBot and SRU Lost & Found. Each project has its own page on this website.',
    },
    {
        q: 'Has he won any awards?',
        a: 'Yes. As team lead of a five-member team called Fight Club, he won 1st Prize in the Health domain at Pragathi 2.0, SR University, in October 2026 for AyuLink. His project VanSetu was also selected among 100 teams in the college internal round for Smart India Hackathon 2026.',
    },
    {
        q: 'What is AyuLink?',
        a: 'AyuLink is a low-cost patient monitoring system designed to work in rural areas without internet. It tracks a patient\'s health, reminds them about medicines and alerts caregivers.',
    },
    {
        q: 'Which technologies does he use?',
        a: 'He uses Python, JavaScript, TypeScript and C; React, Next.js, Node.js, Express, FastAPI and Tailwind CSS; PostgreSQL, MongoDB and Redis; AWS and Docker; and works on machine learning, deep learning and RAG systems.',
    },
    {
        q: 'Has he done any internships?',
        a: 'Yes. In 2026 he completed an 8-week MERN Full Stack virtual internship and an 8-week Data Science virtual internship through AICTE-EduSkills, the Data Science one supported by Siemens, and a MERN internship with Emertxe and Webstack Academy, where he built HomelyHub.',
    },
    {
        q: 'What certifications does he hold?',
        a: 'They include the Oracle Certified Foundations Associate (Agentic AI) and the NVIDIA Fundamentals of Deep Learning certificate. More certifications are listed on the home page.',
    },
    {
        q: 'Which languages does he speak?',
        a: 'His resume lists Telugu, English, Hindi and Japanese.',
    },
    {
        q: 'Where can I find his code and profiles?',
        a: 'His code is on GitHub (Gagan3287). He is also on LeetCode, GeeksforGeeks, Kaggle, Google Scholar, ResearchGate, LinkedIn and Instagram. All the links are in the Find me online section on this page.',
    },
    {
        q: 'How can I contact him?',
        a: 'Through his LinkedIn profile or the contact section at the bottom of the home page of this website.',
    },
];

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/about#faq`,
    url: `${SITE_URL}/about`,
    about: { '@id': `${SITE_URL}/#person` },
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

export default function AboutPage() {
    return (
        <article className="mx-auto max-w-3xl px-6 py-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
                }}
            />

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

            <h2 className="mt-12 text-3xl font-semibold">Frequently asked questions</h2>
            <div className="mt-4 space-y-6">
                {faqs.map((f) => (
                    <div key={f.q}>
                        <h3 className="text-xl font-semibold">{f.q}</h3>
                        <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{f.a}</p>
                    </div>
                ))}
            </div>

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