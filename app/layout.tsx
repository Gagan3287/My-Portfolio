import type { Metadata } from 'next';
import { Anton, Roboto_Flex } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '../components/Preloader';
import StickyLinks from '@/components/StickyLinks';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import FloatingCompanionWrapper from '@/components/FloatingCompanionWrapper';

const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
});

const robotoFlex = Roboto_Flex({
    weight: ['100', '400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
});

const SITE_URL = 'https://vengala-gagan.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default:
            'Vengala Gagan Chandra Tej | Full Stack Developer Portfolio',
        template: '%s | Vengala Gagan Chandra Tej',
    },
    description:
        'Portfolio of Vengala Gagan Chandra Tej, a Full Stack & AI/ML developer from Warangal, Telangana. Projects: Quill AI, FedLearn Hub, StudyMate AI, AyuLink, HomelyHub.',
    alternates: {
        canonical: '/',
    },
    keywords: [
        'Vengala Gagan Chandra Tej',
        'Gagan Chandra Tej',
        'Vengala Gagan',
        'Gagan Vengala portfolio',
        'Full Stack Developer',
        'Full Stack Developer Warangal',
        'React Developer',
        'Next.js',
        'Python',
        'Node.js',
        'AI ML',
        'Portfolio',
        'Web Developer India',
    ],
    authors: [{ name: 'Vengala Gagan Chandra Tej', url: SITE_URL }],
    creator: 'Vengala Gagan Chandra Tej',
    verification: {
        google: 'DtrC8_6S7KcGkE3u39oQW4uZn8xbnJLJ9YWgJCQZXtQ',
    },
    openGraph: {
        type: 'website',
        url: SITE_URL,
        title: 'Vengala Gagan Chandra Tej | Full Stack Developer Portfolio',
        description:
            'Full Stack Developer • React • Next.js • Python • Node.js • AI/ML. Explore the projects and work of Vengala Gagan Chandra Tej from Warangal.',
        siteName: 'Vengala Gagan Chandra Tej — Portfolio',
        locale: 'en_IN',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Vengala Gagan Chandra Tej — Full Stack Developer Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vengala Gagan Chandra Tej | Full Stack Developer Portfolio',
        description:
            'Full Stack Developer • React • Next.js • Python • Node.js • AI/ML. Explore my projects and work.',
        images: ['/og-image.png'],
        creator: '@gagan_vengala',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Vengala Gagan Chandra Tej — Portfolio',
            description:
                'Portfolio website of Vengala Gagan Chandra Tej, Full Stack & AI/ML developer from Warangal, Telangana.',
            inLanguage: 'en',
            publisher: { '@id': `${SITE_URL}/#person` },
        },
        {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Vengala Gagan Chandra Tej',
            alternateName: [
                'Gagan Chandra Tej',
                'Vengala Gagan',
                'Gagan Vengala',
                'Gagan3287',
            ],
            url: SITE_URL,
            mainEntityOfPage: SITE_URL,
            jobTitle: 'Full Stack Developer',
            description:
                'Full Stack and AI/ML developer from Warangal, Telangana, building RAG systems, full-stack platforms and federated learning apps.',
            homeLocation: {
                '@type': 'Place',
                name: 'Warangal, Telangana, India',
            },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'SR University',
            },
            knowsAbout: [
                'Full Stack Development',
                'Next.js',
                'React',
                'Node.js',
                'Python',
                'FastAPI',
                'Machine Learning',
                'RAG Systems',
                'Federated Learning',
            ],
            sameAs: [
                'https://github.com/Gagan3287',
                'https://www.linkedin.com/in/vengala-gagan-176a9433a/',
                'https://leetcode.com/u/Vengala_Gagan/',
                'https://www.instagram.com/gagan_vengala/',
                'https://www.researchgate.net/profile/Gagan-Vengala',
                'https://www.geeksforgeeks.org/profile/2403a5tyu3',
                'https://scholar.google.com/citations?user=zWMaXuMAAAAJ&hl=en',
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <GoogleAnalytics gaId="G-MHLY1LNGY5" />
            <Script id="hotjar" strategy="afterInteractive">
                {`(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6380611,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
            </Script>
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
                suppressHydrationWarning
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData).replace(
                            /</g,
                            '\\u003c'
                        ),
                    }}
                />
                <ReactLenis
                    root
                    options={{
                        lerp: 0.1,
                        duration: 1.4,
                    }}
                >
                    <Navbar />
                    <main>{children}</main>
                    <Footer />

                    <CustomCursor />
                    <Preloader />
                    <ScrollProgressIndicator />
                    <ParticleBackground />
                    <StickyLinks />
                    <FloatingCompanionWrapper />
                </ReactLenis>
            </body>
        </html>
    );
}
