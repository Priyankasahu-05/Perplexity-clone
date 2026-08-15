
# Perplexity-clone

## Perplexed – AI Search & Answer Engine

Perplexed is a Perplexity-inspired AI search engine that combines web search, AI-generated answers, and multimedia search in a single interface.

The application supports multiple search modes and can also analyze uploaded documents to answer questions or generate useful summaries.

## Features

-  **Web Search** – Search the web and generate AI-powered answers.
-  **Academic Search** – Search for research and academic information.
-  **Streaming Answers** – Responses are streamed in real time.
-  **YouTube Search** – Find and watch relevant YouTube videos.
-  **Image Search** – Search and display relevant images.
-  **Video Search** – Search videos with an integrated video player.
-  **Reddit Search** – Search Reddit discussions and content.
-  **Writing Assistant** – Generate and improve written content.
-  **Document Upload** – Upload PDF, TXT, DOC, and DOCX files for analysis.
-  **Context-Aware Queries** – Follow-up questions use previous conversation context.
-  **Focus Modes** – Choose a specialized agent depending on the search requirement.

##  Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router

### Backend
- Node.js
- Express
- TypeScript
- LangChain

### AI & Search
- Groq
- Gemini
- SearXNG
- YouTube Search
- Reddit Search

## 📁 Project Structure

```text
Perplexity-Clone/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   ├── layout/
│   │   │   └── search/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── lib/
│   │   └── index.ts
│   └── package.json
│
├── .gitignore
└── README.md
