/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
      extend: {
        colors: {
          blue: {
            400: '#20bfd1',
            500: '#149caf',
            600: '#0d7183',
          },
        },
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
