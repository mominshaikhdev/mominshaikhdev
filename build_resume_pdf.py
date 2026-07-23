import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

os.makedirs("public", exist_ok=True)

pdf_filename = os.path.join("public", "resume.pdf")

doc = SimpleDocTemplate(
    pdf_filename,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
primary_color = colors.HexColor("#0f172a")
accent_color = colors.HexColor("#0284c7")
text_color = colors.HexColor("#334155")

name_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=primary_color,
    alignment=TA_CENTER
)

subtitle_style = ParagraphStyle(
    'SubTitleStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=accent_color,
    alignment=TA_CENTER
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    textColor=text_color,
    alignment=TA_CENTER
)

heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=15,
    textColor=primary_color,
    spaceBefore=8,
    spaceAfter=4
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    textColor=text_color,
    alignment=TA_JUSTIFY
)

bold_body_style = ParagraphStyle(
    'BoldBodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12,
    textColor=primary_color
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=text_color,
    leftIndent=12,
    firstLineIndent=-8,
    spaceBefore=2
)

story = []

# Header
story.append(Paragraph("Momin Shaikh", name_style))
story.append(Spacer(1, 2))
story.append(Paragraph("Full-Stack Software Engineer &bull; AI Integration Specialist", subtitle_style))
story.append(Spacer(1, 4))
story.append(Paragraph("+880-1405-374822 &nbsp;|&nbsp; thisismominshaikh@gmail.com &nbsp;|&nbsp; linkedin.com/in/themominshaikh &nbsp;|&nbsp; github.com/mominshaikhdev", contact_style))
story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=1, color=accent_color, spaceAfter=8))

# Professional Summary
story.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
summary_text = "Full-stack software engineer with hands-on experience building production-grade web applications using React, Next.js, Express.js, Django, Laravel, and AI integrations. Proven ability to design scalable architectures including multi-step agentic AI systems, multi-tenant SaaS platforms, RAG-powered AI platforms, and real-time applications. Strong foundation in data structures, algorithms, and system design. Fluent in English and Bengali."
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 8))

# Technical Skills
story.append(Paragraph("TECHNICAL SKILLS", heading_style))
skills_data = [
    ("Languages:", "JavaScript (ES6+), TypeScript, Python, PHP, HTML5, CSS3"),
    ("Frameworks & Libraries:", "React.js, Next.js, Express.js, Node.js, Django, DRF, Laravel, LangChain, LangGraph, Zustand, TanStack Query, Tailwind CSS, REST, GraphQL, WebSockets, Stripe API, OpenAI API, Gemini API, Groq SDK, Better Auth, Clerk, Sanctum, GSAP, Framer Motion, Three.js, Recharts"),
    ("AI & ML:", "Retrieval-Augmented Generation (RAG), OpenAI GPT, Google Gemini (Function Calling / Tool Loops), Groq (Llama 3.3 70B, Llama 3.2 Vision), Agentic AI Systems, Whisper STT, TTS, Vercel AI SDK, Vector Databases (Pinecone/Qdrant), MLOps"),
    ("Databases:", "PostgreSQL, MySQL, MongoDB, Redis, Prisma ORM, Mongoose ORM, Eloquent ORM, query optimization, N+1 elimination, eager loading"),
    ("Tools & Platforms:", "Git, GitHub, Docker, Kubernetes, GitHub Actions (CI/CD), AWS, GCP, Vercel, Railway, Sentry, Linux/Unix CLI, Uploadthing, Vite, i18Next"),
    ("Concepts:", "Multi-tenant Architecture, RBAC, Agentic AI Systems, Dual-DB Architecture, Event-Driven Architecture, Microservices, SPA, CI/CD, RESTful API Design, Webhooks")
]

for label, val in skills_data:
    p = Paragraph(f"<b>{label}</b> {val}", body_style)
    story.append(p)
    story.append(Spacer(1, 2))

story.append(Spacer(1, 6))

# Experience
story.append(Paragraph("EXPERIENCES", heading_style))

# Job 1
story.append(Paragraph("<b>Independent | Open-Source Developer</b> &nbsp;&bull;&nbsp; <i>2020 &ndash; Present</i>", bold_body_style))
story.append(Paragraph("<i>Remote</i>", body_style))
story.append(Paragraph("&bull; Designed and shipped multiple full-stack open-source projects spanning agentic AI systems, SaaS platforms, real-time collaboration tools, and multi-tenant architectures — entirely self-directed.", bullet_style))
story.append(Paragraph("&bull; Built CodeFusion Research Agent — a Django/Next.js AI agent using Google Gemini 2.0 Flash function calling to autonomously explore GitHub repositories and answer deep technical questions.", bullet_style))
story.append(Paragraph("&bull; Engineered Collaborative Team Hub with dual-database architecture (PostgreSQL + MongoDB), real-time Socket.IO, JWT auth, RBAC, and Kanban workflows deployed on Railway.", bullet_style))
story.append(Paragraph("&bull; Contributed reusable, well-documented codebases to GitHub; maintained production deployments on Vercel and Railway with CI/CD pipelines.", bullet_style))
story.append(Spacer(1, 6))

