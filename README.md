# 🚀 IntelliLearn360

![Next.js](https://img.shields.io/badge/Next.js-15.3.0-blue?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.11-blue?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma)
![IBM RAG](https://img.shields.io/badge/IBM-RAG-blue?logo=ibm)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

---

## 🌟 Overview

**IntelliLearn360** is a unified, modern educational platform that empowers learners with personalized learning paths, real-time AI tutoring, hands-on project experiences, and comprehensive career development tools. Built with the latest web technologies and enhanced by IBM's Retrieval-Augmented Generation (RAG), it bridges the gap between learning and career success.

---

## ✨ Key Features

- 🎯 **Personalized Learning Paths**: Adaptive courses and modules tailored to each learner.
- 🤖 **AI-Powered Tutoring**: Real-time, context-aware support using IBM RAG and Groq AI.
- 📝 **Hands-on Projects**: Practical, portfolio-building project experiences.
- 🚀 **Career Development**: Job search, skill assessment, and resume tools.
- 📊 **Progress Tracking**: Visual dashboards and analytics for learners.
- 🔒 **Secure Authentication**: Powered by Clerk.
- 🌗 **Modern UI/UX**: Responsive, accessible, and beautiful design.

---

## 🏗️ Architecture Blueprint

```mermaid
graph TD;
  A[Frontend: Next.js + React + Tailwind] -->|API Calls| B[Backend: Next.js API Routes]
  B --> C[Prisma ORM]
  C --> D[(PostgreSQL DB)]
  B --> E[IBM RAG]
  B --> F[Groq AI]
  B --> G[Clerk Auth]
  A --> H[UI Library]
```

---

## 🤖 Role of Gen AI (IBM RAG)

- Powers the AI tutor for real-time, context-aware answers.
- Retrieves relevant info from curated knowledge sources.
- Combines retrieval with generative AI for accurate, reliable support.
- Enhances learning, project guidance, and career advice.

---

## 🛠️ Technologies Used

- **IBM RAG**: Retrieval-Augmented Generation for AI tutoring
- **Next.js & React**: Modern frontend framework
- **TypeScript**: Type-safe development
- **Tailwind CSS & Radix UI**: Modern, accessible UI
- **Prisma & PostgreSQL**: Robust data management
- **Clerk**: Secure authentication
- **Groq API**: Generative AI
- **Turborepo**: Monorepo management

---

## 🚦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/prajwal-pl/edtech-production
   cd edtech-production
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your secrets (DB, Clerk, Groq, IBM RAG, etc.)
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open in browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## 📂 Monorepo Structure

- `apps/web` — Main Next.js app
- `packages/ui` — Shared UI components
- `packages/eslint-config` — Shared linting rules
- `packages/typescript-config` — Shared TypeScript configs

---

## 💡 Contributing

We welcome contributions! Please open issues or pull requests for suggestions, bug fixes, or new features.

---

## 📄 License

[MIT](LICENSE)

---

> Built with ❤️ by the IntelliLearn360 Team
