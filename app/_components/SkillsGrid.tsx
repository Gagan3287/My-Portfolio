'use client';
import React, { useEffect, useRef } from 'react';

// ── Inline SVGs for all 42 skills ─────────────────────────────────────────────

const PythonLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#3776AB" d="M63.98 15c-26.87 0-25.2 11.66-25.2 11.66l.03 12.08h25.66v3.63H29.3S13 40.51 13 67.64s14.72 26.2 14.72 26.2h8.79v-12.6s-.47-14.72 14.49-14.72h24.96s14.02.23 14.02-13.54V28.47S92.27 15 63.98 15zm-13.9 8.04c2.51 0 4.54 2.03 4.54 4.54s-2.03 4.54-4.54 4.54-4.54-2.03-4.54-4.54 2.03-4.54 4.54-4.54z"/>
        <path fill="#FFD43B" d="M64.02 113c26.87 0 25.2-11.66 25.2-11.66l-.03-12.08H63.53v-3.63h35.17S115 87.49 115 60.36 100.28 34.16 100.28 34.16h-8.79v12.6s.47 14.72-14.49 14.72H52.04S38.02 61.25 38.02 75.02V99.53S35.73 113 64.02 113zm13.9-8.04c-2.51 0-4.54-2.03-4.54-4.54s2.03-4.54 4.54-4.54 4.54 2.03 4.54 4.54-2.03 4.54-4.54 4.54z"/>
    </svg>
);

const JSLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#F7DF1E" d="M1.4 1.4h125.2v125.2H1.4z"/>
        <path d="M116.7 96.7c-1.6-10-9.5-14.7-20.3-16.8l-2.1-.4c-4.9-1.1-9.7-3.4-9.7-7.4 0-3.7 2.8-6.7 9.1-6.7 5.9 0 10.2 2.2 12.7 7.5l11-6.7c-4.5-8.7-12.2-12.7-23.7-12.7-13.8 0-22.8 8-22.8 19 0 11.1 6.5 17.3 20.6 20.3l2.1.5c7.1 1.6 10.4 4.2 10.4 8.5 0 4.5-3.8 7.2-11.1 7.2-7.7 0-13-3.6-16.1-10.5l-11.3 6.4c4.3 10.6 13.7 16.1 27.4 16.1 14.5 0 24-7.4 24-20.3zM67.1 54.8H54.5v39.9c0 7.8-3.5 11-9.6 11-5.3 0-8.2-3.2-11-7.9L22.7 104c3.7 7.7 10.8 12.4 20.8 12.4 13.4 0 23.6-7.1 23.6-23V54.8z"/>
    </svg>
);

const TSLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#3178C6" d="M5 5h118v118H5z"/>
        <text x="112" y="112" fill="#FFF" fontSize="58" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">TS</text>
    </svg>
);

const CLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#A8B9CC" d="M115 61.3c-.5-3.5-1.8-6.8-3.9-9.7a27 27 0 00-8-7.3 27.3 27.3 0 00-10.6-3.1c-2-.2-4 0-6 .4-5.4 1.1-10.2 3.9-13.8 8a27.3 27.3 0 00-6.1 17.7c0 3.3.6 6.5 1.8 9.5a27.4 27.4 0 0015.7 15.3c3 1.2 6.2 1.8 9.5 1.8a27 27 0 0017.7-6.7 27 27 0 007.7-16l.1-1.2V69l-.1-7.7zM92.7 82.3a16.4 16.4 0 01-9.7-3.1 16.3 16.3 0 01-5.8-8.1 16.6 16.6 0 011-12.7A16.3 16.3 0 0192.7 50a16.6 16.6 0 0113.1 6.6l-6.6 6.6a8 8 0 00-6.5-3.2 8 8 0 00-6.5 12.8 8 8 0 006.5 3.2 8 8 0 006.5-3.3l6.6 6.7a16.5 16.5 0 01-13.1 3.9z"/>
    </svg>
);

const CppLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#00599C" d="M115 61.3c-.5-3.5-1.8-6.8-3.9-9.7a27 27 0 00-8-7.3 27.3 27.3 0 00-10.6-3.1c-2-.2-4 0-6 .4-5.4 1.1-10.2 3.9-13.8 8a27.3 27.3 0 00-6.1 17.7c0 3.3.6 6.5 1.8 9.5a27.4 27.4 0 0015.7 15.3c3 1.2 6.2 1.8 9.5 1.8a27 27 0 0017.7-6.7 27 27 0 007.7-16l.1-1.2V69l-.1-7.7zM92.7 82.3a16.4 16.4 0 01-9.7-3.1 16.3 16.3 0 01-5.8-8.1 16.6 16.6 0 011-12.7A16.3 16.3 0 0192.7 50a16.6 16.6 0 0113.1 6.6l-6.6 6.6a8 8 0 00-6.5-3.2 8 8 0 00-6.5 12.8 8 8 0 006.5 3.2 8 8 0 006.5-3.3l6.6 6.7a16.5 16.5 0 01-13.1 3.9zM108 65h-4v-4h-4v4h-4v4h4v4h4v-4h4v-4zm14 0h-4v-4h-4v4h-4v4h4v4h4v-4h4v-4z"/>
    </svg>
);

const KotlinLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <defs>
            <linearGradient id="kotlin_grad" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E44857" />
                <stop offset="30%" stopColor="#C10E86" />
                <stop offset="100%" stopColor="#0095D5" />
            </linearGradient>
        </defs>
        <path fill="url(#kotlin_grad)" d="M120 120H8V8h112L64 64l56 56z"/>
    </svg>
);

const HTMLLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#E34F26" d="M12.4 10.5l10.5 106.8 41.1 11.4 41.1-11.4 10.5-106.8H12.4z"/>
        <path fill="#F06529" d="M64 121.2V17.7h34.4l-3.2 32.7H64v19.1h18.3l-1.8 18.6-16.5 4.5V121.2z"/>
        <path fill="#EBEBEB" d="M64 17.7v103.5l-21.7-6-1.5-15.1H50l.9 9 13.1 3.6V92.7l-15-4.1-.9-10.7H64V58.8H39.4l-.8-9H64V17.7z"/>
    </svg>
);

const CSSLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#1572B6" d="M12.4 10.5l10.5 106.8 41.1 11.4 41.1-11.4 10.5-106.8H12.4z"/>
        <path fill="#33A9DC" d="M64 121.2V17.7h34.4l-3.2 32.7H64v19.1h18.3l-1.8 18.6-16.5 4.5V121.2z"/>
        <path fill="#EBEBEB" d="M64 17.7v103.5l-21.7-6-1.5-15.1H50l.9 9 13.1 3.6V92.7l-15-4.1-.9-10.7H64V58.8H39.4l-.8-9H64V17.7z"/>
    </svg>
);

const BashLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <rect width="128" height="128" rx="20" fill="#2B3539" />
        <path fill="#4EAA25" d="M25 35l30 20-30 20v-8l18-12-18-12v-8zm25 40h45v8H50v-8z" />
    </svg>
);

const ReactLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <circle cx="64" cy="64" r="10" fill="#61DAFB"/>
        <ellipse cx="64" cy="64" rx="18" ry="48" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(30 64 64)"/>
        <ellipse cx="64" cy="64" rx="18" ry="48" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(90 64 64)"/>
        <ellipse cx="64" cy="64" rx="18" ry="48" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(150 64 64)"/>
    </svg>
);

const NextLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <circle cx="64" cy="64" r="54" fill="#000" stroke="#FFF" strokeWidth="4"/>
        <path d="M92 92L52 40h-8v48h6V52l32 42c3-4 6-8 8-12z" fill="#FFF"/>
        <rect x="78" y="40" width="6" height="48" fill="#FFF"/>
    </svg>
);

const BootstrapLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#7952B3" d="M128 24a24 24 0 00-24-24H24A24 24 0 000 24v80a24 24 0 0024 24h80a24 24 0 0024-24V24z"/>
        <path fill="#FFF" d="M35 30h32c10 0 16 5 16 13 0 6-4 10-10 12 8 2 12 7 12 14 0 9-8 16-20 16H35V30zm15 13v13h16c5 0 8-2 8-6.5S71 53 66 53H50zm0 21v18h18c5 0 9-3 9-9s-4-9-9-9H50z"/>
    </svg>
);

const NodeLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#339933" d="M64 8L18 34.6v53.5L64 115l46-26.8V34.6L64 8zm34 74.4L64 100 30 82.4V45.6L64 28l34 17.6v36.8z"/>
        <path fill="#66cc33" d="M64 36.8L38 50.4v27.2L64 91.2l26-13.6V50.4L64 36.8z" opacity="0.6"/>
    </svg>
);

const DjangoLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <rect width="128" height="128" rx="20" fill="#092E20" />
        <text x="64" y="86" fill="#FFF" fontSize="66" fontWeight="bold" textAnchor="middle" fontFamily="Georgia, serif">dj</text>
    </svg>
);

const FlaskLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FFF" d="M80 20c-15 0-25 10-25 25v45c0 10-5 15-10 15h40c5 0 10-5 10-15V45c0-15-10-25-25-25z" opacity="0.1"/>
        <path fill="#777" d="M64 15c-8 0-14 6-14 14v6H44v8h6v54c0 11 9 20 20 20s20-9 20-20V43h6v-8h-6v-6c0-8-6-14-14-14zm8 28v54c0 4-4 8-8 8s-8-4-8-8V43h16z"/>
    </svg>
);

const FastAPILogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <rect width="128" height="128" rx="20" fill="#009688" />
        <path fill="#FFF" d="M74.3 18l-30 46h24l-14.6 46 44-54.6h-23.4z" />
    </svg>
);

const TFLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FF6F00" d="M63.5 1L10 32v64l53.5 31 53.5-31V32L63.5 1zM97 82.3L63.5 101 30 82.3V45.7L63.5 27 97 45.7v36.6z"/>
        <path fill="#FF6F00" d="M63.5 38.5v51L87 76.5V51.5L63.5 38.5z"/>
    </svg>
);

const PyTorchLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#EE4C2C" d="M64 16C37.5 16 16 37.5 16 64s21.5 48 48 48 48-21.5 48-48S90.5 16 64 16zm0 84c-19.9 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.1 36-36 36z"/>
        <path fill="#EE4C2C" d="M79 33.5L64 16v20l15-2.5z"/>
        <circle fill="#EE4C2C" cx="78" cy="50" r="6"/>
    </svg>
);

const ScikitLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <circle cx="64" cy="64" r="50" fill="#F7931E" opacity="0.15" stroke="#F7931E" strokeWidth="2.5"/>
        <text x="64" y="75" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#F7931E" fontFamily="sans-serif">SK</text>
    </svg>
);

const OpenCVLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <circle cx="40" cy="40" r="24" fill="#5C3EE8"/>
        <circle cx="88" cy="40" r="24" fill="#4CAF50"/>
        <circle cx="64" cy="82" r="24" fill="#EE4C2C"/>
    </svg>
);

const NumPyLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#4DABCF" d="M64 10L10 42v44l54 32 54-32V42L64 10zm0 12l40 24v36L64 106 24 82V46l40-24z"/>
        <path fill="#4DABCF" d="M64 34L34 52v36l30 18 30-18V52L64 34z" opacity="0.5"/>
    </svg>
);

const TailwindLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#06B6D4" d="M34 32c-15 0-22.5 7.5-22.5 22.5 0 15 7.5 15 22.5 30 15 15 22.5 15 37.5 0 15-15 15-22.5 0-37.5C56.5 32 49 32 34 32zm45 22.5c-15 0-22.5 7.5-22.5 22.5 0 15 7.5 15 22.5 30 15 15 22.5 15 37.5 0 15-15 15-22.5 0-37.5-15-15-22.5-15-37.5-15z"/>
    </svg>
);

const PandasLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <rect x="30" y="20" width="20" height="88" rx="4" fill="#7048E8"/>
        <rect x="78" y="20" width="20" height="88" rx="4" fill="#7048E8"/>
        <rect x="30" y="50" width="68" height="20" rx="2" fill="#7048E8" opacity="0.5"/>
    </svg>
);

const MySQLLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <rect width="128" height="128" rx="20" fill="#4479A1" />
        <text x="64" y="80" fill="#FFF" fontSize="48" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SQL</text>
    </svg>
);

const PostgreSQLLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#336791" d="M64 8c-30.9 0-56 25.1-56 56 0 24.5 15.8 45.4 38 52.8v-12.8c-12-3.8-20-14-20-26 0-16.5 13.5-30 30-30s30 13.5 30 30c0 12-8 22.2-20 26v12.8c22.2-7.4 38-28.3 38-52.8 0-30.9-25.1-56-56-56z"/>
        <path fill="#336791" d="M74 64a10 10 0 11-20 0 10 10 0 0120 0z" opacity="0.7"/>
    </svg>
);

const MongoDBLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#47A248" d="M64 8C64 8 40 40 40 76c0 15.5 10.7 28 24 28s24-12.5 24-28c0-36-24-68-24-68zm0 18c6 12 12 28 12 50 0 7.7-5.4 14-12 14s-12-6.3-12-14c0-22 6-38 12-50z"/>
    </svg>
);

const FirebaseLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FFCA28" d="M23 98l8-69c0-2 2-3 4-2l14 12z"/>
        <path fill="#F57C00" d="M105 98L62 13c-1-2-4-2-5 0L42 41z"/>
        <path fill="#FF3D00" d="M23 98l82 0L64 56z"/>
    </svg>
);

const RedisLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#D82C20" d="M64 8L14 30v40l50 22 50-22V30L64 8zm0 76L26 68v-6l38 17 38-17v6L64 84zm38-23L64 78 26 61v-6l38 17 38-17v6zm0-11L64 67 26 50V38l38 17 38-17v12z"/>
    </svg>
);

const DockerLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#2496ED" d="M16 54h12v12H16V54zm16 0h12v12H32V54zm16 0h12v12H48V54zm16 0h12v12H64V54zm16 0h12v12H80V54zm16 0h12v12H96V54zM32 38h12v12H32V38zm16 0h12v12H48V38zm16 0h12v12H64V38zm16 0h12v12H80V38zm-16-16h12v12H64V22zm48 48c0 18.8-15.2 34-34 34H18v-4h78c16.5 0 30-13.5 30-30V48h4v22z"/>
    </svg>
);

const AzureLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#0089D6" d="M15 95l43-65h27L15 113h100l13-18H15z"/>
        <path fill="#0072C6" d="M78 50l17-30h27L74 95H48l30-45z"/>
    </svg>
);

const GitLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#F05032" d="M123.6 57.2L70.8 4.4a9.6 9.6 0 00-13.6 0L52 9.6l15.1 15.1a12.8 12.8 0 11-18.1 18.1L33.9 27.7a9.6 9.6 0 00-6.7 16.2l52.8 52.8c3.8 3.8 10 3.8 13.6 0l50-50a9.6 9.6 0 000-13.5z"/>
    </svg>
);

const GitHubLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FFF" fillRule="evenodd" clipRule="evenodd" d="M64 8C33.1 8 8 33.1 8 64c0 24.7 16 45.7 38.3 53.1 2.8.5 3.8-1.2 3.8-2.7 0-1.3-.1-4.9-.1-9.6-15.6 3.4-18.9-7.5-18.9-7.5-2.5-6.5-6.2-8.2-6.2-8.2-5.1-3.5.4-3.4.4-3.4 5.6.4 8.6 5.8 8.6 5.8 5 8.6 13.2 6.1 16.4 4.7 1-3.6 2.4-6.1 4-7.5-12.4-1.4-25.5-6.2-25.5-27.7 0-6.1 2.2-11.1 5.8-15-1-.6-2.5-7.1.6-14.8 0 0 4.7-1.5 15.4 5.7 4.5-1.3 9.3-1.9 14.1-2 4.8 0 9.6.7 14.1 2 10.7-7.2 15.4-5.7 15.4-5.7 3.1 7.7 1.6 14.2.6 14.8 3.6 3.9 5.8 8.9 5.8 15 0 21.5-13.1 26.2-25.6 27.6 2 1.7 3.8 5.2 3.8 10.5 0 7.6-.1 13.7-.1 15.6 0 1.5 1 3.2 3.8 2.7C104 109.7 120 88.7 120 64c0-30.9-25.1-56-56-56z"/>
    </svg>
);

const LinuxLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FCC624" d="M64 12c-8 0-14 6-14 14s6 14 14 14 14-6 14-14S72 12 64 12zm0 6a8 8 0 110 16 8 8 0 010-16z"/>
        <path fill="#FCC624" d="M42 44c-2 8 0 18 8 26l-6 16c-2 4 0 8 4 10l12-8 12 8c4-2 6-6 4-10l-6-16c8-8 10-18 8-26H42zM50 96c-4 8-6 16-2 20 4-2 8-6 10-12l-8-8zm28 0l-8 8c2 6 6 10 10 12 4-4 2-12-2-20z"/>
    </svg>
);

const AWSLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FF9900" d="M64 20C40 20 20 35 20 54c0 14 11 26 27 31L35 106l34-14c2.5.3 5 .4 7.6.4 24 0 44-15 44-34s-20-34-44-34zm-8 44c0 4-3 7-7 7s-7-3-7-7 3-7 7-7 7 3 7 7zm26 0c0 4-3 7-7 7s-7-3-7-7 3-7 7-7 7 3 7 7z"/>
    </svg>
);

const VSCodeLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#23A9F2" d="M97.6 23.2L15.3 54.4l-7.7-6.5-1.5 1.5L16 64 6.1 78.6l1.5 1.5 7.7-6.5L97.6 104.8c4 1.5 7.9-1.5 7.9-5.5v-70.6c0-4-3.9-7-7.9-5.5z"/>
        <path fill="#007ACC" d="M73 8.3L15.3 54.4v19.2L73 119.7c3 2.5 7.5.5 7.5-3.5V11.8c0-4-4.5-6-7.5-3.5z"/>
        <path fill="#1F9CF0" d="M73 8.3v111.4L18.3 64 73 8.3z"/>
    </svg>
);

const VercelLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FFF" d="M64 12L120 108H8L64 12z"/>
    </svg>
);

const JupyterLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <ellipse cx="64" cy="64" rx="54" ry="18" fill="none" stroke="#F37626" strokeWidth="6" transform="rotate(-30 64 64)" />
        <circle cx="48" cy="48" r="14" fill="#F37626" />
        <circle cx="80" cy="80" r="10" fill="#9E9E9E" />
    </svg>
);

const FigmaLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#F24E1E" d="M39 31c0-7.2 5.8-13 13-13h12v26H52c-7.2 0-13-5.8-13-13z"/>
        <path fill="#A259FF" d="M39 57c0-7.2 5.8-13 13-13h12v26H52c-7.2 0-13-5.8-13-13z"/>
        <path fill="#0ACF83" d="M39 83c0-7.2 5.8-13 13-13h12v26H52c-7.2 0-13-5.8-13-13z"/>
        <path fill="#18A0FB" d="M64 57c0 7.2 5.8 13 13 13h12V44H77c-7.2 0-13 5.8-13 13z"/>
        <path fill="#F24E1E" d="M64 31c0 7.2 5.8 13 13 13h12V18H77c-7.2 0-13 5.8-13 13z"/>
    </svg>
);

const PostmanLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <path fill="#FF6C37" d="M96 32c-6-6-20-4-32 8S46 66 40 76l-8-2-4 4 12 12 4-4-2-8c10-6 24-14 36-26s20-26 18-32z"/>
        <circle cx="84" cy="44" r="8" fill="#FFF" />
    </svg>
);

const PhotoshopLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <rect width="128" height="128" rx="20" fill="#001829" />
        <rect x="6" y="6" width="116" height="116" rx="14" fill="none" stroke="#00C8FF" strokeWidth="8" />
        <text x="64" y="86" fill="#00C8FF" fontSize="58" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Ps</text>
    </svg>
);

const HuggingFaceLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <circle cx="64" cy="64" r="54" fill="#FFD21E" />
        <circle cx="44" cy="52" r="6" fill="#000" />
        <circle cx="84" cy="52" r="6" fill="#000" />
        <path d="M40 76c10 12 38 12 48 0" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" />
        <path d="M16 88c6-10 16-10 22-4M112 88c-6-10-16-10-22-4" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" />
    </svg>
);

const MSOfficeLogo = () => (
    <svg viewBox="0 0 128 128" width="28" height="28">
        <rect x="10" y="10" width="50" height="50" fill="#F25022" />
        <rect x="68" y="10" width="50" height="50" fill="#7FBA00" />
        <rect x="10" y="68" width="50" height="50" fill="#00A1F1" />
        <rect x="68" y="68" width="50" height="50" fill="#FFB900" />
    </svg>
);

// ── Skills structured into 6 rows ─────────────────────────────────────────────

interface SkillItem {
    name: string;
    logo: React.ReactNode;
    color: string;
    glowColor: string;
}

