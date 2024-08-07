import React, { useState } from "react"

const ToggleSwitch = () => {
	const [isOn, setIsOn] = useState(true) // По умолчанию переключатель на "Доллары"

	const toggleSwitch = () => {
		setIsOn(!isOn)
	}

	return (
		<div className="flex">
			<div
				className={`relative w-[180px] h-12 flex items-center rounded-xl cursor-pointer border border-black border-opacity-10 border-solid transition-colors duration-300 bg-white font-bold text-[16px] leading-[150%]`}
				onClick={toggleSwitch}
			>
				<div className="relative w-full h-full flex">
					<div
						className={`absolute left-0 w-[50px] h-full flex items-center justify-center text-[#bdbfc1] transition-opacity duration-300 ${
							isOn ? "opacity-100" : "opacity-0"
						}`}
					>
						₽
					</div>
					<div
						className={`absolute right-0 w-[50px] h-full flex items-center justify-center text-[#bdbfc1] transition-opacity duration-300 ${
							isOn ? "opacity-0" : "opacity-100"
						}`}
					>
						$
					</div>
				</div>
				<div
					className={`absolute top-0 bottom-0 left-0 flex items-center justify-center w-[130px] h-full rounded-xl transition-transform duration-300 bg-[#5100ff] text-white ${
						isOn ? "transform translate-x-[50px]" : ""
					}`}
				>
					<div
						className={`absolute flex items-center justify-center transition-opacity duration-300 ${
							isOn ? "opacity-100" : "opacity-0"
						}`}
					>
						$ <span className="ml-2">Доллары</span>
					</div>
					<div
						className={`absolute flex items-center justify-center transition-opacity duration-300 ${
							isOn ? "opacity-0" : "opacity-100"
						}`}
					>
						₽ <span className="ml-2">Рубли</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ToggleSwitch
