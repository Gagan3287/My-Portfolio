'use client';
import { useEffect, useRef, useCallback, useState } from 'react';

// ── Drawing helpers ────────────────────────────────────────────────────────────

function drawMiniAvatar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    s: number,          // scale
    time: number,
    walkPhase: number,  // used for leg swing
    isWalking: boolean,
    direction: number,  // 1 = right, -1 = left
    isIdle: boolean,    // true = gentle breathe
) {
    ctx.save();
    // flip horizontally if walking left
    if (direction < 0) {
        ctx.translate(cx * 2, 0);
        ctx.scale(-1, 1);
    }

    const breathe = isIdle ? Math.sin(time * 0.9) * 2 * s : 0;

    // ── Legs ──────────────────────────────────────────────────────────────────
    const legSwing = isWalking ? Math.sin(walkPhase) * 14 * s : 0;

    // Left leg
    ctx.save();
    ctx.strokeStyle = '#1e1040';
    ctx.lineWidth = 8 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 8 * s, cy + 42 * s + breathe);
    ctx.lineTo(cx - 10 * s + legSwing, cy + 62 * s);
    ctx.stroke();
    ctx.restore();

    // Right leg
    ctx.save();
    ctx.strokeStyle = '#1e1040';
    ctx.lineWidth = 8 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + 8 * s, cy + 42 * s + breathe);
    ctx.lineTo(cx + 10 * s - legSwing, cy + 62 * s);
    ctx.stroke();
    ctx.restore();

    // ── Body / Hoodie ─────────────────────────────────────────────────────────
    const bodyGrad = ctx.createRadialGradient(
        cx, cy + 22 * s, 4 * s,
        cx, cy + 22 * s, 42 * s,
    );
    bodyGrad.addColorStop(0, '#2d1b69');
    bodyGrad.addColorStop(0.5, '#1e1040');
    bodyGrad.addColorStop(1, '#0f0820');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 28 * s + breathe * 0.5, 22 * s, 24 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Arm swing
    const armSwing = isWalking ? -Math.sin(walkPhase) * 14 * s : 0;

    // Left arm
    ctx.save();
    ctx.strokeStyle = '#2d1b69';
    ctx.lineWidth = 7 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 18 * s, cy + 16 * s + breathe);
    ctx.lineTo(cx - 22 * s + armSwing, cy + 34 * s);
    ctx.stroke();
    ctx.restore();

    // Right arm
    ctx.save();
    ctx.strokeStyle = '#2d1b69';
    ctx.lineWidth = 7 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + 18 * s, cy + 16 * s + breathe);
    ctx.lineTo(cx + 22 * s - armSwing, cy + 34 * s);
    ctx.stroke();
    ctx.restore();

    // ── Neck ──────────────────────────────────────────────────────────────────
    ctx.fillStyle = '#e8c99a';
    ctx.beginPath();
    ctx.roundRect(cx - 5 * s, cy + 5 * s + breathe, 10 * s, 10 * s, 3 * s);
    ctx.fill();

    // ── Head ──────────────────────────────────────────────────────────────────
    const headBob = isWalking ? Math.abs(Math.sin(walkPhase)) * -2 * s : 0;

    ctx.save();
    ctx.shadowBlur = 14 * s;
    ctx.shadowColor = 'rgba(168,85,247,0.3)';
    const faceGrad = ctx.createRadialGradient(
        cx - 3 * s, cy - 8 * s + breathe + headBob, 2 * s,
        cx, cy - 5 * s + breathe + headBob, 18 * s,
    );
    faceGrad.addColorStop(0, '#f5d5a5');
    faceGrad.addColorStop(0.6, '#e8c090');
    faceGrad.addColorStop(1, '#c8953c');
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 5 * s + breathe + headBob, 18 * s, 20 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Hair
    ctx.save();
    const hairGrad = ctx.createLinearGradient(cx, cy - 24 * s, cx, cy - 5 * s);
    hairGrad.addColorStop(0, '#1a0a3c');
    hairGrad.addColorStop(1, '#3b1d8c');
    ctx.fillStyle = hairGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 15 * s + breathe + headBob, 17 * s, 10 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 10 * s, cy - 8 * s + breathe + headBob, 7 * s, 12 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx - 10 * s, cy - 8 * s + breathe + headBob, 7 * s, 12 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Glasses
    const gy = cy - 6 * s + breathe + headBob;
    ctx.save();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5 * s;
    ctx.shadowBlur = 6 * s;
    ctx.shadowColor = '#a855f7';
    ctx.beginPath();
    ctx.roundRect(cx - 16 * s, gy - 5 * s, 12 * s, 9 * s, 3 * s);
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(cx + 4 * s, gy - 5 * s, 12 * s, 9 * s, 3 * s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 4 * s, gy);
    ctx.lineTo(cx + 4 * s, gy);
    ctx.stroke();
    ctx.restore();

    // Eyes — simple white + iris
    [[cx - 10 * s, gy + 1 * s], [cx + 10 * s, gy + 1 * s]].forEach(([ex, ey]) => {
        ctx.fillStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.arc(ex, ey, 3 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.arc(ex, ey, 1.8 * s, 0, Math.PI * 2);
        ctx.fill();
    });

    // Smile
    ctx.save();
    ctx.strokeStyle = '#c8953c';
    ctx.lineWidth = 1.5 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy + 2 * s + breathe + headBob, 5 * s, 0.1, Math.PI - 0.1);
    ctx.stroke();
    ctx.restore();

    // ── Ground shadow ─────────────────────────────────────────────────────────
    ctx.save();
    ctx.globalAlpha = 0.18;
    const gs = ctx.createRadialGradient(cx, cy + 65 * s, 0, cx, cy + 65 * s, 24 * s);
    gs.addColorStop(0, '#a855f7');
    gs.addColorStop(1, 'transparent');
    ctx.fillStyle = gs;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 66 * s, 20 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore(); // pop flip transform
}