const SKILL_ROWS: SkillItem[][] = [
    // Row 1 (12 items)
    [
        { name: 'Python',     logo: <PythonLogo />,    color: '#3776AB', glowColor: 'rgba(55,118,171,0.45)' },
        { name: 'JavaScript', logo: <JSLogo />,        color: '#F7DF1E', glowColor: 'rgba(247,223,30,0.45)' },
        { name: 'TypeScript', logo: <TSLogo />,        color: '#3178C6', glowColor: 'rgba(49,120,198,0.45)' },
        { name: 'C',          logo: <CLogo />,         color: '#A8B9CC', glowColor: 'rgba(168,185,204,0.45)' },
        { name: 'C++',        logo: <CppLogo />,       color: '#00599C', glowColor: 'rgba(0,89,156,0.45)' },
        { name: 'Kotlin',     logo: <KotlinLogo />,    color: '#C10E86', glowColor: 'rgba(193,14,134,0.45)' },
        { name: 'HTML',       logo: <HTMLLogo />,      color: '#E34F26', glowColor: 'rgba(227,79,38,0.45)' },
        { name: 'CSS',        logo: <CSSLogo />,       color: '#1572B6', glowColor: 'rgba(21,114,182,0.45)' },
        { name: 'Bash',       logo: <BashLogo />,      color: '#4EAA25', glowColor: 'rgba(78,170,37,0.45)' },
        { name: 'React',      logo: <ReactLogo />,     color: '#61DAFB', glowColor: 'rgba(97,218,251,0.45)' },
        { name: 'Next.js',    logo: <NextLogo />,      color: '#FFFFFF', glowColor: 'rgba(255,255,255,0.45)' },
        { name: 'Bootstrap',  logo: <BootstrapLogo />, color: '#7952B3', glowColor: 'rgba(121,82,179,0.45)' },
    ],
    // Row 2 (10 items)
    [
        { name: 'Node.js',    logo: <NodeLogo />,      color: '#339933', glowColor: 'rgba(51,153,51,0.45)' },
        { name: 'Django',     logo: <DjangoLogo />,    color: '#092E20', glowColor: 'rgba(9,46,32,0.45)' },
        { name: 'Flask',      logo: <FlaskLogo />,     color: '#888888', glowColor: 'rgba(136,136,136,0.45)' },
        { name: 'FastAPI',    logo: <FastAPILogo />,   color: '#009688', glowColor: 'rgba(0,150,136,0.45)' },
        { name: 'TensorFlow', logo: <TFLogo />,        color: '#FF6F00', glowColor: 'rgba(255,111,0,0.45)' },
        { name: 'PyTorch',    logo: <PyTorchLogo />,   color: '#EE4C2C', glowColor: 'rgba(238,76,44,0.45)' },
        { name: 'Scikit',     logo: <ScikitLogo />,    color: '#F7931E', glowColor: 'rgba(247,147,30,0.45)' },
        { name: 'OpenCV',     logo: <OpenCVLogo />,    color: '#5C3EE8', glowColor: 'rgba(92,62,232,0.45)' },
        { name: 'NumPy',      logo: <NumPyLogo />,     color: '#4DABCF', glowColor: 'rgba(77,171,207,0.45)' },
        { name: 'Tailwind',   logo: <TailwindLogo />,  color: '#06B6D4', glowColor: 'rgba(6,182,212,0.45)' },
    ],
    // Row 3 (8 items)
    [
        { name: 'Pandas',     logo: <PandasLogo />,     color: '#7048E8', glowColor: 'rgba(112,72,232,0.45)' },
        { name: 'MySQL',      logo: <MySQLLogo />,      color: '#4479A1', glowColor: 'rgba(68,121,161,0.45)' },
        { name: 'PostgreSQL', logo: <PostgreSQLLogo />, color: '#336791', glowColor: 'rgba(51,103,145,0.45)' },
        { name: 'MongoDB',    logo: <MongoDBLogo />,    color: '#47A248', glowColor: 'rgba(71,162,72,0.45)' },
        { name: 'Firebase',   logo: <FirebaseLogo />,   color: '#FFCA28', glowColor: 'rgba(255,202,40,0.45)' },
        { name: 'Redis',      logo: <RedisLogo />,      color: '#D82C20', glowColor: 'rgba(216,44,32,0.45)' },
        { name: 'Docker',     logo: <DockerLogo />,     color: '#2496ED', glowColor: 'rgba(36,150,237,0.45)' },
        { name: 'Azure',      logo: <AzureLogo />,      color: '#0089D6', glowColor: 'rgba(0,137,214,0.45)' },
    ],
    // Row 4 (6 items)
    [
        { name: 'Git',        logo: <GitLogo />,        color: '#F05032', glowColor: 'rgba(240,80,50,0.45)' },
        { name: 'GitHub',     logo: <GitHubLogo />,     color: '#FFFFFF', glowColor: 'rgba(255,255,255,0.45)' },
        { name: 'Linux',      logo: <LinuxLogo />,      color: '#FCC624', glowColor: 'rgba(252,198,36,0.45)' },
        { name: 'AWS',        logo: <AWSLogo />,        color: '#FF9900', glowColor: 'rgba(255,153,0,0.45)' },
        { name: 'VS Code',    logo: <VSCodeLogo />,     color: '#007ACC', glowColor: 'rgba(0,122,204,0.45)' },
        { name: 'Vercel',     logo: <VercelLogo />,     color: '#FFFFFF', glowColor: 'rgba(255,255,255,0.45)' },
    ],
    // Row 5 (4 items)
    [
        { name: 'Jupyter',    logo: <JupyterLogo />,    color: '#F37626', glowColor: 'rgba(243,118,38,0.45)' },
        { name: 'Figma',      logo: <FigmaLogo />,      color: '#F24E1E', glowColor: 'rgba(242,78,30,0.45)' },
        { name: 'Postman',    logo: <PostmanLogo />,    color: '#FF6C37', glowColor: 'rgba(255,108,55,0.45)' },
        { name: 'Photoshop',  logo: <PhotoshopLogo />,  color: '#00C8FF', glowColor: 'rgba(0,200,255,0.45)' },
    ],
    // Row 6 (2 items)
    [
        { name: 'Hugging Face', logo: <HuggingFaceLogo />, color: '#FFD21E', glowColor: 'rgba(255,210,30,0.45)' },
        { name: 'MS Office',     logo: <MSOfficeLogo />,     color: '#F25022', glowColor: 'rgba(242,80,34,0.45)' },
    ]
];

const GLOBE_RADIUS = 200;

// ── Background Globe Canvas ───────────────────────────────────────────────────

