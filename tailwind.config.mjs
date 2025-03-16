/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#06B6D4',
      }
    },
	},
	plugins: [
    require('@tailwindcss/typography'),
  ],
}
