import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'SR University Student Developer Portfolios, Warangal',
    description:
        'Developer portfolios and projects by SR University, Warangal students. Featuring Vengala Gagan Chandra Tej, B.Tech CSE (AI & ML): AyuLink, SRU Lost & Found, VanSetu and more.',
    alternates: { canonical: '/sr-university' },
};

// Add other SR University students here, ONLY with their permission.
const students = [
    {
        name: 'Vengala Gagan Chandra Tej',
        program: 'B.Tech CSE (AI & ML), graduating 2028',
        focus: 'Full Stack and AI/ML developer',
        url: '/about',
        external: false,
    },
    // {
    //     name: 'Student Name',
    //     program: 'B.Tech ...',
    //     focus: '...',
    //     url: 'https://their-portfolio.com',
    //     external: true,
    // },
];

export default function SRUniversityPage() {
    return (
        <article className="mx-auto max-w-3xl px-6 py-32">
            <h1 className="font-anton text-5xl uppercase">
                SR University Student Developer Portfolios
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                A growing list of portfolios and projects by students of SR University, Warangal,
                Telangana. Are you an SR University student with a portfolio? Get in touch and I
                will add it to this list.
            </p>

            <h2 className="mt-12 text-3xl font-semibold">
                Featured student: Vengala Gagan Chandra Tej
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
                Vengala Gagan Chandra Tej is a B.Tech Computer Science (AI &amp; ML) student at SR
                University, Warangal, and a Full Stack developer who builds web applications and
                applied AI systems. Projects built as an SR University student include:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg">
                <li>
                    <Link href="/projects/ayulink" className="font-semibold underline">
                        AyuLink
                    </Link>
                    : an offline patient monitoring system that won 1st Prize in the Health domain
                    at Pragathi 2.0, SR University.
                </li>
                <li>
                    <Link href="/projects/sru-lost-found" className="font-semibold underline">
                        SRU Lost &amp; Found
                    </Link>
                    : a lost-and-found platform built for SR University students.
                </li>
                <li>
                    <Link href="/projects/vansetu" className="font-semibold underline">
                        VanSetu
                    </Link>
                    : a WebGIS platform for Smart India Hackathon 2026, selected in the SR
                    University internal round.
                </li>
                <li>
                    <Link href="/projects/fedlearn-hub" className="font-semibold underline">
                        FedLearn Hub
                    </Link>{' '}
                    and{' '}
                    <Link href="/projects/studymate-ai" className="font-semibold underline">
                        StudyMate AI
                    </Link>
                    : AI projects for engineering students.
                </li>
            </ul>

            <h2 className="mt-12 text-3xl font-semibold">Student portfolio directory</h2>
            <ul className="mt-4 space-y-5">
                {students.map((s) => (
                    <li key={s.name}>
                        {s.external ? (
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold underline"
                            >
                                {s.name}
                            </a>
                        ) : (
                            <Link href={s.url} className="text-lg font-semibold underline">
                                {s.name}
                            </Link>
                        )}
                        <p className="text-sm text-muted-foreground">
                            {s.program} / {s.focus}
                        </p>
                    </li>
                ))}
            </ul>

            <p className="mt-16 text-sm text-muted-foreground">
                Maintained by{' '}
                <Link href="/about" className="underline">
                    Vengala Gagan Chandra Tej
                </Link>
                , SR University, Warangal. This is an independent student-run page and is not an
                official SR University website.
            </p>
        </article>
    );
}