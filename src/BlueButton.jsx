import React from "react"

const BlueButton = ({ text, className }) => {
	return (
		<button
			className={`font-bold text-[16px] leading-[125%] uppercase py-[14px] px-6 rounded-xl transition-all duration-300 ${className}`}
			type="submit"
		>
			{text}
		</button>
	)
}

export default BlueButton
