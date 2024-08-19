import React, { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"

const InputField = ({
	label,
	placeholder,
	unit,
	value,
	onChange,
	type = "text",
	children,
	required = false,
}) => {
	const [error, setError] = useState("")

	useEffect(() => {
		if (required && !value) {
			setError("Заполните поле")
		} else {
			setError("")
		}
	}, [value, required])

	const handleValueChange = values => {
		const { value } = values
		onChange({ target: { value } })
	}

	return (
		<div className="flex flex-col gap-2">
			<label className="font-medium text-[14px] leading-[114%] opacity-60">
				{label}
			</label>
			<div className="relative flex gap-2">
				<NumericFormat
					className={`w-full h-[66px] py-3 px-6 rounded-xl border border-solid ${
						error
							? "border-red-500 focus:border-red-500"
							: "border-black border-opacity-10 focus:border-opacity-25"
					} focus-visible:outline-none placeholder:opacity-30 placeholder:font-medium placeholder:text-[15px] placeholder:leading-[160%]`}
					placeholder={placeholder}
					value={value}
					onValueChange={handleValueChange}
					thousandSeparator=" "
					isNumericString
				/>
				{children}
				{error && (
					<p className="absolute px-[2px] bottom-0 translate-y-1/2 left-6 bg-white text-red-500 text-opacity-50 text-[12px] leading-[114%]">
						{error}
					</p>
				)}
				{unit && (
					<span className="absolute flex items-center inset-y-0 right-6 font-medium text-[15px] leading-[160%]">
						{unit}
					</span>
				)}
			</div>
		</div>
	)
}

export default InputField
