export type PostImage = {
    src: string;
    alt: string;
    caption?: string;
    portrait?: boolean;
};

export type PostLink = {
    label: string;
    href: string;
    external?: boolean;
};

export type PostSection = {
    heading?: string;
    paragraphs?: string[];
    bullets?: string[];
    images?: PostImage[];
    links?: PostLink[];
};

export type Post = {
    slug: string;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
    tags: string[];
    sections: PostSection[];
    related?: string[]; // project slugs from lib/projects.ts
};

export const posts: Post[] = [
    
    {
        slug: 'sraap-sr-university-student-portal-guide',
        title: 'SRAaP (SRAAP) Student Portal at SR University: An Unofficial Student Guide',
        description:
            'SRAAP (SRAaP) explained by an SR University student: what the student portal at sraap.in is used for and how to stay safe. Unofficial guide by Vengala Gagan Chandra Tej.',
        date: '2026-11-17',
        tags: ['SRAAP', 'SRAaP', 'SR University', 'Student Portal'],
        related: ['sru-lost-found'],
        sections: [
            {
                paragraphs: [
                    'SRAaP, often typed as SRAAP, is the student portal used at SR University, Warangal. The official portal is at sraap.in. I am a B.Tech student at SR University, and this is an unofficial guide to what the portal is used for.',
                    'This is a personal website. I do not run SRAaP, and this page is not affiliated with the university. It does not have a login and never asks for your username, password or OTP.',
                ],
            },
            {
                heading: 'What is SRAaP used for?',
                paragraphs: [
                    'The official portal has separate login pages for students, staff and parents. SR University also publishes academic calendars and a page on minors and honours that mention SRAaP in several places. From those published documents, it is used for things like:',
                ],
                bullets: [
                    'Course registration for each semester',
                    'Semester fee payment and exam-related steps such as downloading hall tickets',
                    'Declaring a minor, which B.Tech students do before the beginning of their third year',
                    'Entering marks, which is done by faculty',
                ],
            },
            {
                heading: 'Staying safe while using SRAaP',
                bullets: [
                    'Open SRAaP only from sraap.in, the official SR University website, or links sent by the university.',
                    'Before you log in, check that the address bar shows sraap.in.',
                    'Never share your password or OTP with anyone, including other students.',
                    'Do not enter your SRAaP details on any other website, including this one.',
                    'For login or fee problems, use the contact page on the official portal or contact your department or the university office directly.',
                ],
            },
            {
                heading: 'Official links',
                links: [
                    {
                        label: 'SRAaP official portal (sraap.in)',
                        href: 'https://sraap.in/',
                        external: true,
                    },
                    {
                        label: 'SRAaP contact page',
                        href: 'https://sraap.in/contact_us.php',
                        external: true,
                    },
                    {
                        label: 'SR University official website',
                        href: 'https://sru.edu.in',
                        external: true,
                    },
                    {
                        label: 'SR University student developer portfolios',
                        href: '/sr-university',
                    },
                ],
            },
            {
                heading: 'About the author',
                paragraphs: [
                    'I am Vengala Gagan Chandra Tej, a B.Tech CSE (AI & ML) student at SR University, Warangal, and a Full Stack developer. I built SRU Lost & Found, a platform for SR University students. You can read more about me on the About page.',
                ],
                links: [
                    {
                        label: 'About Vengala Gagan Chandra Tej',
                        href: '/about',
                    },
                ],
            },
        ],
    },
     {
        slug: 'ayulink-first-prize-pragathi-2-0-sr-university',
        title: 'AyuLink: How Our Team Won 1st Prize in the Health Domain at Pragathi 2.0',
        description:
            'Vengala Gagan Chandra Tej, team lead of AyuLink, shares how the team won 1st Prize in the Health domain at Pragathi 2.0, SR University, Warangal, with photos from the event.',
        date: '2026-11-13',
        tags: ['AyuLink', 'Pragathi 2.0', 'SR University', 'Healthcare'],
        related: ['ayulink'],
        sections: [
            {
                paragraphs: [
                    'AyuLink is a low-cost patient monitoring system we built for places where internet and network signal are not reliable. It is designed to keep track of a patient\'s health, remind them about their medicines, and alert a caregiver, even with no internet.',
                    'I led a team of five, called Fight Club, and we presented AyuLink at Pragathi 2.0, the project expo at SR University, Warangal, in October 2026.',
                ],
                images: [
                    {
                        src: '/blog/ayulink/team-at-stall.jpeg',
                        alt: 'The AyuLink team standing at their stall at the Pragathi 2.0 project expo, SR University',
                        caption: 'The AyuLink team at our stall at Pragathi 2.0.',
                    },
                ],
            },
            {
                heading: 'Winning 1st Prize',
                paragraphs: [
                    'We showed a complete working model live to the judges and faculty, and AyuLink won 1st Prize in the Health domain.',
                ],
                images: [
                    {
                        src: '/blog/ayulink/award-certificate-trophy.png',
                        alt: '1st Prize certificate of achievement and trophy from Pragathi 2.0, SR University',
                        caption: 'The 1st Prize certificate and trophy.',
                        portrait: true,
                    },
                    {
                        src: '/blog/ayulink/prize-distribution.jpeg',
                        alt: 'Prize distribution at Pragathi 2.0 with the AyuLink team receiving the trophy and certificates',
                        caption: 'Receiving the prize at the Pragathi 2.0 prize distribution.',
                    },
                ],
            },
            {
                heading: 'Thank you',
                paragraphs: [
                    'Thank you to my four teammates, and to the faculty and organisers of Pragathi 2.0 at SR University for the opportunity.',
                ],
            },
            {
                heading: 'Read more',
                links: [
                    {
                        label: 'My LinkedIn post about the win',
                        href: 'https://lnkd.in/p/dudy6uU4',
                        external: true,
                    },
                    {
                        label: 'AyuLink project page',
                        href: '/projects/ayulink',
                    },
                ],
            },
        ],
    },
    {
        slug: 'vengala-gagan-chandra-tej-full-stack-developer-warangal',
        title: 'Vengala Gagan Chandra Tej: Full Stack Developer from Warangal',
        description:
            'Who is Vengala Gagan Chandra Tej? A B.Tech CSE (AI & ML) student at SR University, Warangal, building full-stack and AI projects like AyuLink, VanSetu, FedLearn Hub and StudyMate AI.',
        date: '2026-11-13',
        tags: ['Full Stack', 'AI/ML', 'Warangal', 'SR University'],
        related: ['ayulink', 'vansetu', 'fedlearn-hub', 'studymate-ai'],
        sections: [
            {
                paragraphs: [
                    'Hi, I am Vengala Gagan Chandra Tej, a Full Stack Developer from Warangal, Telangana. I am a B.Tech Computer Science (AI & ML) student at SR University, Warangal, and I expect to graduate in 2028.',
                    'This post is a short introduction to who I am, what I build, and where to find my work. If you searched for my name, my portfolio, or SR University student developers, this is the best place to start.',
                ],
            },
            {
                heading: 'What I build',
                paragraphs: [
                    'I work across the stack. On the frontend I use React, Next.js, TypeScript and Tailwind CSS. On the backend I use Node.js, Express and FastAPI, with PostgreSQL, MongoDB and Redis for data. I deploy on Vercel and Render, and I use AWS and Docker for cloud and DevOps work.',
                    'On the AI side I work on machine learning, deep learning, RAG systems and LLM integration.',
                ],
            },
            {
                heading: 'Projects I am proud of',
                bullets: [
                    'AyuLink: a low-cost, fully offline patient monitoring system for rural areas, built by a 5-member team that I led. It won 1st Prize in the Health domain at Pragathi 2.0, SR University.',
                    'VanSetu: an AI-powered FRA Atlas and WebGIS decision support system built for Smart India Hackathon 2026, selected among 100 teams in the college internal round.',
                    'FedLearn Hub: a federated learning platform where users train a model together in the browser with TensorFlow.js.',
                    'StudyMate AI: an AI study and placement companion with RAG-grounded answers, flashcards, quizzes and spaced repetition.',
                    'HomelyHub, Quill AI, RuleBot and SRU Lost & Found: more full-stack projects, listed on my projects page.',
                ],
            },
            {
                heading: 'Learning and internships',
                paragraphs: [
                    'Alongside my degree I completed an 8-week MERN Full Stack virtual internship and an 8-week Data Science virtual internship through AICTE-EduSkills, and a MERN internship with Emertxe and Webstack Academy, where I built HomelyHub from scratch.',
                    'I also hold the Oracle Certified Foundations Associate (Agentic AI) certification and the NVIDIA Fundamentals of Deep Learning certificate.',
                ],
            },
            {
                heading: 'Where to find me',
                paragraphs: [
                    'My code is on GitHub, my problem solving is on LeetCode and GeeksforGeeks, and my data science work is on Kaggle. You can also find me on LinkedIn, Google Scholar and ResearchGate. All the links are on the About page.',
                    'I plan to write here about the projects I build, what went wrong, and what I learned, starting with AyuLink and FedLearn Hub.',
                ],
            },
        ],
    },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);