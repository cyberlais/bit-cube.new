import React, { useEffect, useState } from "react"
import InputMask from "react-input-mask"
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
	useMask = false, // добавляем проп useMask
}) => {
	const [error, setError] = useState("")

	useEffect(() => {
		const parsedValue = parseFloat(value) // Преобразуем значение в число

		if (
			required &&
			(value === undefined ||
				value === null ||
				value === "" ||
				isNaN(parsedValue) ||
				parsedValue <= 0)
		) {
			setError("Заполните поле корректно")
		} else {
			setError("")
		}
	}, [value, required])

	const handleValueChange = (e, values) => {
		if (useMask) {
			onChange({ target: { value: e.target.value } })
		} else {
			onChange({ target: { value: values.value } })
		}
	}

	const renderInput = () => {
		if (useMask) {
			return (
				<InputMask
					mask="9.99"
					maskChar="0"
					value={value}
					onChange={handleValueChange}
					alwaysShowMask
					className={`w-full h-[66px] py-3 px-6 rounded-xl border border-solid ${
						error
							? "border-red-500 focus:border-red-500"
							: "border-black border-opacity-10 focus:border-opacity-25"
					} focus-visible:outline-none placeholder:opacity-30 placeholder:font-medium placeholder:text-[15px] placeholder:leading-[160%]`}
					placeholder={placeholder}
				/>
			)
		} else {
			return (
				<NumericFormat
					className={`w-full h-[66px] py-3 px-6 rounded-xl border border-solid ${
						error
							? "border-red-500 focus:border-red-500"
							: "border-black border-opacity-10 focus:border-opacity-25"
					} focus-visible:outline-none placeholder:opacity-30 placeholder:font-medium placeholder:text-[15px] placeholder:leading-[160%]`}
					placeholder={placeholder}
					value={value}
					onValueChange={values => handleValueChange(null, values)}
					thousandSeparator=" "
					isNumericString
				/>
			)
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<label className="font-medium text-[14px] leading-[114%] opacity-60">
				{label}
			</label>
			<div className="relative flex gap-2">
				{renderInput()}
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
