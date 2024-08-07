import React from "react"
import ReactDOM from "react-dom"
import BlueButton from "./BlueButton.jsx"
import CustomSelect from "./CustomSelect.jsx"
import CustomSimpleSelect from "./CustomSimpleSelect.jsx"
import "./style.css"
import { initSwiper } from "./swiper-slider.js"
import ToggleSwitch from "./ToggleSwitch.jsx"

document.addEventListener("DOMContentLoaded", () => {
	initSwiper()

	const selectContainers = document.querySelectorAll("[data-react-select]")
	selectContainers.forEach(container => {
		const options = JSON.parse(container.getAttribute("data-options"))
		const placeholder = container.getAttribute("data-placeholder") === "true"

		ReactDOM.render(
			<CustomSelect options={options} placeholder={placeholder} />,
			container
		)
	})

	const simpleSelectContainers = document.querySelectorAll(
		"[data-react-simple-select]"
	)
	simpleSelectContainers.forEach(container => {
		const options = JSON.parse(container.getAttribute("data-options"))
		const placeholder =
			container.getAttribute("data-placeholder") || "Select an option"

		ReactDOM.render(
			<CustomSimpleSelect options={options} placeholder={placeholder} />,
			container
		)
	})

	const renderButtons = () => {
		document.querySelectorAll("[data-react-button]").forEach(mountPoint => {
			const text = mountPoint.getAttribute("data-text")
			const className = mountPoint.getAttribute("data-class")
			ReactDOM.render(
				<BlueButton text={text} className={className} />,
				mountPoint
			)
		})
	}

	renderButtons()

	const renderToggleSwitch = () => {
		document
			.querySelectorAll("[data-react-toggle-switch]")
			.forEach(mountPoint => {
				ReactDOM.render(<ToggleSwitch />, mountPoint)
			})
	}

	renderToggleSwitch()
})
