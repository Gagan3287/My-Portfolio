'use client';
import { useEffect, useRef, useCallback } from 'react';

function drawWavingAvatar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    scale: number,
    time: number,
    waveProgress: number, // 0 = not waving, 1 = full wave
) {
    const s = scale;

    // ── Shadow base
    ctx.save();
    ctx.shadowBlur = 40 * s;
    ctx.shadowColor = 'rgba(168,85,247,0.4)';

    // ── Body / Hoodie
    const bodyGrad = ctx.createRadialGradient(cx, cy + 30 * s, 10 * s, cx, cy + 30 * s, 80 * s);
    bodyGrad.addColorStop(0, '#2d1b69');
    bodyGrad.addColorStop(0.5, '#1e1040');
    bodyGrad.addColorStop(1, '#0f0820');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 60 * s, 38 * s, 44 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Waving Arm (right)
    if (waveProgress > 0) {
        const waveAngle = -Math.PI / 2 - Math.PI / 8 + Math.sin(time * 6) * (Math.PI / 5) * waveProgress;
        const armStartX = cx + 28 * s;
        const armStartY = cy + 32 * s;
        const armLen = 30 * s;
        const armEndX = armStartX + Math.cos(waveAngle) * armLen;
        const armEndY = armStartY + Math.sin(waveAngle) * armLen;

        ctx.save();
        ctx.strokeStyle = '#e8c090';
        ctx.lineWidth = 10 * s;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 8 * s;
        ctx.shadowColor = 'rgba(168,85,247,0.4)';
        ctx.beginPath();
        ctx.moveTo(armStartX, armStartY);
        ctx.lineTo(armEndX, armEndY);
        ctx.stroke();

        // Hand
        ctx.fillStyle = '#e8c090';
        ctx.beginPath();
        ctx.arc(armEndX, armEndY, 7 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Left arm at rest
    ctx.save();
    ctx.strokeStyle = '#2d1b69';
    ctx.lineWidth = 10 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 28 * s, cy + 32 * s);
    ctx.lineTo(cx - 36 * s, cy + 60 * s);
    ctx.stroke();
    ctx.restore();

    // ── Neck
    const neckGrad = ctx.createLinearGradient(cx - 8 * s, cy + 18 * s, cx + 8 * s, cy + 18 * s);
    neckGrad.addColorStop(0, '#c8a882');
    neckGrad.addColorStop(0.5, '#e8c99a');
    neckGrad.addColorStop(1, '#c8a882');
    ctx.fillStyle = neckGrad;
    ctx.beginPath();
    ctx.roundRect(cx - 7 * s, cy + 16 * s, 14 * s, 16 * s, 4 * s);
    ctx.fill();

    // ── Head
    ctx.save();
    ctx.shadowBlur = 20 * s;
    ctx.shadowColor = 'rgba(168,85,247,0.2)';
    const faceGrad = ctx.createRadialGradient(cx - 5 * s, cy - 6 * s, 3 * s, cx, cy, 28 * s);
    faceGrad.addColorStop(0, '#f5d5a5');
    faceGrad.addColorStop(0.6, '#e8c090');
    faceGrad.addColorStop(1, '#c8953c');
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 28 * s, 30 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Hair
    ctx.save();
    const hairGrad = ctx.createLinearGradient(cx, cy - 30 * s, cx, cy - 8 * s);
    hairGrad.addColorStop(0, '#1a0a3c');
    hairGrad.addColorStop(1, '#3b1d8c');
    ctx.fillStyle = hairGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 18 * s, 26 * s, 16 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 16 * s, cy - 10 * s, 10 * s, 18 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx - 16 * s, cy - 10 * s, 10 * s, 18 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Glasses
    ctx.save();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2 * s;
    ctx.shadowBlur = 8 * s;
    ctx.shadowColor = '#a855f7';
    ctx.beginPath();
    ctx.roundRect(cx - 24 * s, cy - 8 * s, 19 * s, 14 * s, 4 * s);
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(cx + 5 * s, cy - 8 * s, 19 * s, 14 * s, 4 * s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 5 * s, cy - 1 * s);
    ctx.lineTo(cx + 5 * s, cy - 1 * s);
    ctx.stroke();
    ctx.restore();

    // ── Eyes
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.ellipse(cx - 14 * s, cy, 5 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 14 * s, cy, 5 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Irises
    [[cx - 14 * s, cy], [cx + 14 * s, cy]].forEach(([ex, ey]) => {
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.arc(ex, ey, 3 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0a0015';
        ctx.beginPath();
        ctx.arc(ex, ey, 1.8 * s, 0, Math.PI * 2);
        ctx.fill();
    });

    // ── Nose
    ctx.save();
    ctx.strokeStyle = '#c8953c'; // matching shadow face tone
    ctx.lineWidth = 1.8 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy + 5 * s);
    ctx.quadraticCurveTo(cx + 3 * s, cy + 10 * s, cx, cy + 12 * s);
    ctx.stroke();
    ctx.restore();

    // ── Big happy smile when waving
    ctx.save();
    ctx.strokeStyle = '#c8953c';
    ctx.lineWidth = 2 * s;
    ctx.lineCap = 'round';
    const smileAmount = 0.1 + waveProgress * 0.2;
    ctx.beginPath();
    ctx.arc(cx, cy + 16 * s, 9 * s, smileAmount, Math.PI - smileAmount);
    ctx.stroke();

    if (waveProgress > 0.5) {
        // Eyes squint with happiness
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 2 * s;
        ctx.beginPath();
        ctx.arc(cx - 14 * s, cy - 2 * s, 4 * s, Math.PI, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 14 * s, cy - 2 * s, 4 * s, Math.PI, 0);
        ctx.stroke();
    }
    ctx.restore();

    // ── "Bye!" speech bubble
    if (waveProgress > 0.6) {
        const bubbleX = cx + 42 * s;
        const bubbleY = cy - 28 * s;
        const bubbleAlpha = (waveProgress - 0.6) / 0.4;

        ctx.save();
        ctx.globalAlpha = bubbleAlpha;
        ctx.fillStyle = 'rgba(15,8,32,0.85)';
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1.5 * s;
        ctx.shadowBlur = 10 * s;
        ctx.shadowColor = '#a855f7';
        ctx.beginPath();
        ctx.roundRect(bubbleX - 22 * s, bubbleY - 12 * s, 44 * s, 22 * s, 6 * s);
        ctx.fill();
        ctx.stroke();

        // Bubble tail pointing left-down
        ctx.beginPath();
        ctx.moveTo(bubbleX - 10 * s, bubbleY + 8 * s);
        ctx.lineTo(bubbleX - 20 * s, bubbleY + 16 * s);
        ctx.lineTo(bubbleX - 4 * s, bubbleY + 8 * s);
        ctx.fill();

        ctx.fillStyle = '#c084fc';
        ctx.font = `bold ${11 * s}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Bye! 👋', bubbleX, bubbleY);
        ctx.restore();
    }

    // ── Ground shadow
    ctx.save();
    ctx.globalAlpha = 0.12;
    const groundGrad = ctx.createRadialGradient(cx, cy + 100 * s, 0, cx, cy + 100 * s, 60 * s);
    groundGrad.addColorStop(0, '#a855f7');
    groundGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = groundGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 105 * s, 50 * s, 14 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

export default function FooterAvatar() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    // Walk + wave progress driven by scroll
    const walkProgressRef = useRef(0); // 0 = off-screen right, 1 = centered
    const waveProgressRef = useRef(0); // 0 = no wave, 1 = full wave
    const targetWalkRef = useRef(0);
    const targetWaveRef = useRef(0);

    // Observe footer visibility using IntersectionObserver
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const ratio = entries[0].intersectionRatio;
                targetWalkRef.current = Math.min(1, ratio * 2);
                targetWaveRef.current = ratio > 0.6 ? (ratio - 0.6) / 0.4 : 0;
            },
            { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
        );

        observer.observe(canvas);
        return () => observer.disconnect();
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const t = (timeRef.current += 0.016);

        ctx.clearRect(0, 0, W, H);

        // Smooth lerp towards targets
        walkProgressRef.current += (targetWalkRef.current - walkProgressRef.current) * 0.06;
        waveProgressRef.current += (targetWaveRef.current - waveProgressRef.current) * 0.06;

        const scale = H / 220;
        // Walk in from right: when walkProgress=0 → avatar is off-screen right
        const cx = W * 0.5 + (1 - walkProgressRef.current) * W * 0.8;
        const cy = H * 0.44;

        // Slight up/down walking bob
        const walkBob = walkProgressRef.current < 0.95
            ? Math.sin(t * 8) * 4 * walkProgressRef.current * scale
            : 0;

        drawWavingAvatar(ctx, cx, cy + walkBob, scale, t, waveProgressRef.current);

        animRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const resize = () => {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
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
            aria-label="Developer avatar waving goodbye"
            style={{ display: 'block', width: '100%', height: '100%' }}
        />
    );
}
