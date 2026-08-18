export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  impact?: string;
  tags: string[];
  current?: boolean;
  link?: string;
};

/**
 * Add, edit, or remove professional experience here.
 * Keep one entry per role and use a stable kebab-case id.
 */
export const experiences: ExperienceEntry[] = [
  {
    id: 'cia-security-researcher',
    role: 'Co-Founder & Security Researcher',
    company: 'Cyb3r Invasi0n Army (CIA)',
    duration: 'Aug 2025 — Present',
    description:
      'Co-founded a competitive CTF team focused on cybersecurity. Coordinate team strategy for international CTF competitions, manage challenge assignments based on member expertise, conduct post-competition analysis, and organize training sessions.',
    tags: ['CTF', 'Cybersecurity', 'Leadership', 'Problem Solving'],
    impact: 'Global Rank #49 · National Rank #3 (Bangladesh)',
    current: true,
    link: 'https://ctftime.org',
  },
  {
    id: 'ytui-music-maintainer',
    role: 'Maintainer & Creator',
    company: 'YTUI Music (AUR)',
    duration: 'Mar 2026 — Present',
    description:
      'Created and maintain a terminal-based YouTube audio player published on the Arch User Repository. Full-stack TUI development with Textual, AUR packaging via PKGBUILD, and release management.',
    tags: ['Python', 'Textual', 'AUR', 'Open Source', 'MPV'],
    impact: 'Published on AUR · One-command install',
    current: true,
    link: 'https://github.com/hakimshifat/ytui_music',
  },
  {
    id: 'inir-open-source-contributor',
    role: 'Open Source Contributor',
    company: 'iNiR (snowarch)',
    duration: 'Feb 2026',
    description:
      'Contributed configurable bar scroll actions and global workspace scroll inversion to a Linux desktop shell built on Quickshell. Designed a reusable input abstraction layer and ensured cross-compositor compatibility.',
    tags: ['QML', 'Linux', 'Quickshell', 'Niri', 'UI'],
    impact: 'Cherry Picked & Merged (PR #53)',
    link: 'https://github.com/snowarch/iNiR/pull/53',
  },
  {
    id: 'geeksforgeeks-campus-ambassador',
    role: 'Campus Ambassador',
    company: 'GeeksforGeeks',
    duration: 'Jan 2026 — Present',
    description:
      'Official representative for GeeksforGeeks at Bangladesh University of Professionals. Promote technical resources, organize coding events and seminars, and build the campus tech community.',
    tags: ['Community', 'Leadership', 'Event Management', 'Tech Outreach'],
    current: true,
  },
];
