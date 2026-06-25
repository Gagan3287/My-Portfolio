'use client';
import { useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MousePos {
    x: number;
    y: number;
}

interface Orb {
    angle: number;
    speed: number;
    radiusX: number;
    radiusY: number;
    phase: number;
    size: number;
    color: string;
    opacity: number;
    yOffset: number;
}

interface TrailPoint {
    x: number;
    y: number;
    age: number; // 0 = fresh, 1 = dead
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ORB_COLORS = [
    '#a855f7', // purple-500
    '#d946ef', // fuchsia-500
    '#ec4899', // pink-500
    '#8b5cf6', // violet-500
    '#c084fc', // purple-400
    '#e879f9', // fuchsia-400
    '#f472b6', // pink-400
    '#7c3aed', // violet-600
];

const TRAIL_LENGTH = 28;
const TRAIL_FADE_SPEED = 0.045;
const SPHERE_RADIUS = 44;
const SPHERE_FOLLOW_SPEED = 0.055;
const SPHERE_BOB_AMPLITUDE = 18;
const SPHERE_BOB_SPEED = 0.9;

// ─── Drawing helpers ──────────────────────────────────────────────────────────

function drawGlow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
    alpha: number,
    blurLayers = 4,
) {
    for (let i = blurLayers; i > 0; i--) {
        ctx.save();
        ctx.globalAlpha = (alpha / blurLayers) * 0.6;
        ctx.shadowBlur = radius * i * 1.4;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawAvatar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    scale: number,
    time: number,
    mouseAngleX: number,
    mouseAngleY: number,
    breathY: number,
) {
    const s = scale;

    // ── Shadow base ──────────────────────────────────────────────────────────
    ctx.save();
    ctx.shadowBlur = 60 * s;
    ctx.shadowColor = 'rgba(168,85,247,0.35)';

    // ── Body / Hoodie ────────────────────────────────────────────────────────
    const bodyX = cx + mouseAngleX * 6 * s;
    const bodyY = cy + breathY * s + mouseAngleY * 4 * s;

    // Hoodie body
    const bodyGrad = ctx.createRadialGradient(
        bodyX, bodyY + 30 * s, 10 * s,
        bodyX, bodyY + 30 * s, 90 * s,
    );
    bodyGrad.addColorStop(0, '#2d1b69');
    bodyGrad.addColorStop(0.5, '#1e1040');
    bodyGrad.addColorStop(1, '#0f0820');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(bodyX, bodyY + 88 * s, 52 * s, 58 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hoodie highlight stripe
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2 * s;
    ctx.shadowBlur = 8 * s;
    ctx.shadowColor = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(bodyX - 6 * s, bodyY + 52 * s);
    ctx.lineTo(bodyX - 6 * s, bodyY + 130 * s);
    ctx.stroke();
    ctx.restore();

    // Hoodie pocket
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath();
    ctx.roundRect(bodyX - 22 * s, bodyY + 90 * s, 44 * s, 26 * s, 8 * s);
    ctx.fill();
    ctx.restore();

    // Neck
    const neckGrad = ctx.createLinearGradient(bodyX - 10 * s, bodyY + 42 * s, bodyX + 10 * s, bodyY + 42 * s);
    neckGrad.addColorStop(0, '#c8a882');
    neckGrad.addColorStop(0.5, '#e8c99a');
    neckGrad.addColorStop(1, '#c8a882');
    ctx.fillStyle = neckGrad;
    ctx.beginPath();
    ctx.roundRect(bodyX - 10 * s, bodyY + 40 * s, 20 * s, 22 * s, 5 * s);
    ctx.fill();

    ctx.restore();

    // ── Head ─────────────────────────────────────────────────────────────────
    const headX = cx + mouseAngleX * 10 * s;
    const headY = cy + breathY * s * 0.5 + mouseAngleY * 6 * s - 10 * s;

    // Head shadow / glow
    ctx.save();
    ctx.shadowBlur = 30 * s;
    ctx.shadowColor = 'rgba(168,85,247,0.2)';

    // Skin
    const faceGrad = ctx.createRadialGradient(
        headX - 6 * s, headY - 8 * s, 4 * s,
        headX, headY, 38 * s,
    );
    faceGrad.addColorStop(0, '#f5d5a5');
    faceGrad.addColorStop(0.6, '#e8c090');
    faceGrad.addColorStop(1, '#c8953c');
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.ellipse(headX, headY, 38 * s, 42 * s, mouseAngleX * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Hair
    ctx.save();
    ctx.shadowBlur = 0;
    const hairGrad = ctx.createLinearGradient(headX, headY - 42 * s, headX, headY - 10 * s);
    hairGrad.addColorStop(0, '#1a0a3c');
    hairGrad.addColorStop(1, '#3b1d8c');
    ctx.fillStyle = hairGrad;
    // Hair top
    ctx.beginPath();
    ctx.ellipse(headX, headY - 28 * s, 36 * s, 22 * s, mouseAngleX * 0.05, 0, Math.PI * 2);
    ctx.fill();
    // Hair side tuft
    ctx.beginPath();
    ctx.ellipse(headX + 22 * s, headY - 14 * s, 14 * s, 26 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(headX - 22 * s, headY - 14 * s, 14 * s, 26 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Glasses ───────────────────────────────────────────────────────────────
    const glassesX = headX;
    const glassesY = headY;
    const eyeOffsetX = mouseAngleX * 4 * s;
    const eyeOffsetY = mouseAngleY * 3 * s;

    // Frame
    ctx.save();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2.5 * s;
    ctx.shadowBlur = 10 * s;
    ctx.shadowColor = '#a855f7';

    // Left lens
    ctx.beginPath();
    ctx.roundRect(glassesX - 32 * s, glassesY - 10 * s, 26 * s, 20 * s, 6 * s);
    ctx.stroke();
    // Right lens
    ctx.beginPath();
    ctx.roundRect(glassesX + 6 * s, glassesY - 10 * s, 26 * s, 20 * s, 6 * s);
    ctx.stroke();
    // Bridge
    ctx.beginPath();
    ctx.moveTo(glassesX - 6 * s, glassesY);
    ctx.lineTo(glassesX + 6 * s, glassesY);
    ctx.stroke();
    // Temples
    ctx.beginPath();
    ctx.moveTo(glassesX - 32 * s, glassesY);
    ctx.lineTo(glassesX - 40 * s, glassesY + 2 * s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(glassesX + 32 * s, glassesY);
    ctx.lineTo(glassesX + 40 * s, glassesY + 2 * s);
    ctx.stroke();

    // Lens tint
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.roundRect(glassesX - 32 * s, glassesY - 10 * s, 26 * s, 20 * s, 6 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(glassesX + 6 * s, glassesY - 10 * s, 26 * s, 20 * s, 6 * s);
    ctx.fill();
    ctx.restore();

    // Eyes (whites + irises + pupils)
    const leftEyeCX = glassesX - 19 * s;
    const rightEyeCX = glassesX + 19 * s;
    const eyeCY = glassesY + 1 * s;

    // Whites
    ctx.save();
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.ellipse(leftEyeCX, eyeCY, 7 * s, 7 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(rightEyeCX, eyeCY, 7 * s, 7 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Iris + Pupil
    const irisColors = ['#7c3aed', '#5b21b6'];
    [[leftEyeCX, eyeCY], [rightEyeCX, eyeCY]].forEach(([ex, ey], idx) => {
        const px = (ex as number) + eyeOffsetX * 0.8;
        const py = (ey as number) + eyeOffsetY * 0.8;
        // Iris
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 4.5 * s, 0, Math.PI * 2);
        ctx.fillStyle = irisColors[idx];
        ctx.shadowBlur = 6 * s;
        ctx.shadowColor = '#a855f7';
        ctx.fill();
        ctx.restore();
        // Pupil
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.5 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#0a0015';
        ctx.fill();
        ctx.restore();
        // Catchlight
        ctx.save();
        ctx.beginPath();
        ctx.arc(px - 1.2 * s, py - 1.2 * s, 1 * s, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fill();
        ctx.restore();
    });

    // Eyebrows
    ctx.save();
    ctx.strokeStyle = '#3b1d8c';
    ctx.lineWidth = 2.5 * s;
    ctx.lineCap = 'round';
    // Left brow — slight raise on mouse movement
    const browRaise = mouseAngleY * 3 * s;
    ctx.beginPath();
    ctx.moveTo(leftEyeCX - 8 * s, eyeCY - 13 * s - browRaise);
    ctx.quadraticCurveTo(leftEyeCX, eyeCY - 16 * s - browRaise, leftEyeCX + 8 * s, eyeCY - 13 * s - browRaise);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightEyeCX - 8 * s, eyeCY - 13 * s - browRaise);
    ctx.quadraticCurveTo(rightEyeCX, eyeCY - 16 * s - browRaise, rightEyeCX + 8 * s, eyeCY - 13 * s - browRaise);
    ctx.stroke();
    ctx.restore();

    // Nose
    ctx.save();
    ctx.strokeStyle = '#c8953c'; // solid shadow face tone
    ctx.lineWidth = 1.8 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(headX + eyeOffsetX * 0.3, headY + 8 * s + eyeOffsetY * 0.3);
    ctx.quadraticCurveTo(headX + 6 * s + eyeOffsetX * 0.3, headY + 18 * s, headX + eyeOffsetX * 0.3, headY + 20 * s);
    ctx.stroke();
    ctx.restore();

    // Smile
    ctx.save();
    ctx.strokeStyle = '#c8953c';
    ctx.lineWidth = 2 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(headX + eyeOffsetX * 0.2, headY + 24 * s + eyeOffsetY * 0.2, 10 * s, 0.1, Math.PI - 0.1);
    ctx.stroke();
    ctx.restore();

    // Cheek blush
    ctx.save();
    ctx.globalAlpha = 0.18;
    const blushL = ctx.createRadialGradient(headX - 24 * s, headY + 12 * s, 0, headX - 24 * s, headY + 12 * s, 13 * s);
    blushL.addColorStop(0, '#ff9a9e');
    blushL.addColorStop(1, 'transparent');
    ctx.fillStyle = blushL;
    ctx.beginPath();
    ctx.ellipse(headX - 24 * s, headY + 12 * s, 13 * s, 8 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    const blushR = ctx.createRadialGradient(headX + 24 * s, headY + 12 * s, 0, headX + 24 * s, headY + 12 * s, 13 * s);
    blushR.addColorStop(0, '#ff9a9e');
    blushR.addColorStop(1, 'transparent');
    ctx.fillStyle = blushR;
    ctx.beginPath();
    ctx.ellipse(headX + 24 * s, headY + 12 * s, 13 * s, 8 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Floating code tag above head ─────────────────────────────────────────
    const tagY = headY - 58 * s + Math.sin(time * 1.2) * 4 * s;
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = 'rgba(15,8,32,0.8)';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1 * s;
    ctx.shadowBlur = 12 * s;
    ctx.shadowColor = '#a855f7';
    ctx.beginPath();
    ctx.roundRect(headX - 48 * s, tagY - 12 * s, 96 * s, 22 * s, 6 * s);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#c084fc';
    ctx.font = `bold ${12 * s}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('< Developer />', headX, tagY);
    ctx.restore();

    // ── Laptop on lap ────────────────────────────────────────────────────────
    const lapX = bodyX;
    const lapY = bodyY + 118 * s;

    ctx.save();
    ctx.shadowBlur = 20 * s;
    ctx.shadowColor = '#00f5ff';

    // Screen
    const screenGrad = ctx.createLinearGradient(lapX - 30 * s, lapY - 22 * s, lapX + 30 * s, lapY - 22 * s);
    screenGrad.addColorStop(0, '#0d0d1a');
    screenGrad.addColorStop(1, '#1a0a3c');
    ctx.fillStyle = screenGrad;
    ctx.beginPath();
    ctx.roundRect(lapX - 32 * s, lapY - 32 * s, 64 * s, 28 * s, 4 * s);
    ctx.fill();

    // Screen glow border
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.2 * s;
    ctx.shadowBlur = 8 * s;
    ctx.shadowColor = '#06b6d4';
    ctx.stroke();

    // Code lines on screen
    const lineColors = ['#a855f7', '#00f5ff', '#10b981', '#f59e0b'];
    for (let li = 0; li < 4; li++) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = lineColors[li];
        const lineW = (Math.sin(time * 0.5 + li * 1.2) * 0.3 + 0.7) * (16 + li * 4) * s;
        ctx.beginPath();
        ctx.roundRect(lapX - 26 * s + li * 2 * s, lapY - 27 * s + li * 6 * s, lineW, 2 * s, 1 * s);
        ctx.fill();
        ctx.restore();
    }

    // Keyboard base
    const kbGrad = ctx.createLinearGradient(lapX - 32 * s, lapY - 4 * s, lapX + 32 * s, lapY + 4 * s);
    kbGrad.addColorStop(0, '#1e1040');
    kbGrad.addColorStop(1, '#2d1b69');
    ctx.fillStyle = kbGrad;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.roundRect(lapX - 32 * s, lapY - 4 * s, 64 * s, 10 * s, [0, 0, 4 * s, 4 * s]);
    ctx.fill();
    ctx.restore();
}

function drawOrb(
    ctx: CanvasRenderingContext2D,
    orb: Orb,
    cx: number,
    cy: number,
    scale: number,
    time: number,
) {
    const angle = orb.angle + time * orb.speed + orb.phase;
    const x = cx + Math.cos(angle) * orb.radiusX * scale;
    const y = cy + Math.sin(angle) * orb.radiusY * scale + orb.yOffset * scale;
    const r = orb.size * scale;

    // Outer bloom
    ctx.save();
    ctx.globalAlpha = orb.opacity * 0.3;
    ctx.shadowBlur = r * 6;
    ctx.shadowColor = orb.color;
    ctx.fillStyle = orb.color;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.globalAlpha = orb.opacity;
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    grad.addColorStop(0, 'white');
    grad.addColorStop(0.3, orb.color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.shadowBlur = r * 3;
    ctx.shadowColor = orb.color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawGlowingSphere(
    ctx: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    scale: number,
    time: number,
    trail: TrailPoint[],
) {
    const r = SPHERE_RADIUS * scale;

    // Energy trail
    ctx.save();
    for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const progress = 1 - t.age;
        const trailR = r * 0.4 * progress;
        if (trailR < 1) continue;
        ctx.globalAlpha = progress * 0.35;
        ctx.shadowBlur = trailR * 4;
        ctx.shadowColor = '#a855f7';
        const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, trailR);
        g.addColorStop(0, '#d946ef');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(t.x, t.y, trailR, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();

    // Outer ambient glow ring
    ctx.save();
    ctx.globalAlpha = 0.15 + 0.06 * Math.sin(time * 1.5);
    ctx.shadowBlur = r * 2.5;
    ctx.shadowColor = '#7c3aed';
    const outerGrad = ctx.createRadialGradient(sx, sy, r * 0.6, sx, sy, r * 2.2);
    outerGrad.addColorStop(0, 'rgba(168,85,247,0.4)');
    outerGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.arc(sx, sy, r * 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Sphere body
    ctx.save();
    ctx.shadowBlur = r * 1.8;
    ctx.shadowColor = '#a855f7';
    const sphereGrad = ctx.createRadialGradient(
        sx - r * 0.35, sy - r * 0.35, r * 0.05,
        sx, sy, r,
    );
    sphereGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
    sphereGrad.addColorStop(0.2, '#d8b4fe');
    sphereGrad.addColorStop(0.55, '#a855f7');
    sphereGrad.addColorStop(0.85, '#5b21b6');
    sphereGrad.addColorStop(1, '#2e1065');
    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Inner refraction / shimmer
    ctx.save();
    ctx.globalAlpha = 0.22 + 0.1 * Math.sin(time * 2.3 + 1);
    const shimmerGrad = ctx.createRadialGradient(sx + r * 0.2, sy + r * 0.25, 0, sx + r * 0.2, sy + r * 0.25, r * 0.65);
    shimmerGrad.addColorStop(0, 'rgba(255,255,255,0.6)');
    shimmerGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = shimmerGrad;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Specular highlight
    ctx.save();
    ctx.globalAlpha = 0.7;
    const hiGrad = ctx.createRadialGradient(
        sx - r * 0.38, sy - r * 0.35, 0,
        sx - r * 0.38, sy - r * 0.35, r * 0.42,
    );
    hiGrad.addColorStop(0, 'rgba(255,255,255,0.95)');
    hiGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = hiGrad;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Floating rune ring around sphere
    ctx.save();
    ctx.globalAlpha = 0.18 + 0.06 * Math.sin(time);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5 * scale;
    ctx.shadowBlur = 10 * scale;
    ctx.shadowColor = '#a855f7';
    ctx.beginPath();
    ctx.ellipse(sx, sy, r * 1.6, r * 0.45, time * 0.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

// ─── Main component ───────────────────────────────────────────────────────────

interface AvatarCanvasProps {
    mousePos: MousePos;
    containerRect: DOMRect | null;
}

export default function AvatarCanvas({ mousePos, containerRect }: AvatarCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);
    const trailRef = useRef<TrailPoint[]>([]);

    // Sphere state (smooth lerp)
    const sphereRef = useRef({ x: 0, y: 0 });
    const sphereTargetRef = useRef({ x: 0, y: 0 });
    const sphereInitRef = useRef(false);

    // Mouse angles for avatar (smooth lerp)
    const angleRef = useRef({ x: 0, y: 0 });
    const angleTargetRef = useRef({ x: 0, y: 0 });

    // Orbs (created once)
    const orbsRef = useRef<Orb[]>([]);

    // Build orbs on mount
    useEffect(() => {
        orbsRef.current = Array.from({ length: 10 }, (_, i) => ({
            angle: (i / 10) * Math.PI * 2,
            speed: 0.18 + Math.random() * 0.22,
            radiusX: 75 + Math.random() * 55,
            radiusY: 38 + Math.random() * 32,
            phase: Math.random() * Math.PI * 2,
            size: 3.5 + Math.random() * 4,
            color: ORB_COLORS[i % ORB_COLORS.length],
            opacity: 0.55 + Math.random() * 0.35,
            yOffset: (Math.random() - 0.5) * 30,
        }));
    }, []);

    // Update mouse angle target
    useEffect(() => {
        if (!containerRect) return;
        const canvasEl = canvasRef.current;
        if (!canvasEl) return;
        const rect = canvasEl.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.45;
        const dx = mousePos.x - cx;
        const dy = mousePos.y - cy;
        const maxD = Math.max(rect.width, rect.height) * 0.5;
        angleTargetRef.current = {
            x: Math.max(-1, Math.min(1, dx / maxD)),
            y: Math.max(-1, Math.min(1, dy / maxD)),
        };

        // Sphere target: follow mouse when close to it
        const sphereInitX = rect.left + rect.width * 0.75;
        const sphereInitY = rect.top + rect.height * 0.28;
        const distToSphere = Math.hypot(mousePos.x - sphereInitX, mousePos.y - sphereInitY);
        if (distToSphere < 180) {
            // Pull toward cursor
            const pull = 1 - distToSphere / 180;
            sphereTargetRef.current = {
                x: sphereRef.current.x + (mousePos.x - sphereInitX) * pull * 0.35,
                y: sphereRef.current.y + (mousePos.y - sphereInitY) * pull * 0.35,
            };
        }
    }, [mousePos, containerRect]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const t = (timeRef.current += 0.016);

        // Clear
        ctx.clearRect(0, 0, W, H);

        // Lerp angles
        const ar = angleRef.current;
        const at = angleTargetRef.current;
        ar.x += (at.x - ar.x) * 0.06;
        ar.y += (at.y - ar.y) * 0.06;

        const scale = Math.min(W, H) / 380;
        const avatarCX = W * 0.44;
        const avatarCY = H * 0.50;

        // Breathing
        const breathY = Math.sin(t * 0.85) * 5;

        // ── Ambient ground glow ───────────────────────────────────────────────
        ctx.save();
        ctx.globalAlpha = 0.08;
        const groundGrad = ctx.createRadialGradient(avatarCX, avatarCY + 120 * scale, 0, avatarCX, avatarCY + 120 * scale, 130 * scale);
        groundGrad.addColorStop(0, '#a855f7');
        groundGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = groundGrad;
        ctx.beginPath();
        ctx.ellipse(avatarCX, avatarCY + 140 * scale, 90 * scale, 25 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // ── Orbs ─────────────────────────────────────────────────────────────
        for (const orb of orbsRef.current) {
            drawOrb(ctx, orb, avatarCX, avatarCY, scale, t);
        }

        // ── Avatar ───────────────────────────────────────────────────────────
        drawAvatar(ctx, avatarCX, avatarCY, scale, t, ar.x, ar.y, breathY);

        // ── Glowing sphere ────────────────────────────────────────────────────
        const sphereBobY = Math.sin(t * SPHERE_BOB_SPEED) * SPHERE_BOB_AMPLITUDE * scale;

        // Init sphere center
        if (!sphereInitRef.current) {
            sphereRef.current = { x: W * 0.80, y: H * 0.28 };
            sphereTargetRef.current = { x: W * 0.80, y: H * 0.28 };
            sphereInitRef.current = true;
        }

        // Lerp sphere toward target (spring back to resting X)
        const restX = W * 0.80;
        const restY = H * 0.28;
        sphereTargetRef.current.x += (restX - sphereTargetRef.current.x) * 0.012;
        sphereTargetRef.current.y += (restY - sphereTargetRef.current.y) * 0.012;
        sphereRef.current.x += (sphereTargetRef.current.x - sphereRef.current.x) * SPHERE_FOLLOW_SPEED;
        sphereRef.current.y += (sphereTargetRef.current.y - sphereRef.current.y) * SPHERE_FOLLOW_SPEED;

        const sx = sphereRef.current.x;
        const sy = sphereRef.current.y + sphereBobY;

        // Update trail
        trailRef.current.unshift({ x: sx, y: sy, age: 0 });
        if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.pop();
        trailRef.current.forEach((p) => { p.age = Math.min(1, p.age + TRAIL_FADE_SPEED); });

        drawGlowingSphere(ctx, sx, sy, scale, t, trailRef.current);

        // ── Floating particles (tiny) ─────────────────────────────────────────
        for (let pi = 0; pi < 6; pi++) {
            const px = avatarCX + Math.sin(t * 0.7 + pi * 1.1) * 80 * scale;
            const py = avatarCY - 60 * scale + Math.cos(t * 0.9 + pi * 0.8) * 50 * scale;
            const ps = (1 + Math.sin(t + pi) * 0.5) * scale;
            drawGlow(ctx, px, py, ps * 3, ORB_COLORS[pi % ORB_COLORS.length], 0.6 + 0.4 * Math.sin(t + pi), 2);
        }

        animRef.current = requestAnimationFrame(draw);
    }, []);

    // Resize + start loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const resize = () => {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            // Reset sphere init so it re-centers on resize
            sphereInitRef.current = false;
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(parent);
        animRef.current = requestAnimationFrame(draw);

        return () => {
            ro.disconnect();
            cancelAnimationFrame(animRef.current);
        };
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className="avatar-canvas"
            aria-label="Interactive 3D developer avatar"
        />
    );
}
