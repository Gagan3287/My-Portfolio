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

export const metadata: Metadata = {
    title: 'Vengala Gagan Chandra Tej | Full Stack Developer',
    description:
        'Personal portfolio of Vengala Gagan Chandra Tej — Full Stack Developer skilled in React, Next.js, Python, Node.js, and AI/ML. Building modern web experiences.',
    keywords: [
        'Vengala Gagan',
        'Full Stack Developer',
        'React Developer',
        'Next.js',
        'Python',
        'Node.js',
        'AI ML',
        'Portfolio',
        'Web Developer India',
    ],
    authors: [{ name: 'Vengala Gagan Chandra Tej' }],
    creator: 'Vengala Gagan Chandra Tej',
    metadataBase: new URL('https://my-portfolio-sage-zeta-64.vercel.app'),
    openGraph: {
        type: 'website',
        url: 'https://my-portfolio-sage-zeta-64.vercel.app',
        title: 'Vengala Gagan Chandra Tej | Full Stack Developer',
        description:
            'Full Stack Developer • React • Next.js • Python • Node.js • AI/ML Enthusiast. Check out my portfolio and projects.',
        siteName: 'Vengala Gagan — Portfolio',
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
        title: 'Vengala Gagan Chandra Tej | Full Stack Developer',
        description:
            'Full Stack Developer • React • Next.js • Python • Node.js • AI/ML. Explore my projects and work.',
        images: ['/THUMBNAIL.jpg'],
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
                <ReactLenis
                    root
                    options={{
                        lerp: 0.1,
                        duration: 1.4,
                    }}
                >
                    {/* <a
                        href="https://forms.gle/t73XYJgWD5cJNr6e8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 block bg-black text-center z-[1] text-sm py-2 hover:text-primary transition-all"
                    >
                        Frontend dev? I&apos;ll help you polish your resume —
                        completely free.
                    </a> */}
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