function GlobeCanvas({ radius = GLOBE_RADIUS }: { radius?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const size = radius * 2 + 10;
        canvas.width = size;
        canvas.height = size;
        const cx = size / 2;
        const cy = size / 2;

        let frameId: number;
        let axialTilt = 0.2;

        function drawGlobe() {
            if (!ctx) return;
            ctx.clearRect(0, 0, size, size);

            // Base sphere transparent glow
            const grad = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, radius * 0.1, cx, cy, radius);
            grad.addColorStop(0,   'rgba(139, 92, 246, 0.20)');
            grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.12)');
            grad.addColorStop(1,   'rgba(0, 0, 0, 0)');
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            // Outer ring glow
            const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.2);
            glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
            glowGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();

            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.clip();

            // Latitude lines (horizontal)
            const LATS = 8;
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.07)';
            ctx.lineWidth = 0.8;
            for (let i = 1; i < LATS; i++) {
                const lat = (i / LATS) * Math.PI - Math.PI / 2;
                const r = Math.cos(lat) * radius;
                const yOff = Math.sin(lat) * radius;
                ctx.beginPath();
                ctx.ellipse(cx, cy + yOff, r, r * 0.22, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Longitude lines (vertical rotating)
            const LONS = 12;
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.06)';
            for (let i = 0; i < LONS; i++) {
                const lon = rotRef.current + (i / LONS) * Math.PI;
                ctx.beginPath();
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(axialTilt);
                ctx.ellipse(0, 0, radius * Math.abs(Math.cos(lon)), radius, 0, 0, Math.PI * 2);
                ctx.restore();
                ctx.stroke();
            }

            ctx.restore();

            // Outline border
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();

            rotRef.current += 0.002;
            frameId = requestAnimationFrame(drawGlobe);
        }

        frameId = requestAnimationFrame(drawGlobe);
        return () => cancelAnimationFrame(frameId);
    }, [radius]);

    return (
        <canvas
            ref={canvasRef}
            className="w-[400px] h-[400px] pointer-events-none opacity-80"
            style={{
                filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.15))',
            }}
        />
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function SkillsGrid() {
    return (
        <div className="relative w-full max-w-5xl mx-auto py-12 px-4 select-none">
            
            {/* Background 3D Globe & Glows */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                {/* Radial ambient background blur */}
                <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[100px]" />
                <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-950/15 blur-[60px]" />
                
                {/* Animated wireframe globe */}
                <GlobeCanvas radius={GLOBE_RADIUS} />
            </div>

            {/* Grid Container */}
            <div className="relative z-10 flex flex-col items-center gap-y-4 w-full">
                {SKILL_ROWS.map((row, rowIndex) => (
                    <div 
                        key={rowIndex} 
                        className="flex flex-wrap justify-center gap-4 w-full"
                    >
                        {row.map((skill) => (
                            <div
                                key={skill.name}
                                className="group relative w-[76px] h-[84px] rounded-xl flex flex-col items-center justify-between p-2.5 transition-all duration-300 cursor-pointer border border-white/5 bg-neutral-900/35 backdrop-blur-[6px] hover:scale-105 active:scale-95"
                                style={{
                                    '--brand-color': skill.color,
                                    '--glow-color': skill.glowColor,
                                } as React.CSSProperties}
                            >
                                {/* Branded hover background spotlight & box shadow */}
                                <div 
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                                    style={{
                                        background: `radial-gradient(circle at center, ${skill.glowColor} 0%, transparent 80%)`,
                                        boxShadow: `0 0 16px ${skill.glowColor}, inset 0 0 12px ${skill.glowColor}`,
                                        border: `1.5px solid ${skill.color}`,
                                    }}
                                />

                                {/* Icon container */}
                                <div className="flex-1 flex items-center justify-center text-white/80 group-hover:text-white transition-colors duration-300">
                                    {skill.logo}
                                </div>

                                {/* Title text */}
                                <span className="text-[10px] text-zinc-400 font-medium group-hover:text-white transition-colors duration-300 text-center tracking-wide whitespace-nowrap mt-1 max-w-full overflow-hidden text-ellipsis">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
