import Link from 'next/link';
import ContactSection from '@/app/_components/ContactSection';
import { projects } from '@/lib/projects';
import { PROFILES, PERSON_NAME } from '@/lib/site';

const Footer = () => {
    return (
        <footer id="footer-root" className="overflow-hidden bg-[hsl(0,0%,8%)]">
            <ContactSection />

            <nav
                aria-label="Footer"
                className="container border-t border-white/10 pb-10 pt-8 text-sm text-muted-foreground"
            >
                <div className="grid gap-8 sm:grid-cols-3">
                    <div>
                        <p className="mb-3 uppercase tracking-wide">Pages</p>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-foreground">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-foreground">
                                    About {PERSON_NAME}
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/sr-university" className="hover:text-foreground">
                                    SR University Student Portfolios
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="mb-3 uppercase tracking-wide">Projects</p>
                        <ul className="space-y-2">
                            {projects.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        href={`/projects/${p.slug}`}
                                        className="hover:text-foreground"
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="mb-3 uppercase tracking-wide">Profiles</p>
                        <ul className="space-y-2">
                            {PROFILES.map((p) => (
                                <li key={p.name}>
                                    <a
                                        href={p.url}
                                        target="_blank"
                                        rel="me noopener noreferrer"
                                        className="hover:text-foreground"
                                    >
                                        {p.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="mt-10 text-xs">
                    &copy; {new Date().getFullYear()} {PERSON_NAME}. Full Stack Developer
                    portfolio, Warangal, Telangana.
                </p>
            </nav>
        </footer>
    );
};

export default Footer;