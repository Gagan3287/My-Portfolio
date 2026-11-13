import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

function truncate(text: string, max = 155) {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    return cut.slice(0, cut.lastIndexOf(' ')) + '...';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};

    return {
        title: `${project.name}: ${project.tagline}`,
        description: truncate(project.description),
        alternates: { canonical: `/projects/${project.slug}` },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    return (
        <article className="mx-auto max-w-3xl px-6 py-32">
            <Link
                href="/#projects"
                className="text-sm text-muted-foreground hover:text-foreground"
            >
                &larr; All projects
            </Link>

            <h1 className="mt-6 font-anton text-5xl uppercase">{project.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>

            <p className="mt-8 text-lg leading-relaxed">{project.description}</p>

            <h2 className="mt-12 text-3xl font-semibold">Highlights</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-muted-foreground">
                {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                ))}
            </ul>

            <h2 className="mt-12 text-3xl font-semibold">Tech stack</h2>
            <p className="mt-4 text-lg text-muted-foreground">{project.stack.join(' / ')}</p>

            <div className="mt-10 flex flex-wrap gap-4">
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/20 px-5 py-2 hover:border-primary"
                    >
                        View live project
                    </a>
                )}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/20 px-5 py-2 hover:border-primary"
                    >
                        Source code
                    </a>
                )}
            </div>

            <p className="mt-16 text-sm text-muted-foreground">
                Built by{' '}
                <Link href="/about" className="underline">
                    Vengala Gagan Chandra Tej
                </Link>
                , Full Stack Developer from Warangal.
            </p>
        </article>
    );
}