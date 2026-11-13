export type Project = {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    highlights: string[];
    stack: string[];
    live?: string;
    github?: string;
};

export const projects: Project[] = [
    {
        slug: 'studymate-ai',
        name: 'StudyMate AI',
        tagline: 'AI-powered study and placement companion for engineering students',
        description:
            'StudyMate AI is a full-stack platform that helps engineering students study and prepare for placements. Students upload their own class notes and PDFs, and the platform generates summaries, flashcards and quizzes. A RAG-grounded chatbot answers questions using only the uploaded material, with real source citations. A self-trained Half-Life Regression model predicts memory retention to drive adaptive spaced repetition. An interactive knowledge graph shows how concepts connect across notes, and a resume-vs-job-description analyzer finds skill gaps for placement prep.',
        highlights: [
            'AI-generated summaries, flashcards and quizzes from your own notes',
            'RAG-grounded doubt-solving chat with source citations',
            'Half-Life Regression model for adaptive spaced repetition',
            'Interactive knowledge graph across uploaded documents',
            'Resume vs job-description skill-gap analyzer',
        ],
        stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Gemini', 'Groq', 'Scikit-Learn', 'Tailwind CSS', 'Vercel', 'Render'],
        live: 'https://studymate-aix.vercel.app/',
        github: 'https://github.com/Gagan3287/Student-Ai',
    },
    {
        slug: 'quill-ai',
        name: 'Quill AI',
        tagline: 'RAG-powered writing and research assistant',
        description:
            'Quill AI is an AI-powered platform for writing, research and knowledge synthesis. It helps brainstorm ideas, draft content, summarize documents, answer complex questions and refine writing in one interface, with document chat and contextual Q&A.',
        highlights: [
            'AI-powered writing and content generation',
            'Smart document summarization',
            'Context-aware Q&A and research assistant',
            'Multi-model support for diverse tasks',
        ],
        stack: ['Next.js', 'OpenAI', 'Vercel', 'TypeScript', 'Tailwind CSS'],
        live: 'https://quill-ai-eight.vercel.app/',
        github: 'https://github.com/Gagan3287/Quill-AI',
    },
    {
        slug: 'rulebot',
        name: 'RuleBot',
        tagline: 'Rule-based AI chatbot with a Next.js frontend and FastAPI backend',
        description:
            'RuleBot is a full-stack chatbot that gives context-aware responses through a deterministic rule-based engine, with no generative AI required. It has a Next.js chat interface, a FastAPI backend, REST API communication, Docker containerisation and deployment on Vercel and Render. The project demonstrates clean frontend-backend integration and a modular architecture that is easy to extend.',
        highlights: [
            'Rule-based response engine',
            'Responsive Next.js chat UI',
            'FastAPI backend with REST API',
            'Dockerised and deployed on Vercel and Render',
        ],
        stack: ['Next.js', 'React', 'FastAPI', 'Python', 'Docker', 'REST API', 'Vercel', 'Render'],
        live: 'https://codsoft-task-01-phi.vercel.app/',
        github: 'https://github.com/Gagan3287/Rule-Bot_Ai',
    },
    {
        slug: 'ayulink',
        name: 'AyuLink',
        tagline: 'Low-cost, fully offline patient monitoring system for rural areas',
        description:
            'AyuLink is a patient monitoring system that works with no internet or network signal. A smart wristband, a gateway and a smart hub connected over a LoRa mesh network track patient health, remind patients about medicines through a smart pill dispenser, and alert caregivers. I led a 5-member team (Fight Club) and demonstrated a complete working model live to judges and faculty. The project won 1st Prize in the Health domain at Pragathi 2.0, SR University.',
        highlights: [
            'Smart wristband, gateway and smart hub',
            'LoRa mesh network that works fully offline',
            'Smart pill dispenser with medicine reminders',
            'Caregiver alerts without internet',
            '1st Prize, Health Domain, Pragathi 2.0, SR University',
        ],
        stack: ['LoRa', 'IoT', 'Embedded Systems'],
    },
    {
        slug: 'vansetu',
        name: 'VanSetu',
        tagline: 'AI-powered FRA Atlas and WebGIS decision support system',
        description:
            'VanSetu is a full-stack GIS platform built for Smart India Hackathon 2026 (problem statement SIH12508, Ministry of Tribal Affairs) with team Byte Owls, selected among 100 teams in the college internal round. It has 4-role access control, append-only audit logging with PII masking, and secure evidence upload with MIME and EXIF validation and signed URLs.',
        highlights: [
            '4-role RBAC with JWT and refresh token rotation',
            'Append-only audit log with PII masking',
            'Secure evidence upload (MIME/EXIF validation, signed URLs)',
        ],
        stack: ['React', 'TypeScript', 'Leaflet', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'PostGIS'],
    },
    {
        slug: 'fedlearn-hub',
        name: 'FedLearn Hub',
        tagline: 'Federated learning in the browser with TensorFlow.js',
        description:
            'FedLearn Hub is a full-stack federated learning platform where users collaboratively train an MNIST classifier in their browsers using TensorFlow.js. A FastAPI backend aggregates client updates with FedAvg, and a weight-norm sanity check rejects malicious client updates. The frontend is deployed on Vercel and the backend on Render, with PostgreSQL and Redis.',
        highlights: [
            'In-browser model training with TensorFlow.js',
            'FedAvg aggregation on a FastAPI backend',
            'Weight-norm check to reject malicious updates',
        ],
        stack: ['React', 'TensorFlow.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Vercel', 'Render'],
        live: 'https://fed-learn.vercel.app',
    },
    {
        slug: 'homelyhub',
        name: 'HomelyHub',
        tagline: 'AI-powered stay-booking platform built with the MERN stack',
        description:
            'HomelyHub is a full-stack stay-booking platform I built from scratch during the Emertxe x Webstack Academy MERN internship. Users search and filter stays by city, dates and budget. An AI trip planner generates budget-matched day-by-day itineraries, and property descriptions are written with AI (Groq). It uses JWT authentication with hashed passwords and prevents double bookings.',
        highlights: [
            'Search and filter by city, dates and budget',
            'AI trip planner and AI-written property descriptions',
            'Double-booking prevention',
        ],
        stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB'],
        live: 'https://homely-hubx.vercel.app',
    },
    {
        slug: 'sru-lost-found',
        name: 'SRU Lost & Found',
        tagline: 'Lost-and-found platform for SR University students',
        description:
            'SRU Lost & Found is a full-stack platform for SR University with two-way lost and found reporting, smart location tagging, a private tokenized resolve flow, automatic 10-day post expiry, an authenticated admin moderation dashboard and abuse reporting.',
        highlights: [
            'Two-way lost and found reporting',
            'Private tokenized resolve flow',
            'Automatic 10-day post expiry',
            'Admin moderation dashboard',
        ],
        stack: ['Full Stack', 'Vercel'],
        live: 'https://sru-lost-found.vercel.app',
    },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);