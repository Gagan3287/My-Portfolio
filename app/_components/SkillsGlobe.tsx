'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

// ── Tech data ──────────────────────────────────────────────────────────────────

interface SkillData {
    name: string;
    logo: React.ReactNode;  // actual logo element
    color: string;
    bg: string;
}

interface RingData {
    radius: number;
    speed: number;
    tilt: number;
    skills: SkillData[];
}

// ── Inline SVG logos for skills without existing assets ─────────────────────

// Python logo
const PythonLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#3776AB" d="M63.98 15c-26.87 0-25.2 11.66-25.2 11.66l.03 12.08h25.66v3.63H29.3S13 40.51 13 67.64s14.72 26.2 14.72 26.2h8.79v-12.6s-.47-14.72 14.49-14.72h24.96s14.02.23 14.02-13.54V28.47S92.27 15 63.98 15zm-13.9 8.04c2.51 0 4.54 2.03 4.54 4.54s-2.03 4.54-4.54 4.54-4.54-2.03-4.54-4.54 2.03-4.54 4.54-4.54z"/>
        <path fill="#FFD43B" d="M64.02 113c26.87 0 25.2-11.66 25.2-11.66l-.03-12.08H63.53v-3.63h35.17S115 87.49 115 60.36 100.28 34.16 100.28 34.16h-8.79v12.6s.47 14.72-14.49 14.72H52.04S38.02 61.25 38.02 75.02V99.53S35.73 113 64.02 113zm13.9-8.04c-2.51 0-4.54-2.03-4.54-4.54s2.03-4.54 4.54-4.54 4.54 2.03 4.54 4.54-2.03 4.54-4.54 4.54z"/>
    </svg>
);

// C logo
const CLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#A8B9CC" d="M115 61.3c-.5-3.5-1.8-6.8-3.9-9.7a27 27 0 00-8-7.3 27.3 27.3 0 00-10.6-3.1c-2-.2-4 0-6 .4-5.4 1.1-10.2 3.9-13.8 8a27.3 27.3 0 00-6.1 17.7c0 3.3.6 6.5 1.8 9.5a27.4 27.4 0 0015.7 15.3c3 1.2 6.2 1.8 9.5 1.8a27 27 0 0017.7-6.7 27 27 0 007.7-16l.1-1.2V69l-.1-7.7zM92.7 82.3a16.4 16.4 0 01-9.7-3.1 16.3 16.3 0 01-5.8-8.1 16.6 16.6 0 011-12.7A16.3 16.3 0 0192.7 50a16.6 16.6 0 0113.1 6.6l-6.6 6.6a8 8 0 00-6.5-3.2 8 8 0 00-6.5 12.8 8 8 0 006.5 3.2 8 8 0 006.5-3.3l6.6 6.7a16.5 16.5 0 01-13.1 3.9z"/>
    </svg>
);

// C++ logo
const CppLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#00599C" d="M115 61.3c-.5-3.5-1.8-6.8-3.9-9.7a27 27 0 00-8-7.3 27.3 27.3 0 00-10.6-3.1c-2-.2-4 0-6 .4-5.4 1.1-10.2 3.9-13.8 8a27.3 27.3 0 00-6.1 17.7c0 3.3.6 6.5 1.8 9.5a27.4 27.4 0 0015.7 15.3c3 1.2 6.2 1.8 9.5 1.8a27 27 0 0017.7-6.7 27 27 0 007.7-16l.1-1.2V69l-.1-7.7zM92.7 82.3a16.4 16.4 0 01-9.7-3.1 16.3 16.3 0 01-5.8-8.1 16.6 16.6 0 011-12.7A16.3 16.3 0 0192.7 50a16.6 16.6 0 0113.1 6.6l-6.6 6.6a8 8 0 00-6.5-3.2 8 8 0 00-6.5 12.8 8 8 0 006.5 3.2 8 8 0 006.5-3.3l6.6 6.7a16.5 16.5 0 01-13.1 3.9zM108 65h-4v-4h-4v4h-4v4h4v4h4v-4h4v-4zm14 0h-4v-4h-4v4h-4v4h4v4h4v-4h4v-4z"/>
    </svg>
);

