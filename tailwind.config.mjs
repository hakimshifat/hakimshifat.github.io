/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Bookerly', 'Literata', 'Merriweather', 'serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
			},
			maxWidth: {
				content: '1100px',
			},
		},
	},
	plugins: [],
};
