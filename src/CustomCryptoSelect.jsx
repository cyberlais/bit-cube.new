import React, { useState } from "react"

const CustomCryptoSelect = ({ options, onSelect, placeholder }) => {
	const [selectedOption, setSelectedOption] = useState(null)
	const [isOpen, setIsOpen] = useState(false)

	const handleOptionClick = option => {
		setSelectedOption(option)
		setIsOpen(false)
		if (onSelect) {
			onSelect(option) // Передаем выбранную опцию в родительский компонент
		}
	}

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full"
			>
				{selectedOption
					? selectedOption.symbol
					: placeholder
					? "Выберите криптовалюту"
					: ""}
			</button>
			{isOpen && (
				<ul className="absolute w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto">
					{options.map(option => (
						<li
							key={option.symbol}
							className="cursor-pointer p-2 hover:bg-gray-100"
							onClick={() => handleOptionClick(option)}
						>
							{option.symbol}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CustomCryptoSelect