// Java logo
const JavaLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#F89820" d="M47.6 67.6s-3.2 1.9 2.3 2.5c6.6.8 10 .7 17.3-.7 0 0 1.9 1.2 4.6 2.3-16.4 7-37.1-.4-24.2-4.1zM45.5 58.1s-3.6 2.7 1.9 3.2c7.1.7 12.7.8 22.4-1 0 0 1.3 1.4 3.4 2.1-19.9 5.8-42 .5-27.7-4.3z"/>
        <path fill="#EA2D2E" d="M68.4 43.6c4 4.7-1 8.9-1 8.9s10.2-5.3 5.5-11.9c-4.4-6.2-7.8-9.3 10.5-20 0 .1-28.7 7.2-15 23z"/>
        <path fill="#F89820" d="M90.6 73.3s2.4 2-2.6 3.5c-9.5 2.9-39.4 3.7-47.7.1-3-.1.3-2.9 2.1-3.2 1.8-.4 2.8-.3 2.8-.3-3.2-2.2-20.6 4.4-8.9 6.4 32.1 5.2 58.5-2.3 54.3-6.5zM49.2 48.1s-14.7 3.5-5.2 4.8c4 .5 12 .4 19.4-.2 6.1-.5 12.2-1.6 12.2-1.6s-2.1.9-3.7 2c-14.8 3.9-43.4 2.1-35.2-1.9 6.9-3.4 12.5-3.1 12.5-3.1zM82.8 64.1c15-7.8 8.1-15.3 3.2-14.3-1.2.3-1.7.5-1.7.5s.4-.7 1.3-1c9.8-3.4 17.3 10.1-3.1 15.5 0-.1.2-.5.3-.7z"/>
        <path fill="#EA2D2E" d="M72.1 1.5s8.4 8.4-7.9 21.3c-13 10.3-3 16.2 0 22.9-7.6-6.9-13.2-12.9-9.5-18.6C60.2 19.1 74.7 15.4 72.1 1.5z"/>
        <path fill="#F89820" d="M50.9 92.3c14.4 1 36.5-.5 37-7.3 0 0-1 2.6-11.9 4.6-12.3 2.3-27.5 2-36.5.5 0 0 1.8 1.5 11.4 2.2z"/>
    </svg>
);

// JavaScript logo
const JSLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#F7DF1E" d="M1.4 1.4h125.2v125.2H1.4z"/>
        <path d="M116.7 96.7c-1.6-10-9.5-14.7-20.3-16.8l-2.1-.4c-4.9-1.1-9.7-3.4-9.7-7.4 0-3.7 2.8-6.7 9.1-6.7 5.9 0 10.2 2.2 12.7 7.5l11-6.7c-4.5-8.7-12.2-12.7-23.7-12.7-13.8 0-22.8 8-22.8 19 0 11.1 6.5 17.3 20.6 20.3l2.1.5c7.1 1.6 10.4 4.2 10.4 8.5 0 4.5-3.8 7.2-11.1 7.2-7.7 0-13-3.6-16.1-10.5l-11.3 6.4c4.3 10.6 13.7 16.1 27.4 16.1 14.5 0 24-7.4 24-20.3zM67.1 54.8H54.5v39.9c0 7.8-3.5 11-9.6 11-5.3 0-8.2-3.2-11-7.9L22.7 104c3.7 7.7 10.8 12.4 20.8 12.4 13.4 0 23.6-7.1 23.6-23V54.8z"/>
    </svg>
);

// TensorFlow logo
const TFLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#FF6F00" d="M63.5 1L10 32v64l53.5 31 53.5-31V32L63.5 1zM97 82.3L63.5 101 30 82.3V45.7L63.5 27 97 45.7v36.6z"/>
        <path fill="#FF6F00" d="M63.5 38.5v51L87 76.5V51.5L63.5 38.5z"/>
    </svg>
);

