
const InputField = ({ label, placeholder, unit, children }) => (
	<div className="flex flex-col gap-2">
		<label className="font-medium text-[14px] leading-[114%] opacity-60">
			{label}
		</label>
		<div className="relative flex gap-2">
			<input
				className="w-full h-[66px] py-3 px-6 rounded-xl border border-solid border-black border-opacity-10 focus:border-opacity-25 focus-visible:border-opacity-25 focus-visible:border-black focus-visible:outline-none placeholder:opacity-30 placeholder:font-medium placeholder:text-[15px] placeholder:leading-[160%]"
				type="text"
				placeholder={placeholder}
			/>
			{children}
			{unit && (
				<span className="absolute flex items-center inset-y-0 right-6 font-medium text-[15px] leading-[160%]">
					{unit}
				</span>
			)}
		</div>
	</div>
)

export default InputField
