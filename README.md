# FromToday App

A goal management application built with React, TypeScript, and Vite.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Form Handling**: React Hook Form + Zod
- **AI Integration**: Anthropic Claude SDK
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier

## Project Structure

```
src/
├── app/              # Application setup and routing
├── features/         # Feature-based modules
│   ├── goals/       # Goal management
│   ├── ai-mentor/   # AI mentor integration
│   ├── dashboard/   # Dashboard view
│   ├── calendar/    # Calendar view
│   └── analytics/   # Analytics view
├── shared/          # Shared resources
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Utility functions
│   └── types/       # TypeScript types
├── services/        # Service layer
│   ├── api/         # API client
│   ├── ai/          # AI service (Anthropic)
│   └── storage/     # Local storage
└── store/           # Zustand store
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and add your API keys:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Environment Variables

See `.env.example` for required environment variables.

## Development Plan

See `DEVELOPMENT_PLAN.md` for the detailed development roadmap.
