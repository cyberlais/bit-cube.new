import React, { useState } from "react"
import styles from "./CustomSelect.module.css"

const CustomSelect = ({ options, placeholder, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState(options[0])
	const [isOpen, setIsOpen] = useState(false)

	const handleOptionClick = option => {
		setSelectedOption(option)
		setIsOpen(false)
		onSelect(option)
	}

	return (
		<div className="relative">
			<div className="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`cursor-pointer relative w-full h-[66px] bg-white border border-black border-opacity-10 ${
						isOpen
							? "rounded-t-xl shadow-[0_4px_16px_0_rgba(0,182,255,0.2)]"
							: "rounded-xl shadow-none"
					}  px-6 py-3 cursor-default transition-all duration-300`}
				>
					<span className="flex items-center gap-4">
						<div className="relative max-w-10 w-10 max-h-10 h-10 rounded-full overflow-hidden ">
							{selectedOption.image && (
								<img
									src={selectedOption.image}
									alt={selectedOption.label}
									className="absolute w-full h-full bg-cover bg-center"
								/>
							)}
						</div>
						<div className="flex flex-col items-start gap-[2px]">
							<span className="font-medium text-[15px] leading-[160%]">
								{selectedOption.label}
							</span>
							{placeholder && (
								<span className="font-medium text-[14px] leading-[114%] opacity-30">
									{selectedOption.description && selectedOption.description}
									{selectedOption.model &&
										selectedOption.hashrate &&
										selectedOption.powerConsumption && (
											<>
												{selectedOption.model}
												{" / "}
												{selectedOption.hashrate}
												{" TH/s / "}
												{selectedOption.powerConsumption}
												{" Вт"}
											</>
										)}
								</span>
							)}
						</div>
					</span>
					<span
						className={`absolute px-4 inset-y-0 right-0 flex items-center pointer-events-none transition-transform duration-300 ${
							isOpen ? "rotate-180" : "rotate-0"
						}`}
					>
						<svg
							width="12"
							height="7"
							viewBox="0 0 12 7"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.8065 1.47281L6.47313 6.80614C6.41116 6.86862 6.33742 6.91822 6.25618 6.95207C6.17494 6.98591 6.08781 7.00334 5.9998 7.00334C5.91179 7.00334 5.82465 6.98591 5.74341 6.95207C5.66217 6.91822 5.58844 6.86862 5.52646 6.80614L0.193131 1.47281C0.0675955 1.34727 -0.00292969 1.17701 -0.00292969 0.999473C-0.00292969 0.821938 0.0675955 0.651675 0.193131 0.526139C0.318667 0.400603 0.48893 0.330078 0.666465 0.330078C0.843999 0.330078 1.01426 0.400603 1.1398 0.526139L5.9998 5.39281L10.8598 0.526139C10.9853 0.400603 11.1556 0.330078 11.3331 0.330078C11.5107 0.330078 11.6809 0.400603 11.8065 0.526139C11.932 0.651675 12.0025 0.821938 12.0025 0.999473C12.0025 1.17701 11.932 1.34727 11.8065 1.47281V1.47281Z"
								fill={isOpen ? "#00A3FF" : "black"}
								fillOpacity={isOpen ? "1" : "0.3"}
							/>
						</svg>
					</span>
				</button>
			</div>

			<div
				className={`absolute w-full rounded-b-xl z-10 bg-white shadow-[0_4px_16px_0_rgba(0,182,255,0.2)] transition-all duration-300 ease-out transform ${
					isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0"
				} overflow-hidden`}
			>
				<ul
					tabIndex="-1"
					role="listbox"
					aria-labelledby="listbox-label"
					aria-activedescendant="listbox-item-3"
					className="max-h-[350px] overflow-auto"
				>
					{options.map(option => (
						<li
							key={option.value}
							className={`${styles["custom-option"]} cursor-pointer select-none relative py-4 px-6 flex items-center transition-opacity duration-300`}
							role="option"
							onClick={() => handleOptionClick(option)}
						>
							<div className="relative max-w-10 w-10 max-h-10 h-10 rounded-full overflow-hidden ">
								{option.image && (
									<img
										src={option.image}
										alt={`${option.label} Icon`}
										className="absolute w-full h-full bg-cover bg-center"
									/>
								)}
							</div>
							<div className="ml-3 block">
								<span
									className={`${styles["custom-option-label"]} font-normal block truncate opacity-80 transition-opacity duration-300`}
								>
									{option.label}
								</span>
								<span
									className={`${styles["custom-option-description"]} opacity-30 text-sm transition-opacity duration-300`}
								>
									{option.model &&
										option.hashrate &&
										option.powerConsumption && (
											<>
												{option.model}
												{" / "}
												{option.hashrate}
												{" TH/s / "}
												{option.powerConsumption}
												{" Вт"}
											</>
										)}
								</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default CustomSelect
