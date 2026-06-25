import { GENERAL_INFO } from '@/lib/data';
import { GitFork, Star } from 'lucide-react';
import FooterAvatarWrapper from './FooterAvatarWrapper';

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

const Footer = async () => {
    let stargazers_count = 0;
    let forks_count = 0;

    try {
        const res = await fetch(
            'https://api.github.com/repos/Gagan3287/portfolio-2.0-main',
            { next: { revalidate: 60 * 60 } },
        );
        if (res.ok) {
            const data = (await res.json()) as RepoStats;
            stargazers_count = data.stargazers_count;
            forks_count = data.forks_count;
        }
    } catch {
        // silently fail — counts stay at 0
    }

    return (
        <footer className="text-center pb-10 overflow-hidden" id="contact">
            {/* Walking avatar send-off */}
            <FooterAvatarWrapper />

            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline"
                >
                    {GENERAL_INFO.email}
                </a>

                <div className="flex items-center justify-center gap-5 text-muted-foreground">
                    <a
                        href="https://github.com/Gagan3287"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition-colors font-medium"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        Gagan3287
                    </a>

                    <span className="text-muted-foreground/40">•</span>

                    <a
                        href="https://github.com/Gagan3287/portfolio-2.0-main"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Star size={16} /> {stargazers_count}
                    </a>
                    <a
                        href="https://github.com/Gagan3287/portfolio-2.0-main/forks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <GitFork size={16} /> {forks_count}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
