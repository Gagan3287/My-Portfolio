'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import { X, Send, Bot, ChevronDown } from 'lucide-react';

// ─── Knowledge Base ────────────────────────────────────────────────────────────

const KB = {
    about: {
        keywords: ['who', 'about', 'yourself', 'gagan', 'vengala', 'tell me', 'introduce', 'background', 'bio', 'person', 'you'],
        answer: `Hi! I'm Gagan's AI companion 🤖\n\n**Vengala Gagan Chandra Tej** is a passionate Full Stack Developer and AI/ML enthusiast currently pursuing his B.Tech at SR University.\n\nHe specializes in building modern web experiences with React, Next.js, Python, and Node.js — and loves blending AI into real-world applications.\n\n📧 tejchandra100@gmail.com\n🐙 github.com/Gagan3287\n💼 linkedin.com/in/vengala-gagan-176a9433a`,
    },
    skills: {
        keywords: ['skill', 'tech', 'stack', 'know', 'language', 'framework', 'tool', 'use', 'technology', 'expertise', 'frontend', 'backend', 'database'],
        answer: `Gagan's tech stack covers the full spectrum 💻\n\n**Frontend:**\nReact.js • Next.js • JavaScript (ES6+) • TypeScript • Tailwind CSS • HTML5 • CSS3\n\n**Backend:**\nPython • Flask • FastAPI • Node.js • Express.js\n\n**Databases:**\nMySQL • PostgreSQL • MongoDB\n\n**Cloud & Tools:**\nAWS • Docker • Git & GitHub • Prisma`,
    },
    projects: {
        keywords: ['project', 'work', 'built', 'portfolio', 'app', 'website', 'developed', 'created', 'made'],
        answer: `Here are some of Gagan's key projects 🚀\n\n**1. Electro EV** — Full-stack agency platform with Payload CMS, Next.js ISR, and Swiper.js sliders. Live: electroev.co.uk\n\n**2. Epikcart** — Feature-rich e-commerce platform with multi-language RTL support, Redux, and dynamic filtering.\n\n**3. Resume Roaster** — AI-powered resume feedback app using GPT-4, Next.js, PostgreSQL, and Prisma.\n\n**4. Real Estate (PropertyPro)** — Property management platform with React, Framer Motion, and i18n support.\n\n**5. devLinks** — Link-sharing app built with Next.js, Formik, and drag-and-drop functionality.`,
    },
    certifications: {
        keywords: ['certif', 'certificate', 'aws', 'azure', 'cisco', 'credential', 'course', 'badge', 'achievement', 'qualified'],
        answer: `Gagan holds several professional certifications 🏆\n\n**Amazon Web Services (AWS):**\n• AWS Cloud Foundations (2025)\n• AWS Cloud Developing (2025)\n• AWS Cloud Security Builder (2025)\n• AWS Cloud Web App Builder (2025)\n\n**Microsoft Azure:**\n• Azure AI Fundamentals (2025)\n• Azure Security Fundamentals (2025)\n\n**Cisco:**\n• Network Basics (2025)\n• Networking Devices & Initial Config (2025)\n\n**Others:**\n• Programming with JavaScript — Meta (2025)\n• ChatGPT Prompt Engineering for Devs — DeepLearning.AI`,
    },
    education: {
        keywords: ['education', 'study', 'university', 'college', 'degree', 'school', 'btech', 'b.tech', 'qualification', 'academics'],
        answer: `Gagan's educational journey 🎓\n\n**B.Tech** — SR University (Current)\n\n**Secondary School** — Bansal Junior College\n\n**School** — Warangal Public School`,
    },
    contact: {
        keywords: ['contact', 'hire', 'reach', 'email', 'connect', 'collaborate', 'message', 'social', 'linkedin', 'github', 'available'],
        answer: `Want to connect with Gagan? 📬\n\n**Email:** tejchandra100@gmail.com\n\n**GitHub:** github.com/Gagan3287\n\n**LinkedIn:** linkedin.com/in/vengala-gagan-176a9433a\n\n**LeetCode:** leetcode.com/u/Vengala_Gagan\n\n**Instagram:** @gagan_vengala\n\nFeel free to reach out — he's open to collaborations, freelance work, and full-time opportunities!`,
    },
    resume: {
        keywords: ['resume', 'cv', 'download', 'pdf'],
        answer: `You can download Gagan's resume directly from his portfolio! 📄\n\nScroll to the **About Me** section and click the **Download** button on the resume card to get the PDF.\n\nAlternatively, use the direct link: **/Gagan_Final_Resume.pdf**`,
    },
};