// ── Companion Component ────────────────────────────────────────────────────────

export default function FloatingCompanion() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);
    const walkPhaseRef = useRef(0);

    // Scroll tracking
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);   // positive = scrolling down, negative = up
    const isWalkingRef = useRef(false);
    const directionRef = useRef(1);     // 1 right, -1 left

    // Position of companion (screen coordinates)
    const posXRef = useRef(-120); // start off-screen
    const targetXRef = useRef(0);
    const posYRef = useRef(0);

    // Whether intro walk-in has happened
    const walkedInRef = useRef(false);

    // Tooltip state
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Slightly delay the walk-in
        const t = setTimeout(() => {
            walkedInRef.current = true;
        }, 800);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const sy = window.scrollY;
            scrollVelocity.current = sy - lastScrollY.current;
            lastScrollY.current = sy;

            isWalkingRef.current = Math.abs(scrollVelocity.current) > 2;
            directionRef.current = scrollVelocity.current > 0 ? 1 : -1;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
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

        const s = 0.6; // mini scale

        // Target X: rest in bottom-right corner
        const restX = W / 2;
        const restY = H / 2 - 4;

        if (!walkedInRef.current) {
            posXRef.current = -60;
            posYRef.current = restY;
        } else {
            targetXRef.current = restX;
            posXRef.current += (targetXRef.current - posXRef.current) * 0.05;
            posYRef.current += (restY - posYRef.current) * 0.06;
        }

        // Walk phase advances when scrolling
        if (isWalkingRef.current) {
            walkPhaseRef.current += 0.18;
        } else {
            // Decelerate walk phase to nearest full step
            isWalkingRef.current = false;
        }

        const cx = posXRef.current;
        const cy = posYRef.current;

        const isIdle = !isWalkingRef.current;
        drawMiniAvatar(ctx, cx, cy, s, t, walkPhaseRef.current, isWalkingRef.current, directionRef.current, isIdle);

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
            posXRef.current = canvas.width / 2;
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
        <div
            className="fixed bottom-6 right-6 z-[9998] select-none"
            style={{ width: '100px', height: '110px' }}
            title="Your developer companion 🧑‍💻"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Glassmorphism tooltip */}
            {showTooltip && (
                <div
                    className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-xl text-xs font-medium text-white whitespace-nowrap pointer-events-none"
                    style={{
                        background: 'rgba(15,8,32,0.85)',
                        border: '1px solid rgba(168,85,247,0.4)',
                        boxShadow: '0 0 14px rgba(168,85,247,0.25)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    👋 Your dev companion
                </div>
            )}
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%' }}
                aria-hidden="true"
            />
        </div>
    );
}
