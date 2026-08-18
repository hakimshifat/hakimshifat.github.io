/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
      extend: {
        colors: {
          blue: {
            400: '#c997ff',
            500: '#b879f5',
            600: '#a85be8',
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
