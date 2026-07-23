export interface FeaturedProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  image?: string;
  challenges: string[];
  futurePlans: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "ventureforge-ai",
    name: "VentureForge AI",
    tagline: "AI Startup Incubator & Financial Validation Portal",
    description:
      "A full-stack AI platform connecting Next.js 15 App Router with Express/MongoDB to auto-score venture viability, run CFO financial audits, and analyze pitch decks.",
    longDescription:
      "VentureForge AI is an end-to-end startup acceleration portal. It features an agentic evaluation engine powered by Groq LLM (llama-3.3-70b-versatile) that performs automated SWOT analysis, tech stack recommendations, and competitor gap analysis. It includes an interactive financial forecasting dashboard with CFO AI audit (parsing CSV/ledgers into dynamic Recharts) and multimodal pitch intelligence using Llama 3.2 11B Vision.",
    techStack: [
      "Next.js 15",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "Groq SDK (Llama 3.3 70B & 3.2 Vision)",
      "Better Auth",
      "TanStack Query",
      "Recharts",
      "Tailwind CSS v4",
      "Vercel",
    ],
    category: "AI & SaaS",
    liveUrl: "https://ventureforge-ai.vercel.app",
    githubUrl: "https://github.com/mominshaikhdev/VentureForge-AI",
    year: "2026",
    challenges: [
      "Handling cross-origin session authentication with Better Auth between Vercel serverless deployments and an external Express backend.",
      "Bounding LLM tool-calling loops to prevent infinite retries and optimize response latency.",
      "Parsing complex CSV ledgers and converting unstructured financial data into structured JSON schemas for real-time Recharts visualization.",
      "Optimizing base64 image encoding and token limits when running multimodal Llama 3.2 Vision analysis on dense pitch deck layouts.",
    ],
    futurePlans: [
      "Integrate real-time market data feeds via Financial Modeling Prep API for automated competitor valuation updates.",
      "Add multi-currency support and localized pitch deck parsing for international startup founders.",
      "Implement PDF export functionality for generated executive financial reports and SWOT summary decks.",
    ],
  },
  {
    id: "codefusion-research-agent",
    name: "CodeFusion Research Agent",
    tagline: "Autonomous Technical GitHub Codebase Explorer",
    description:
      "A full-stack AI research agent that answers complex technical questions about any GitHub repo through a bounded multi-step tool loop powered by Gemini 2.0 Flash.",
    longDescription:
      "CodeFusion Research Agent autonomously clones GitHub repositories and explores their file structures, search patterns, and content using a hard-capped 24-round tool loop. Built with a Django/DRF backend and a Next.js 16 / React 19 frontend, it provides live tool-call progress visualizers (AgenticLoader) and full pre-execution crash-safe audit trails in PostgreSQL.",
    techStack: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Google Gemini 2.0 Flash",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Gunicorn",
      "Railway",
      "Vercel",
    ],
    category: "Agentic AI",
    liveUrl: "https://codefusion-agent.vercel.app",
    githubUrl: "https://github.com/mominshaikhdev/CodeFusion-Research-Agent",
    year: "2026",
    challenges: [
      "Managing context window boundaries for large codebases by introducing smart truncation (120 KB/file, 40 search results cap, 2k-char finding truncation).",
      "Eliminating model hallucinations by enforcing strict grounding in actual cloned repository files via FunctionDeclaration + FunctionResponse tool patterns.",
      "Designing a 4-table PostgreSQL audit schema where tool call logs are written BEFORE results return to guarantee crash-safe execution history.",
      "Coalescing prior session findings to reduce 1-2 tool round-trips on repeated technical queries.",
    ],
    futurePlans: [
      "Incorporate vector embeddings with Qdrant for hybrid semantic + exact code search across massive repositories.",
      "Add multi-repository comparisons to allow architectural diffing across open-source codebases.",
      "Support AST-based code flow diagrams generation directly inside the research audit UI.",
    ],
  },
  {
    id: "collaborative-team-hub",
    name: "Collaborative Team Hub",
    tagline: "Dual-DB Workspace & Real-Time Collaboration Platform",
    description:
      "Full-stack collaborative workspace platform with dual-database architecture (PostgreSQL + MongoDB), Socket.IO real-time synchronization, and drag-and-drop Kanban.",
    longDescription:
      "Engineered with a Node.js/Express REST API backed by a dual-database architecture abstracted through Prisma ORM. Features stateless JWT authentication with database-persisted refresh tokens, short-lived access tokens via HttpOnly cookies, handshake-level Socket.IO verification, granular RBAC permission matrix, command palette, and optimistic UI updates in Next.js App Router.",
    techStack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Socket.IO",
      "Cloudinary",
      "Nodemailer",
      "Zustand",
      "Railway",
    ],
    category: "Full-Stack Web",
    liveUrl: "https://teamhub-demo.up.railway.app",
    githubUrl: "https://github.com/mominshaikhdev/collaborative-team-hub",
    year: "2026",
    challenges: [
      "Building a transparent Axios token refresh interceptor with a shared promise queue to coalesce concurrent 401 failures and prevent redundant refresh requests.",
      "Designing an automated deployment script that conditionally bootstraps either PostgreSQL or MongoDB based on environment variables.",
      "Maintaining real-time Socket.IO state synchronization across workspace-scoped rooms without incurring race conditions on bulk Kanban reorders.",
    ],
    futurePlans: [
      "Integrate WebRTC video & voice calls directly within team workspace channels.",
      "Add collaborative Markdown document editing with real-time cursor tracking.",
      "Develop a native mobile companion app using React Native.",
    ],
  },
  {
    id: "bookified",
    name: "Bookified",
    tagline: "RAG-Powered Conversational PDF Chat & Voice SaaS",
    description:
      "Production SaaS platform enabling users to chat with uploaded PDFs via RAG, featuring bi-directional OpenAI Whisper/TTS voice chat and Vercel AI SDK streaming.",
    longDescription:
      "Bookified leverages Retrieval-Augmented Generation (RAG) using LangChain and OpenAI to deliver contextually accurate answers from uploaded document PDFs. It integrates bi-directional voice features via OpenAI Whisper (speech-to-text) and OpenAI TTS (text-to-speech), word-by-word streaming responses, Stripe tiered subscription billing, and Clerk authentication.",
    techStack: [
      "Next.js",
      "LangChain",
      "OpenAI API",
      "OpenAI Whisper",
      "OpenAI TTS",
      "Stripe API",
      "Clerk",
      "Vercel AI SDK",
      "Uploadthing",
    ],
    category: "AI & SaaS",
    liveUrl: "https://bookified-ai.vercel.app",
    githubUrl: "https://github.com/mominshaikhdev/Bookified",
    year: "2026",
    challenges: [
      "Optimizing document text extraction and vector indexing pipeline with PDF-parse and Uploadthing to handle large files rapidly.",
      "Reducing perceived streaming latency by utilizing Vercel AI SDK word-by-word UI streaming alongside asynchronous TTS audio generation.",
      "Gating premium features (voice interaction and extended PDF file sizes) securely using custom middleware integrated with Stripe subscriptions.",
    ],
    futurePlans: [
      "Support multi-document chat sessions allowing users to query across an entire bookshelf simultaneously.",
      "Extract tables and mathematical equations into interactive rendering components.",
      "Add export options for generated summaries in Markdown, PDF, and Notion formats.",
    ],
  },
  {
    id: "multi-school-management",
    name: "Multi-School Management System",
    tagline: "Multi-Tenant Educational ERP with Automated GPA Calculations",
    description:
      "Enterprise multi-tenant Laravel & React platform with strict isolated data environments, role-based access control, and dynamic PDF report card generation.",
    longDescription:
      "Architected a multi-tenant database system supporting isolated data environments for concurrent schools using custom Laravel middleware and global query scopes. Implemented granular RBAC with Laravel Gates and Policies across four distinct roles (Admin, Teacher, Parent, Student), dynamic school-specific GPA calculation engine, and optimized RESTful APIs.",
    techStack: [
      "Laravel",
      "React.js",
      "TypeScript",
      "Vite",
      "MySQL",
      "Tailwind CSS",
      "RESTful API",
    ],
    category: "Enterprise System",
    liveUrl: "https://school-mgmt.vercel.app",
    githubUrl: "https://github.com/mominshaikhdev/multi-school-management",
    year: "2026",
    challenges: [
      "Enforcing strict data privacy and tenant isolation across global query scopes to prevent cross-tenant data leaks.",
      "Resolving N+1 database query issues across complex report card generation endpoints using eager loading and Laravel API Resources.",
      "Maintaining end-to-end type safety between Laravel backends and React frontends using TypeScript definitions.",
    ],
    futurePlans: [
      "Add parent SMS notification gateway for attendance and grade updates.",
      "Build an online quiz & examination portal with automated scoring.",
      "Integrate online tuition fee payment processing via local and international gateways.",
    ],
  },
  {
    id: "acme-store",
    name: "Acme Store",
    tagline: "Modern E-Commerce Storefront with Stripe Checkout & Webhooks",
    description:
      "High-performance Next.js Server Components e-commerce store with persistent Zustand shopping cart and automated Stripe webhook database sync.",
    longDescription:
      "Built an SEO-optimized product storefront using Next.js Server Components for lightning-fast load times. Integrated Stripe Checkout Sessions for secure payment flows with automated order confirmation via Stripe Webhooks, updating inventory and order statuses in real time.",
    techStack: [
      "Next.js",
      "Stripe API",
      "Tailwind CSS",
      "Zustand",
      "TypeScript",
      "Vercel",
    ],
    category: "E-Commerce",
    liveUrl: "https://acme-store-demo.vercel.app",
    githubUrl: "https://github.com/mominshaikhdev/acme-store",
    year: "2026",
    challenges: [
      "Handling asynchronous Stripe webhook events idempotently to ensure orders are not processed twice.",
      "Managing local persistent shopping cart state in Zustand while keeping client and server component hydrations seamless.",
    ],
    futurePlans: [
      "Implement instant search with instant autocomplete powered by Algolia/Meilisearch.",
      "Add customer review and rating features.",
      "Support multi-currency checkout automatically based on visitor geolocation.",
    ],
  },
];
