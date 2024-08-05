import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				proizvodstva: resolve(__dirname, "proizvodstva.html"),
				calculator: resolve(__dirname, "calculator.html"),
			},
		},
	},
})
