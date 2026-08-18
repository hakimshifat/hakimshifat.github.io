/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
      extend: {
        colors: {
          blue: {
            400: '#3b82f6',
            500: '#2563eb',
            600: '#1d4ed8',
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