// PyTorch logo
const PyTorchLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#EE4C2C" d="M64 16C37.5 16 16 37.5 16 64s21.5 48 48 48 48-21.5 48-48S90.5 16 64 16zm0 84c-19.9 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.1 36-36 36z"/>
        <path fill="#EE4C2C" d="M79 33.5L64 16v20l15-2.5z"/>
        <circle fill="#EE4C2C" cx="78" cy="50" r="6"/>
    </svg>
);

// Scikit-learn logo (simplified)
const ScikitLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <circle cx="64" cy="64" r="50" fill="#F7931E" opacity="0.15" stroke="#F7931E" strokeWidth="2"/>
        <text x="64" y="75" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#F7931E" fontFamily="sans-serif">SK</text>
    </svg>
);

// Pandas logo
const PandasLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <rect x="30" y="20" width="20" height="88" rx="4" fill="#7048e8"/>
        <rect x="78" y="20" width="20" height="88" rx="4" fill="#7048e8"/>
        <rect x="30" y="50" width="68" height="20" rx="2" fill="#7048e8" opacity="0.5"/>
    </svg>
);

// NumPy logo
const NumPyLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#4DABCF" d="M64 10L10 42v44l54 32 54-32V42L64 10zm0 12l40 24v36L64 106 24 82V46l40-24z"/>
        <path fill="#4DABCF" d="M64 34L34 52v36l30 18 30-18V52L64 34z" opacity="0.5"/>
    </svg>
);

// OpenCV logo
const OpenCVLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <circle cx="40" cy="40" r="24" fill="#5C3EE8"/>
        <circle cx="88" cy="40" r="24" fill="#4CAF50"/>
        <circle cx="64" cy="82" r="24" fill="#EE4C2C"/>
    </svg>
);

