/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  skyblue: '#6ec8fa',
		  skyblue_light: '#e3f6fd',
		  skyblue_dark: '#0c2a34',
		  blue_dark: '#004a8f',
		  blue_brand_light: '#63c5ec',
		  blue_brand: '#b1ecfe',
		  aqua_brand: '#b3eefe',
		  coral: '#fd9901',
		  teal: '#629dab',
		  orange: '#f96501',
		  color_brand: '#0c2a34',
		  gray_light: '#e9ecef',
		  white_brand: '#f1f1f1',
		},
		backgroundImage: {
		  'skyblue-gradient': 'linear-gradient(to right, #50b0ec, #4a81ad)',
		  'coral-gradient': 'linear-gradient(to right, #ff9e6b, #e58549)',
		  'blue-brand-gradient': 'linear-gradient(to bottom, #89d9f0, #2171b0)',
		  'skyblue-brand-gradient': 'linear-gradient(to bottom, #89d9f0, #559fd9)',
		  'white-brand-gradient': 'linear-gradient(to right, #fdfdff, #e2f3fd)',
		  'aqua-brand-gradient': 'linear-gradient(to right, #b3eefe, #85c9fe)',
		  'jshine-gradient': 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
		  'timber-gradient': 'linear-gradient(to right, #fc00ff, #00dbde)',
		  'neuromancer-gradient': 'linear-gradient(to right, #00B4DB, #0083B0)',
		},
	  },
	},
	plugins: [],
  }