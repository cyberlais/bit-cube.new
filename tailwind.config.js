/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			1440: "1440px",
			1170: "1170px",
			1024: "1024px",
			810: "810px",
			390: "390px",
		},
		extend: {
			fontFamily: {
				sans: ["Montserrat", "sans-serif"],
			},
		},
	},
	plugins: [],
}
