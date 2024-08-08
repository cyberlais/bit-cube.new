import React from "react"
import ReactDOM from "react-dom"
import MiningForm from "./src/MiningForm.jsx"

export const initApp = () => {
	const formContainer = document.querySelector("[data-react-form]")
	ReactDOM.render(<MiningForm />, formContainer)
}
