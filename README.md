# hakimshifat.me

Security-focused portfolio and technical writing archive built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and vanilla JavaScript. The site combines a curated professional portfolio with an Obsidian-friendly Markdown publishing workflow backed by GitHub.

**Live →** [hakimshifat.me](https://hakimshifat.me)

---

## Preview

| Section | Description |
|---|---|
| **Hero** | Name, tagline, blurb, profile photo, CTA buttons |
| **About** | Bio paragraphs + stats grid (years building, projects, CTF rank) |
| **Experience** | Timeline cards — CTF team, open-source contributions, campus role |
| **Projects** | Project cards with screenshots, tech tags, and GitHub links |
| **Skills** | Categorized skill pills + certifications |
| **Achievements** | 10 CTF competition results with color-coded type badges |
| **Writing** | Obsidian-friendly Markdown archive with search, tags, related notes, and RSS-ready metadata |
| **Contact** | Email, GitHub, LinkedIn, Discord |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) v5 — static site generator |
| Styling | [Tailwind CSS](https://tailwindcss.com) v3 — utility-first CSS |
| Typography | [Inter](https://rsms.me/inter/) (body) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (code) |
| Animations | CSS transitions + `IntersectionObserver` — no external libraries |
| Content | Astro content collections, Markdown, Obsidian wiki-link transformer |
| Metadata | Canonical URLs, Open Graph image, robots policy, and sitemap |
| Deployment | [GitHub Pages](https://pages.github.com) via static build |

### What's intentionally *not* used

- No runtime JS framework (React is a dep but unused — could be removed)
- No animation libraries (GSAP, Framer Motion, Lenis)
- No CSS-in-JS or CSS modules
- No runtime CMS; Markdown is rendered at build time from the repository

---

## Project Structure

```
├── public/
│   ├── abdulhakim.png                 # Profile photo
│   └── images/projects/              # Project screenshots
│       ├── port.png
│       ├── x86.png
│       └── yt2.png
│
├── src/
│   ├── content/
│   │   ├── blog/                      # Published Markdown notes and writeups
│   │   └── config.ts                  # Frontmatter schema and draft filtering
│   ├── components/
│   │   ├── Navbar.astro               # Sticky nav + mobile hamburger menu
│   │   ├── Hero.astro                 # Full-viewport intro section
│   │   ├── About.astro                # Bio + 2×2 stats grid
│   │   ├── Experience.astro           # 4 experience timeline cards
│   │   ├── Projects.astro             # 2×2 project card grid
│   │   ├── Skills.astro               # Skill pills + certifications
│   │   ├── Achievements.astro         # CTF results grid
│   │   ├── Contact.astro              # Contact method cards
│   │   └── Footer.astro               # Copyright + social links
│   │
│   ├── layouts/
│   │   └── Layout.astro               # HTML shell, fonts, IntersectionObserver
│   │
│   ├── pages/
│   │   └── index.astro                # Single page — imports all components
│   │
│   └── styles/
│       └── global.css                 # Design tokens, scroll-reveal, nav states
│
├── docs/obsidian-publishing.md        # Public writing workflow
├── templates/                          # Copyable Obsidian note templates
├── astro.config.mjs                   # Astro + Tailwind + sitemap integration
├── tailwind.config.mjs                # Font families + content paths
├── tsconfig.json
├── package.json
└── CNAME                              # Custom domain: hakimshifat.me
```

---

## How It Works

### Build Pipeline

```
astro build
  → Reads Astro pages and Markdown content collections
  → Applies frontmatter validation and Obsidian wiki-link transforms
  → Renders portfolio and published notes to static HTML
  → Generates sitemap, robots policy, Open Graph assets, and RSS-ready metadata
  → Tailwind tree-shakes CSS and Vite outputs the static site
```

### Runtime Behavior

The site ships **one HTML file** with three small scripts:

1. **IntersectionObserver** — watches `.reveal` elements, adds `.visible` class on viewport entry (once), triggering a CSS `opacity + translateY` transition over 600ms.
2. **Scroll listener** — toggles `.nav-scrolled` on the navbar when `scrollY > 20px`, adding a backdrop-blur background.
3. **Mobile menu toggle** — shows/hides the mobile nav dropdown on hamburger click.

No SPA router. Navigation is native anchor scrolling (`#about`, `#projects`, etc.) powered by `scroll-behavior: smooth` in CSS.

### Animation System

```css
/* Elements start hidden */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* IntersectionObserver adds this class on scroll */
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Children inside .stagger containers get incremental delays */
.stagger > .reveal:nth-child(1) { transition-delay: 0ms;  }
.stagger > .reveal:nth-child(2) { transition-delay: 80ms; }
/* ... */
```

Respects `prefers-reduced-motion` — all animations are disabled when the user has motion reduction enabled.

---

## Design System

### Color Palette

```
Background     #09090b     (near-black)
Elevated       #18181b     (cards, nav)
Border         #27272a     (default)
Border Hover   #3f3f46     (interactive)
Text           #fafafa     (primary)
Text Secondary #a1a1aa     (muted)
Text Muted     #71717a     (tertiary)
Accent         #3b82f6     (blue — links, highlights)
Accent Hover   #60a5fa     (blue — hover state)
```

### Typography

| Usage | Font | Weight |
|---|---|---|
| Headings | Inter | 600–700 |
| Body | Inter | 300–400 |
| Tags, dates, metadata | JetBrains Mono | 400 |

### Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| < 640px | Single column, stacked sections |
| 640px – 1024px | 2-column grids |
| > 1024px | Full layout, max-width 1100px centered |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 22
- npm

### Install & Run

```bash
# Clone
git clone https://github.com/hakimshifat/hakimshifat.github.io.git
cd hakimshifat.github.io

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
# → Static output in dist/
```

### Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Deployment

The site deploys to **GitHub Pages** automatically through the workflow in `.github/workflows/`. The `CNAME` file maps the custom domain `hakimshifat.me`.

For the complete Obsidian publishing conventions, see [`docs/obsidian-publishing.md`](docs/obsidian-publishing.md). Copyable note templates are available in [`templates/`](templates/).

To deploy manually:

```bash
npm run build
# Push the dist/ folder or let GitHub Actions handle it
```

---

## Customization

### Changing Content

Portfolio data such as experience, projects, skills, and achievements is maintained in the respective component files under `src/components/`. Blog posts and technical notes live in `src/content/blog/` as Markdown files and use the schema documented in [`docs/obsidian-publishing.md`](docs/obsidian-publishing.md).

The recommended workflow is to write in Obsidian, review a note, move it into the public publishing folder, and let GitHub Actions build the site. `draft: true` keeps a note out of the generated site, but private notes should never be pushed to a public repository.

### Changing Colors

Edit the CSS custom properties in `src/styles/global.css`:

```css
:root {
  --accent: #3b82f6;     /* Change this for a different accent color */
  --bg: #09090b;         /* Background */
  /* ... */
}
```

### Adding a Section

1. Create `src/components/NewSection.astro`
2. Import it in `src/pages/index.astro`
3. Add a nav link in `src/components/Navbar.astro`

---

## License

MIT

---

Built by [Abdul Hakim Shifat](https://hakimshifat.me)