const SUGGESTIONS = [
    '🧑‍💻 About Gagan',
    '⚡ Tech Stack',
    '🚀 Projects',
    '🏆 Certifications',
    '🎓 Education',
    '📬 Contact',
];

function getBotReply(input: string): string {
    const lower = input.toLowerCase();
    for (const topic of Object.values(KB)) {
        if (topic.keywords.some((kw) => lower.includes(kw))) {
            return topic.answer;
        }
    }
    return `I can only answer questions about Gagan's portfolio 🤖\n\nTry asking about:\n• **About** — Who is Gagan?\n• **Skills** — Tech stack & tools\n• **Projects** — Work he's built\n• **Certifications** — His credentials\n• **Education** — Academic background\n• **Contact** — How to reach him`;
}

// ─── Drawing helpers ────────────────────────────────────────────────────────────

function drawMiniAvatar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    s: number,
    time: number,
    walkPhase: number,
    isWalking: boolean,
    direction: number,
    isIdle: boolean,
) {
    ctx.save();
    if (direction < 0) {
        ctx.translate(cx * 2, 0);
        ctx.scale(-1, 1);
    }

    const breathe = isIdle ? Math.sin(time * 0.9) * 2 * s : 0;
    const legSwing = isWalking ? Math.sin(walkPhase) * 14 * s : 0;

    // Legs
    ctx.save();
    ctx.strokeStyle = '#1e1040';
    ctx.lineWidth = 8 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 8 * s, cy + 42 * s + breathe);
    ctx.lineTo(cx - 10 * s + legSwing, cy + 62 * s);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#1e1040';
    ctx.lineWidth = 8 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + 8 * s, cy + 42 * s + breathe);
    ctx.lineTo(cx + 10 * s - legSwing, cy + 62 * s);
    ctx.stroke();
    ctx.restore();

    // Body
    const bodyGrad = ctx.createRadialGradient(cx, cy + 22 * s, 4 * s, cx, cy + 22 * s, 42 * s);
    bodyGrad.addColorStop(0, '#2d1b69');
    bodyGrad.addColorStop(0.5, '#1e1040');
    bodyGrad.addColorStop(1, '#0f0820');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 28 * s + breathe * 0.5, 22 * s, 24 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    const armSwing = isWalking ? -Math.sin(walkPhase) * 14 * s : 0;

    ctx.save();
    ctx.strokeStyle = '#2d1b69';
    ctx.lineWidth = 7 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 18 * s, cy + 16 * s + breathe);
    ctx.lineTo(cx - 22 * s + armSwing, cy + 34 * s);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#2d1b69';
    ctx.lineWidth = 7 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + 18 * s, cy + 16 * s + breathe);
    ctx.lineTo(cx + 22 * s - armSwing, cy + 34 * s);
    ctx.stroke();
    ctx.restore();

    // Neck
    ctx.fillStyle = '#e8c99a';
    ctx.beginPath();
    ctx.roundRect(cx - 5 * s, cy + 5 * s + breathe, 10 * s, 10 * s, 3 * s);
    ctx.fill();

    // Head
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

    ctx.save();
    ctx.strokeStyle = '#c8953c';
    ctx.lineWidth = 1.5 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy + 2 * s + breathe + headBob, 5 * s, 0.1, Math.PI - 0.1);
    ctx.stroke();
    ctx.restore();

    // Ground shadow
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

    ctx.restore();
}

// ─── Chat Message Type ─────────────────────────────────────────────────────────

type Message = { role: 'user' | 'bot'; text: string; id: number };

// ─── Markdown-lite renderer (bold + newlines only) ─────────────────────────────

