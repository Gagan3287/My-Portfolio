'use client';
import dynamic from 'next/dynamic';

const FooterAvatar = dynamic(() => import('./FooterAvatar'), { ssr: false });

export default function FooterAvatarWrapper() {
    return (
        <div
            className="relative w-full"
            style={{ height: '275px' }}
            aria-hidden="true"
        >
            <FooterAvatar />
            {/* Bottom fade to match page background */}
            <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent, hsl(0 0% 8%))',
                }}
            />
        </div>
    );
}
