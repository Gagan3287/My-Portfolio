import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, getPost } from '@/lib/posts';
import { getProject } from '@/lib/projects';
import { SITE_URL, PERSON_NAME } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};

    const firstImage = post.sections.flatMap((s) => s.images ?? [])[0];

    return {
        title: { absolute: post.title },
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.description,
            url: `/blog/${post.slug}`,
            publishedTime: post.date,
            authors: [PERSON_NAME],
            tags: post.tags,
            ...(firstImage ? { images: [{ url: firstImage.src, alt: firstImage.alt }] } : {}),
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        keywords: post.tags.join(', '),
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
    };

    const related = (post.related ?? [])
        .map((s) => getProject(s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));

    return (
        <article className="mx-auto max-w-3xl px-6 py-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                }}
            />

            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                &larr; All posts
            </Link>

            <h1 className="mt-6 font-anton text-4xl uppercase leading-tight sm:text-5xl">
                {post.title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
                By{' '}
                <Link href="/about" className="underline">
                    {PERSON_NAME}
                </Link>{' '}
                &middot; {formatDate(post.date)}
            </p>

            {post.sections.map((s, i) => (
                <section key={i} className="mt-10">
                    {s.heading && <h2 className="text-3xl font-semibold">{s.heading}</h2>}

                    {s.paragraphs?.map((t, j) => (
                        <p key={j} className="mt-4 text-lg leading-relaxed">
                            {t}
                        </p>
                    ))}

                    {s.bullets && (
                        <ul className="mt-4 list-disc space-y-3 pl-6 text-lg text-muted-foreground">
                            {s.bullets.map((b) => (
                                <li key={b}>{b}</li>
                            ))}
                        </ul>
                    )}

                    {s.images && (
                        <div className="mt-6 space-y-8">
                            {s.images.map((img) => (
                                <figure
                                    key={img.src}
                                    className={img.portrait ? 'mx-auto max-w-sm' : ''}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 768px) 100vw, 768px"
                                        className="h-auto w-full rounded-xl"
                                    />
                                    {img.caption && (
                                        <figcaption className="mt-2 text-sm text-muted-foreground">
                                            {img.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    )}

                    {s.links && (
                        <ul className="mt-4 space-y-2 text-lg">
                            {s.links.map((l) => (
                                <li key={l.href}>
                                    {l.external ? (
                                        <a
                                            href={l.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                        >
                                            {l.label}
                                        </a>
                                    ) : (
                                        <Link href={l.href} className="underline">
                                            {l.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}

            {related.length > 0 && (
                <section className="mt-14">
                    <h2 className="text-3xl font-semibold">Related projects</h2>
                    <ul className="mt-4 space-y-2 text-lg">
                        {related.map((p) => (
                            <li key={p.slug}>
                                <Link href={`/projects/${p.slug}`} className="font-semibold underline">
                                    {p.name}
                                </Link>
                                <span className="text-muted-foreground">: {p.tagline}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <p className="mt-16 text-sm text-muted-foreground">
                Written by{' '}
                <Link href="/about" className="underline">
                    {PERSON_NAME}
                </Link>
                , Full Stack Developer from Warangal, SR University.
            </p>
        </article>
    );
}