function renderText(text: string) {
    return text.split('\n').map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
            <span key={i}>
                {parts.map((part, j) =>
                    j % 2 === 1 ? (
                        <strong key={j} style={{ color: '#c084fc', fontWeight: 700 }}>
                            {part}
                        </strong>
                    ) : (
                        part
                    ),
                )}
                {i < text.split('\n').length - 1 && <br />}
            </span>
        );
    });
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function FloatingCompanion() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);
    const walkPhaseRef = useRef(0);
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);
    const isWalkingRef = useRef(false);
    const directionRef = useRef(1);
    const posXRef = useRef(-120);
    const targetXRef = useRef(0);
    const posYRef = useRef(0);
    const walkedInRef = useRef(false);

    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'bot',
            text: `Hey! 👋 I'm Gagan's AI Dev Companion!\n\nI can answer questions about:\n• **About** Gagan\n• **Skills** & tech stack\n• **Projects** he's built\n• **Certifications** he holds\n• **Education** & contact\n\nWhat would you like to know?`,
            id: 0,
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const idRef = useRef(1);

    useEffect(() => {
        const t = setTimeout(() => { walkedInRef.current = true; }, 800);
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

        const s = 0.6;
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

        if (isWalkingRef.current) {
            walkPhaseRef.current += 0.18;
        } else {
            isWalkingRef.current = false;
        }

        drawMiniAvatar(
            ctx,
            posXRef.current,
            posYRef.current,
            s, t,
            walkPhaseRef.current,
            isWalkingRef.current,
            directionRef.current,
            !isWalkingRef.current,
        );

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
        return () => { ro.disconnect(); cancelAnimationFrame(animRef.current); };
    }, [draw]);

    // Auto-scroll chat to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (chatOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }, [chatOpen]);

    const sendMessage = useCallback((text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const userMsg: Message = { role: 'user', text: trimmed, id: idRef.current++ };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const reply = getBotReply(trimmed);
            setMessages((prev) => [...prev, { role: 'bot', text: reply, id: idRef.current++ }]);
            setIsTyping(false);
        }, 600 + Math.random() * 400);
    }, []);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            {/* ── Chat Window ──────────────────────────────────────────────────── */}
            {chatOpen && (
                <div
                    className="fixed bottom-[130px] right-5 z-[9998]"
                    style={{
                        width: 'min(380px, calc(100vw - 24px))',
                        height: 'min(520px, calc(100dvh - 160px))',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(8, 5, 20, 0.92)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: '20px',
                        boxShadow: '0 0 60px rgba(124, 58, 237, 0.2), 0 20px 60px rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 16px',
                            borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))',
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 16px rgba(168,85,247,0.5)',
                                flexShrink: 0,
                            }}
                        >
                            <Bot size={18} color="white" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px', margin: 0, lineHeight: 1.2 }}>
                                Dev Companion AI
                            </p>
                            <p style={{ color: '#a855f7', fontSize: '11px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                                Online · Ask me about Gagan
                            </p>
                        </div>
                        <button
                            onClick={() => setChatOpen(false)}
                            style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px', padding: '4px', cursor: 'pointer', display: 'flex',
                                alignItems: 'center', color: '#94a3b8',
                            }}
                            aria-label="Close chat"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                        className="companion-scroll"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                    alignItems: 'flex-end',
                                    gap: '8px',
                                    animation: 'companionFadeIn 0.25s ease',
                                }}
                            >
                                {msg.role === 'bot' && (
                                    <div style={{
                                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Bot size={14} color="white" />
                                    </div>
                                )}
                                <div
                                    style={{
                                        maxWidth: '80%',
                                        padding: '10px 13px',
                                        borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                                            : 'rgba(255,255,255,0.05)',
                                        border: msg.role === 'user'
                                            ? 'none'
                                            : '1px solid rgba(168,85,247,0.15)',
                                        color: '#e2e8f0',
                                        fontSize: '13px',
                                        lineHeight: 1.55,
                                        boxShadow: msg.role === 'user'
                                            ? '0 4px 20px rgba(124,58,237,0.35)'
                                            : '0 2px 10px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {renderText(msg.text)}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', animation: 'companionFadeIn 0.25s ease' }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Bot size={14} color="white" />
                                </div>
                                <div style={{
                                    padding: '10px 16px',
                                    borderRadius: '16px 16px 16px 4px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(168,85,247,0.15)',
                                    display: 'flex', gap: '5px', alignItems: 'center',
                                }}>
                                    {[0, 1, 2].map((i) => (
                                        <span key={i} style={{
                                            width: 7, height: 7, borderRadius: '50%',
                                            background: '#a855f7',
                                            animation: `companionBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                                            display: 'inline-block',
                                        }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    <div style={{
                        padding: '8px 12px 6px',
                        display: 'flex', gap: '6px', flexWrap: 'wrap',
                        borderTop: '1px solid rgba(168,85,247,0.1)',
                        flexShrink: 0,
                    }}>
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => sendMessage(s)}
                                style={{
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(168,85,247,0.35)',
                                    background: 'rgba(124,58,237,0.1)',
                                    color: '#c084fc',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.25)';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(168,85,247,0.7)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.1)';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(168,85,247,0.35)';
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Input bar */}
                    <div style={{
                        display: 'flex', gap: '8px', alignItems: 'center',
                        padding: '10px 12px',
                        borderTop: '1px solid rgba(168,85,247,0.15)',
                        background: 'rgba(0,0,0,0.2)',
                        flexShrink: 0,
                    }}>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Ask about Gagan..."
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(168,85,247,0.25)',
                                borderRadius: '12px',
                                padding: '9px 14px',
                                color: '#e2e8f0',
                                fontSize: '13px',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(168,85,247,0.7)'; }}
                            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(168,85,247,0.25)'; }}
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || isTyping}
                            style={{
                                width: 38, height: 38, borderRadius: '10px',
                                background: input.trim() && !isTyping
                                    ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                                    : 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(168,85,247,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                                transition: 'all 0.2s',
                                flexShrink: 0,
                                boxShadow: input.trim() && !isTyping ? '0 0 14px rgba(168,85,247,0.4)' : 'none',
                            }}
                            aria-label="Send message"
                        >
                            <Send size={15} color={input.trim() && !isTyping ? '#fff' : '#4a5568'} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Companion Button + Canvas ─────────────────────────────────────── */}
            <div
                className="fixed bottom-6 right-5 z-[9998] select-none cursor-pointer"
                style={{ width: '100px', height: '110px' }}
                onClick={() => setChatOpen((prev) => !prev)}
                title={chatOpen ? 'Close AI Companion' : 'Chat with Dev Companion 🤖'}
                role="button"
                aria-label="Open AI Dev Companion chat"
            >
                {/* Pulse ring when closed */}
                {!chatOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 8, left: '50%', transform: 'translateX(-50%)',
                            width: 60, height: 60, borderRadius: '50%',
                            border: '2px solid rgba(168,85,247,0.4)',
                            animation: 'companionPulse 2s ease-in-out infinite',
                            pointerEvents: 'none',
                        }}
                    />
                )}

                {/* Tooltip label */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                        marginBottom: 6,
                        padding: '5px 10px',
                        borderRadius: 10,
                        background: 'rgba(15,8,32,0.9)',
                        border: '1px solid rgba(168,85,247,0.4)',
                        boxShadow: '0 0 14px rgba(168,85,247,0.2)',
                        backdropFilter: 'blur(12px)',
                        color: '#e2e8f0',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        opacity: chatOpen ? 0 : 1,
                        transition: 'opacity 0.2s',
                    }}
                >
                    {chatOpen ? '' : '👋 Your Companion'}
                </div>

                {/* Minimize indicator when open */}
                {chatOpen && (
                    <div style={{
                        position: 'absolute', top: 0, right: 0,
                        background: 'rgba(124,58,237,0.8)',
                        borderRadius: '50%', width: 20, height: 20,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 8px rgba(168,85,247,0.6)',
                    }}>
                        <ChevronDown size={12} color="white" />
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%' }}
                    aria-hidden="true"
                />
            </div>

            {/* ── Keyframe styles injected once ────────────────────────────────── */}
            <style>{`
                @keyframes companionPulse {
                    0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
                    50% { opacity: 0.9; transform: translateX(-50%) scale(1.15); }
                }
                @keyframes companionFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes companionBounce {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                    40% { transform: scale(1); opacity: 1; }
                }
                .companion-scroll::-webkit-scrollbar { width: 4px; }
                .companion-scroll::-webkit-scrollbar-track { background: transparent; }
                .companion-scroll::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 4px; }
                .companion-scroll::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.6); }
            `}</style>
        </>
    );
}