# Job 2
story.append(Paragraph("<b>WebFlow Developer</b> &nbsp;&bull;&nbsp; <i>2020 &ndash; 2023</i>", bold_body_style))
story.append(Paragraph("<i>Flow Seek &bull; Khulna, Bangladesh</i>", body_style))
story.append(Paragraph("&bull; Designed and built 20+ responsive marketing websites and landing pages in Webflow for clients across e-commerce, real estate, and local service industries.", bullet_style))
story.append(Paragraph("&bull; Architected reusable Webflow CMS collections (blog, portfolio, case studies, team profiles) that empowered non-technical clients to self-manage content post-launch.", bullet_style))
story.append(Paragraph("&bull; Implemented custom scroll-triggered animations and micro-interactions using Webflow's native interaction engine, improving on-page engagement.", bullet_style))
story.append(Paragraph("&bull; Optimized on-page SEO fundamentals — semantic HTML, meta tags, structured data, image compression, and Core Web Vitals — consistently achieving 90+ Lighthouse scores.", bullet_style))
story.append(Paragraph("&bull; Extended Webflow's native functionality with custom JavaScript embeds and third-party integrations (Google Analytics, Mailchimp, Stripe, Zapier).", bullet_style))
story.append(Spacer(1, 8))

# Projects
story.append(Paragraph("FEATURED PROJECTS", heading_style))

projects_list = [
    ("VentureForge AI", "Next.js 15, Express.js, MongoDB, Groq SDK, Better Auth, Recharts, Tailwind CSS | 2026", "Architected full-stack AI startup incubator & financial validation portal with Groq Llama 3.3 70B startup evaluation engine, CFO AI audit financial forecasting dashboard, and Llama 3.2 11B Vision pitch deck analysis."),
    ("CodeFusion Research Agent", "Django, DRF, PostgreSQL, Gemini 2.0 Flash, Next.js 16, React 19, TypeScript | 2026", "Autonomous technical AI agent exploring GitHub repositories via 24-round bounded tool loop in Gemini 2.0 Flash with 4-table PostgreSQL audit trail."),
    ("Collaborative Team Hub", "Next.js, Express, PostgreSQL, MongoDB, Prisma ORM, Socket.IO, Zustand | 2026", "Full-stack collaborative workspace with dual-database architecture, real-time Socket.IO rooms, stateless JWT with transparent refresh queue, and drag-and-drop Kanban."),
    ("Bookified", "Next.js, LangChain, OpenAI, Stripe, Clerk, Vercel AI SDK | 2026", "Production SaaS platform for PDF chat via RAG pipeline with bi-directional OpenAI Whisper/TTS voice features and Vercel AI SDK streaming."),
    ("Multi-School Management System", "Laravel, React, TypeScript, Vite | 2026", "Multi-tenant educational system supporting isolated school data environments, granular 4-role RBAC, dynamic GPA calculation engine, and PDF report cards."),
    ("Acme Store", "Next.js, Stripe, Tailwind CSS, Zustand | 2026", "SEO-optimized storefront using Next.js Server Components with Stripe Checkout Session integration and automated webhook syncing.")
]

for name, tech, desc in projects_list:
    story.append(Paragraph(f"<b>{name}</b> &nbsp;|&nbsp; <i>{tech}</i>", bold_body_style))
    story.append(Paragraph(f"&bull; {desc}", bullet_style))
    story.append(Spacer(1, 3))

story.append(Spacer(1, 6))

# Education
story.append(Paragraph("EDUCATION", heading_style))
story.append(Paragraph("<b>LL.B (Hon's) in Al-Fiqh and Law</b> &nbsp;|&nbsp; Faculty of Law, Islamic University, Kushtia-Jhenaidah &nbsp;|&nbsp; <i>2019 &ndash; 2023</i>", bold_body_style))
story.append(Paragraph("CGPA: 3.28 / 4.00", body_style))
story.append(Spacer(1, 3))
story.append(Paragraph("<b>Higher Secondary Certificate (H.S.C), Science</b> &nbsp;|&nbsp; Nachole Govt. College, Rajshahi Board &nbsp;|&nbsp; <i>2018</i>", bold_body_style))
story.append(Paragraph("GPA: 4.58 / 5.00", body_style))
story.append(Spacer(1, 3))
story.append(Paragraph("<b>Secondary School Certificate (S.S.C), Science</b> &nbsp;|&nbsp; Maktapur High School, Rajshahi Board &nbsp;|&nbsp; <i>2015</i>", bold_body_style))
story.append(Paragraph("GPA: 5.00 / 5.00", body_style))

story.append(Spacer(1, 8))

# Additional
story.append(Paragraph("ADDITIONAL INFORMATION", heading_style))
story.append(Paragraph("<b>Languages:</b> English (Fluent), Bengali (Native), Hindi (Working knowledge)", body_style))
story.append(Paragraph("<b>Other Skills:</b> Strong analytical background in Philosophy and Physics; experienced with terminal/CLI on both Windows and Linux.", body_style))

doc.build(story)
print(f"Successfully generated {pdf_filename}")
