import type { Metadata } from 'next';
import Link from 'next/link';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
    title: 'Blog - Full Stack and AI/ML Projects',
    description:
        'Blog by Vengala Gagan Chandra Tej, Full Stack developer from Warangal: project write-ups, lessons learned and notes on building with Next.js, FastAPI and AI/ML.',
    alternates: { canonical: '/blog' },
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

export default function BlogPage() {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <section className="mx-auto max-w-3xl px-6 py-32">
            <h1 className="font-anton text-5xl uppercase">Blog</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Project write-ups and lessons learned by Vengala Gagan Chandra Tej, Full Stack
                developer from Warangal.
            </p>

            <ul className="mt-12 space-y-10">
                {sorted.map((post) => (
                    <li key={post.slug}>
                        <article>
                            <p className="text-sm text-muted-foreground">
                                {formatDate(post.date)}
                            </p>
                            <h2 className="mt-1 text-2xl font-semibold">
                                <Link href={`/blog/${post.slug}`} className="hover:underline">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="mt-2 text-lg text-muted-foreground">
                                {post.description}
                            </p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}