// MongoDB logo
const MongoLogo = () => (
    <Image src="/logo/mongodb.png" alt="MongoDB" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// PostgreSQL logo
const PostgreLogo = () => (
    <Image src="/logo/postgreSQL.png" alt="PostgreSQL" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// MySQL/SQL logo
const SQLLogo = () => (
    <Image src="/logo/mysql.svg" alt="SQL" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// Git logo
const GitLogo = () => (
    <Image src="/logo/git.png" alt="Git" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// Docker logo
const DockerLogo = () => (
    <Image src="/logo/docker.svg" alt="Docker" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// AWS logo
const AWSLogo = () => (
    <Image src="/logo/aws.png" alt="AWS" width={28} height={28} style={{ objectFit: 'contain' }} />
);

// Linux logo
const LinuxLogo = () => (
    <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#FCC624" d="M64 12c-8 0-14 6-14 14s6 14 14 14 14-6 14-14S72 12 64 12zm0 6a8 8 0 110 16 8 8 0 010-16z"/>
        <path fill="#FCC624" d="M42 44c-2 8 0 18 8 26l-6 16c-2 4 0 8 4 10l12-8 12 8c4-2 6-6 4-10l-6-16c8-8 10-18 8-26H42zM50 96c-4 8-6 16-2 20 4-2 8-6 10-12l-8-8zm28 0l-8 8c2 6 6 10 10 12 4-4 2-12-2-20z"/>
    </svg>
);

// Node.js logo
const NodeLogo = () => (
    <Image src="/logo/node.png" alt="Node.js" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// React logo
const ReactLogo = () => (
    <Image src="/logo/react.png" alt="React" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// Next.js logo
const NextLogo = () => (
    <Image src="/logo/next.png" alt="Next.js" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// FastAPI logo
const FastAPILogo = () => (
    <Image src="/logo/fastapi.svg" alt="FastAPI" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// Flask logo
const FlaskLogo = () => (
    <Image src="/logo/flask.svg" alt="Flask" width={26} height={26} style={{ objectFit: 'contain' }} />
);

// ── Ring definitions ────────────────────────────────────────────────────────────

const RINGS: RingData[] = [
    {
        radius: 140,
        speed: 0.009,
        tilt: 0.3,
        skills: [
            { name: 'Python',     logo: <PythonLogo />,  color: '#3776AB', bg: '#3776AB22' },
            { name: 'C',          logo: <CLogo />,        color: '#A8B9CC', bg: '#A8B9CC22' },
            { name: 'C++',        logo: <CppLogo />,      color: '#00599C', bg: '#00599C22' },
            { name: 'Java',       logo: <JavaLogo />,     color: '#F89820', bg: '#F8982022' },
            { name: 'JavaScript', logo: <JSLogo />,       color: '#F7DF1E', bg: '#F7DF1E22' },
        ],
    },
    {
        radius: 220,
        speed: -0.006,
        tilt: -0.5,
        skills: [
            { name: 'TensorFlow', logo: <TFLogo />,       color: '#FF6F00', bg: '#FF6F0022' },
            { name: 'PyTorch',    logo: <PyTorchLogo />,  color: '#EE4C2C', bg: '#EE4C2C22' },
            { name: 'Scikit',     logo: <ScikitLogo />,   color: '#F7931E', bg: '#F7931E22' },
            { name: 'Pandas',     logo: <PandasLogo />,   color: '#7048e8', bg: '#7048e822' },
            { name: 'NumPy',      logo: <NumPyLogo />,    color: '#4DABCF', bg: '#4DABCF22' },
            { name: 'OpenCV',     logo: <OpenCVLogo />,   color: '#5C3EE8', bg: '#5C3EE822' },
            { name: 'FastAPI',    logo: <FastAPILogo />,  color: '#009688', bg: '#00968822' },
            { name: 'Flask',      logo: <FlaskLogo />,    color: '#cccccc', bg: '#cccccc22' },
        ],
    },
    {
        radius: 315,
        speed: 0.0035,
        tilt: 0.7,
        skills: [
            { name: 'MongoDB',    logo: <MongoLogo />,    color: '#47A248', bg: '#47A24822' },
            { name: 'PostgreSQL', logo: <PostgreLogo />,  color: '#336791', bg: '#33679122' },
            { name: 'SQL',        logo: <SQLLogo />,      color: '#4479A1', bg: '#4479A122' },
            { name: 'Git',        logo: <GitLogo />,      color: '#F05032', bg: '#F0503222' },
            { name: 'Docker',     logo: <DockerLogo />,   color: '#2496ED', bg: '#2496ED22' },
            { name: 'AWS',        logo: <AWSLogo />,      color: '#FF9900', bg: '#FF990022' },
            { name: 'Linux',      logo: <LinuxLogo />,    color: '#FCC624', bg: '#FCC62422' },
            { name: 'Node.js',    logo: <NodeLogo />,     color: '#339933', bg: '#33993322' },
            { name: 'React',      logo: <ReactLogo />,    color: '#61DAFB', bg: '#61DAFB22' },
            { name: 'Next.js',    logo: <NextLogo />,     color: '#ffffff', bg: '#ffffff22' },
        ],
    },
];

const GLOBE_SIZE = 700;
const CX = GLOBE_SIZE / 2;
const CY = GLOBE_SIZE / 2;
const BADGE_SIZE = 52;
const GLOBE_RADIUS = 88;

// ── Globe canvas (3-D wireframe sphere) ────────────────────────────────────────

function GlobeCanvas({ radius = GLOBE_RADIUS }: { radius?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const size = radius * 2 + 4;
        canvas.width = size;
        canvas.height = size;
        const cx = size / 2;
        const cy = size / 2;

        let frameId: number;
        let axialTilt = 0;

        function drawGlobe() {
            ctx!.clearRect(0, 0, size, size);

            // Base sphere fill
            const grad = ctx!.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
            grad.addColorStop(0,   'rgba(40,120,255,0.75)');
            grad.addColorStop(0.45,'rgba(20,80,200,0.65)');
            grad.addColorStop(0.8, 'rgba(5,30,100,0.55)');
            grad.addColorStop(1,   'rgba(0,5,30,0.3)');
            ctx!.beginPath();
            ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx!.fillStyle = grad;
            ctx!.fill();

            // Outer glow ring
            const glowGrad = ctx!.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.35);
            glowGrad.addColorStop(0, 'rgba(0,150,255,0.28)');
            glowGrad.addColorStop(1, 'rgba(0,100,255,0)');
            ctx!.beginPath();
            ctx!.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
            ctx!.fillStyle = glowGrad;
            ctx!.fill();

            // Specular highlight
            const specGrad = ctx!.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, 0, cx - radius * 0.2, cy - radius * 0.2, radius * 0.55);
            specGrad.addColorStop(0, 'rgba(180,220,255,0.45)');
            specGrad.addColorStop(1, 'rgba(100,180,255,0)');
            ctx!.beginPath();
            ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx!.fillStyle = specGrad;
            ctx!.fill();

            ctx!.save();
            ctx!.beginPath();
            ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx!.clip();

            // Latitude lines
            const LATS = 7;
            ctx!.strokeStyle = 'rgba(0,200,255,0.18)';
            ctx!.lineWidth = 0.8;
            for (let i = 1; i < LATS; i++) {
                const lat = (i / LATS) * Math.PI - Math.PI / 2;
                const r = Math.cos(lat) * radius;
                const yOff = Math.sin(lat) * radius;
                ctx!.beginPath();
                ctx!.ellipse(cx, cy + yOff, r, r * 0.28, 0, 0, Math.PI * 2);
                ctx!.stroke();
            }

            // Longitude lines (rotating)
            const LONS = 10;
            ctx!.strokeStyle = 'rgba(0,200,255,0.15)';
            for (let i = 0; i < LONS; i++) {
                const lon = rotRef.current + (i / LONS) * Math.PI;
                ctx!.beginPath();
                ctx!.save();
                ctx!.translate(cx, cy);
                ctx!.rotate(lon);
                ctx!.ellipse(0, 0, radius * Math.abs(Math.cos(lon)), radius, 0, 0, Math.PI * 2);
                ctx!.restore();
                ctx!.stroke();
            }

            // Equator highlight
            ctx!.strokeStyle = 'rgba(0,243,255,0.22)';
            ctx!.lineWidth = 1.2;
            ctx!.beginPath();
            ctx!.ellipse(cx, cy, radius, radius * 0.28, axialTilt, 0, Math.PI * 2);
            ctx!.stroke();

            ctx!.restore();

            // Border
            ctx!.beginPath();
            ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx!.strokeStyle = 'rgba(0,180,255,0.35)';
            ctx!.lineWidth = 1.5;
            ctx!.stroke();

            rotRef.current += 0.006;
            axialTilt += 0.002;
            frameId = requestAnimationFrame(drawGlobe);
        }

        frameId = requestAnimationFrame(drawGlobe);
        return () => cancelAnimationFrame(frameId);
    }, [radius]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: 'block',
                filter: 'drop-shadow(0 0 32px rgba(0,100,255,0.7)) drop-shadow(0 0 80px rgba(0,60,200,0.4))',
            }}
        />
    );
}

// ── Main Globe ────────────────────────────────────────────────────────────────

export function SkillsGlobe() {
    const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
    const anglesRef = useRef<number[]>(RINGS.map((_, i) => (i * Math.PI) / 3));
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const FLAT = RINGS.flatMap((ring, ri) =>
        ring.skills.map((skill, si) => ({
            ring: ri,
            idx: si,
            skill,
            startAngle: (si / ring.skills.length) * Math.PI * 2,
        })),
    );

    useEffect(() => {
        let frameId: number;

        function tick() {
            RINGS.forEach((ring, ri) => {
                anglesRef.current[ri] += ring.speed;
            });

            let flatIdx = 0;
            RINGS.forEach((ring, ri) => {
                ring.skills.forEach(() => {
                    const el = badgeRefs.current[flatIdx];
                    if (el) {
                        const angle = anglesRef.current[ri] + FLAT[flatIdx].startAngle;
                        const tilt = ring.tilt;
                        const cosA = Math.cos(angle);
                        const sinA = Math.sin(angle);
                        const x = CX + cosA * ring.radius - BADGE_SIZE / 2;
                        const y = CY + sinA * ring.radius * Math.cos(tilt) - BADGE_SIZE / 2;
                        const depth = (sinA + 1) / 2;
                        const scale = 0.72 + depth * 0.42;
                        const opacity = 0.55 + depth * 0.45;

                        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                        el.style.opacity   = String(opacity);
                        el.style.zIndex    = String(Math.round(depth * 10));
                    }
                    flatIdx++;
                });
            });

            frameId = requestAnimationFrame(tick);
        }

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, []); // eslint-disable-line

    return (
        <div
            className="relative overflow-visible rounded-3xl"
            style={{ width: '100%', maxWidth: GLOBE_SIZE, height: GLOBE_SIZE, margin: '0 auto' }}
        >
            {/* Ambient background glow */}
            <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,60,200,0.18) 0%, rgba(80,0,180,0.08) 50%, transparent 75%)',
                }}
            />

            {/* SVG orbit path decorations */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width="100%"
                height="100%"
                viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
            >
                {RINGS.map((ring, ri) => {
                    const ry = ring.radius * Math.cos(ring.tilt);
                    return (
                        <ellipse
                            key={ri}
                            cx={CX}
                            cy={CY}
                            rx={ring.radius}
                            ry={ry}
                            fill="none"
                            stroke="rgba(0,200,255,0.10)"
                            strokeWidth="1"
                            strokeDasharray="5 9"
                        />
                    );
                })}
                <line x1={CX} y1={CY - 350} x2={CX} y2={CY + 350} stroke="rgba(0,200,255,0.04)" strokeWidth="1" />
                <line x1={CX - 350} y1={CY} x2={CX + 350} y2={CY} stroke="rgba(0,200,255,0.04)" strokeWidth="1" />
            </svg>

            {/* Badge DOM layer */}
            <div ref={containerRef} className="absolute inset-0">
                {FLAT.map((item, flatIdx) => (
                    <div
                        key={`${item.ring}-${item.idx}`}
                        ref={(el) => { badgeRefs.current[flatIdx] = el; }}
                        className="absolute will-change-transform transition-opacity duration-100"
                        style={{ width: BADGE_SIZE, height: BADGE_SIZE, top: 0, left: 0 }}
                        onMouseEnter={(e) => {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            const parentRect = containerRef.current?.getBoundingClientRect();
                            setTooltip({
                                name: item.skill.name,
                                x: rect.left + rect.width / 2 - (parentRect?.left ?? 0),
                                y: rect.top - (parentRect?.top ?? 0) - 10,
                            });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                    >
                        <div
                            className="w-full h-full rounded-full flex items-center justify-center cursor-pointer select-none hover:scale-125 transition-transform duration-150"
                            style={{
                                background:     item.skill.bg,
                                border:         `1.5px solid ${item.skill.color}88`,
                                boxShadow:      `0 0 10px ${item.skill.color}55, inset 0 0 8px ${item.skill.color}11`,
                                backdropFilter: 'blur(4px)',
                                padding: '6px',
                            }}
                        >
                            {item.skill.logo}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        key={tooltip.name}
                        initial={{ opacity: 0, y: 4, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.88 }}
                        transition={{ duration: 0.15 }}
                        className="absolute pointer-events-none z-50 px-3 py-1.5 rounded-xl text-white text-xs font-semibold whitespace-nowrap"
                        style={{
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: 'translate(-50%, -100%)',
                            background: 'rgba(5,10,31,0.92)',
                            border: '1px solid rgba(0,200,255,0.35)',
                            boxShadow: '0 0 14px rgba(0,200,255,0.25)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {tooltip.name}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Central 3-D Globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
                {[200, 160, 120].map((size, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: size,
                            height: size,
                            border: '1px solid rgba(0,180,255,0.12)',
                            animation: `globe-pulse ${3 + i * 0.8}s ease-in-out ${i * 0.5}s infinite`,
                        }}
                    />
                ))}
                <GlobeCanvas radius={GLOBE_RADIUS} />
            </div>

            {/* Global keyframes */}
            <style>{`
                @keyframes globe-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1);    }
                    50%       { opacity: 0.08; transform: scale(1.06); }
                }
            `}</style>
        </div>
    );
}
