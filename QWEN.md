# QWEN.md - Project Context

## Project Overview

**Monolith OS Portfolio** is a dark, technical, editorial portfolio and blog built with [Astro](https://astro.build/). The project features a minimalist, cyberpunk-inspired aesthetic with terminal-style interactions and high-contrast design. It serves as a personal portfolio showcasing writing (blog), projects, media consumption, education, and contact information.

### Key Features

- **Content Collections**: Blog posts, projects, media reviews, and about pages managed via Astro's content collections
- **Terminal Component**: Interactive React-based terminal widget with Easter egg commands
- **Dual Theme System**: Toggle between "terminal" (dark) and "minimal" (light) themes
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type-Safe Content**: Zod schemas for content validation

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Astro 5.x |
| Language | TypeScript |
| Styling | Tailwind CSS 3.x |
| UI Components | React 19.x (for interactive components) |
| Animation | Motion (Framer Motion for React) |
| Icons | Lucide React |
| AI Integration | @google/genai (Gemini API) |
| Fonts | Inter, JetBrains Mono, Playfair Display (Google Fonts) |

## Project Structure

```
monolith-os-portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── BlogSearch.tsx   # Blog search functionality
│   │   ├── MediaGallery.tsx # Media gallery component
│   │   └── Terminal.tsx     # Interactive terminal widget
│   ├── content/             # Markdown content collections
│   │   ├── about/           # About page content
│   │   ├── blog/            # Blog posts
│   │   ├── media/           # Media reviews (movies, series, anime, books)
│   │   ├── projects/        # Project showcases
│   │   └── config.ts        # Content collection schemas
│   ├── layouts/
│   │   └── Layout.astro     # Main layout with theme toggle
│   └── pages/
│       ├── blog/            # Blog listing and post pages
│       ├── media/           # Media gallery pages
│       ├── projects/        # Projects listing
│       ├── about.astro      # About page
│       ├── contact.astro    # Contact page
│       ├── education.astro  # Education page
│       └── index.astro      # Homepage
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Building and Running

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"
```

### Development

```bash
npm run dev
```

Runs the development server on `http://localhost:3000` (also accessible on `0.0.0.0:3000` for network access).

### Production Build

```bash
npm run build
```

Builds the static site to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting & Type Checking

```bash
npm run lint
```

Runs Astro check and TypeScript type checking.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run start` | Alias for dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |
| `npm run lint` | Type check and lint project |

## Content Management

### Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A brief description for SEO and listing"
pubDate: "2026-03-21"
tags: ["TAG1", "TAG2"]
heroImage: "https://example.com/image.jpg" # optional
---

# Your content here
```

### Adding Projects

Create a new `.md` file in `src/content/projects/`:

```markdown
---
title: "Project_Name"
description: "Project description"
pubDate: "2026-03-21"
tags: ["tech1", "tech2"]
link: "https://github.com/your/project" # optional
---

# Project details
```

### Adding Media Reviews

Create a new `.md` file in `src/content/media/`:

```markdown
---
title: "Media Title"
category: "movie" # or "series", "anime", "book"
image: "https://example.com/poster.jpg"
rating: "9/10" # optional
year: "2024" # optional
status: "Completed" # optional
pubDate: "2026-03-21"
---

# Review content
```

## Development Conventions

### Code Style

- **TypeScript**: Strict mode enabled via `astro/tsconfigs/strict`
- **Path Aliases**: Use `@/*` for `./src/*` imports
- **Component Style**: React components for interactive elements, Astro for static pages
- **Naming**: PascalCase for components, kebab-case for files

### Design System

The project uses CSS custom properties for theming:

```css
:root {
  --bg: #050505;      /* Background */
  --ink: #E4E3E0;     /* Text */
  --accent: #00FF00;  /* Accent (green in terminal theme) */
  --line: rgba(255, 255, 255, 0.05); /* Borders */
  --grid: rgba(255, 255, 255, 0.02); /* Grid lines */
}
```

### Component Patterns

- **Astro Components**: Use for static content and pages
- **React Components**: Use for interactive features (Terminal, search, galleries)
- **Client Directives**: Use `client:load` for React components that need hydration

### Content Schema

All content collections are validated with Zod schemas in `src/content/config.ts`. This ensures consistent frontmatter across all content types.

## Terminal Commands

The Terminal component supports these interactive commands:

- `help` - List available commands
- `about` - Project description
- `status` - System status
- `whoami` - User info
- `ls` - List files
- `cat [file]` - Read file contents
- `socials` - Social media links
- `contact` - Contact information
- `projects` - List projects
- `blog` - Latest blog posts
- `neofetch` - System info (easter egg)
- `matrix` - Matrix reference (easter egg)
- `hack` - Brute force simulation (easter egg)
- `clear` - Clear terminal
- `exit` - Close terminal

## Deployment

The project outputs static files and can be deployed to any static hosting:

- **Netlify**: Connect repository, build command `npm run build`, publish directory `dist/`
- **Vercel**: Auto-detects Astro, deploy with default settings
- **Cloudflare Pages**: Connect repository, build command `npm run build`, output directory `dist`
- **GitHub Pages**: Use Astro's GitHub Pages integration

## Notes

- The project was originally created from Google AI Studio
- Gemini API integration is available for AI-powered features
- Theme preference is persisted in localStorage
- All images use `referrerpolicy="no-referrer"` for privacy
