'use client';
import dynamic from 'next/dynamic';

const FloatingCompanion = dynamic(() => import('./FloatingCompanion'), { ssr: false });

export default function FloatingCompanionWrapper() {
    return <FloatingCompanion />;
}
