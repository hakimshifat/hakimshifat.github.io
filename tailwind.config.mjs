/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				primary: ['Roboto Condensed', 'Geist', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
			},
			fontSize: {
				xs: '0.75rem',
				sm: '0.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
				'4xl': '2.5rem',
				'5xl': '3.5rem',
			},
			colors: {
				'axe-bg': '#0a0a0a',
				'axe-card': '#141414',
				'axe-hover': '#1a1a1a',
				'axe-fg': '#e5e5e5',
				'axe-muted': '#888888',
				'axe-muted-2': '#555555',
				'axe-border': 'rgba(255, 255, 255, 0.08)',
				'axe-border-hover': 'rgba(255, 255, 255, 0.15)',
				'accent-red': '#e03131',
				'accent-blue': '#228be6',
				'accent-green': '#40c057',
				'accent-yellow': '#fcc419',
				'accent-purple': '#ae3ec9',
				'accent-teal': '#20c997',
			},
			borderRadius: {
				'card': '12px',
			},
		},
	},
	plugins: [],
};
