import React from "react"
import ToggleSwitch from "./ToggleSwitch.jsx"

const CalculationResults = ({ results }) => (
	<section className="flex flex-col gap-6 810:gap-8 px-4 py-6 1024:px-12 1024:py-10 bg-[rgba(152,_169,_193,_0.1)] rounded-3xl">
		<div className="flex flex-col gap-6 810:flex-row justify-between items-center">
			<p className="w-full text-[20px] leading-[120%] font-semibold">
				Результаты расчета
			</p>
			<ToggleSwitch />
		</div>
		<div className="flex flex-col gap-2">
			<div className="flex flex-wrap gap-2 justify-between bg-black text-white rounded-3xl pt-5 pb-6 px-6 810:py-6 810:px-10">
				<p className="text-[15px] leading-[160%] opacity-80">
					Срок окупаемости
				</p>
				<div className="text-[24px] font-bold leading-[133%] uppercase">
					<span>
						{isNaN(results.paybackPeriodMonths)
							? "0"
							: results.paybackPeriodMonths?.toFixed(0)}
					</span>
					<span>{isNaN(results.paybackPeriodMonths) ? "" : " месяцев"}</span>
				</div>
			</div>
			<div className="flex flex-col 810:grid grid-cols-[300px_1fr_1fr_1fr] gap-2 810:gap-8 810:items-end justify-between bg-black text-white rounded-3xl pt-5 pb-6 px-6 810:py-6 810:px-10">
				<p className="mb-2 810:mb-0 text-[14px] leading-[143%] font-medium 810:text-[15px] 810:leading-[160%]">
					Затраты на размещение
				</p>
				<div className="flex items-center justify-between 810:items-center 810:flex-col gap-4">
					<p className="text-[14px] leading-[114%] opacity-80 font-medium">
						В день
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.dailyElectricityCost)
								? "0"
								: results.dailyElectricityCost?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
				<div className="flex items-center justify-between 810:items-center 810:flex-col gap-4">
					<p className="text-[14px] leading-[114%] opacity-80 font-medium">
						В месяц
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.monthlyElectricityCost)
								? "0"
								: results.monthlyElectricityCost?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
				<div className="flex items-center justify_between 810:items-center 810:flex-col gap-4">
					<p className="text-[14px] leading-[114%] opacity-80 font-medium">
						В год
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.yearlyElectricityCost)
								? "0"
								: results.yearlyElectricityCost?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
			</div>
			<div className="flex flex-col 810:grid grid-cols-[300px_1fr_1fr_1fr] gap-2 810:gap-8 810:items-end justify-between bg-black text-white rounded-3xl pt-5 pb-6 px-6 810:py-6 810:px-10">
				<p className="mb-2 810:mb-0 text-[14px] leading-[143%] font-medium 810:text-[15px] 810:leading-[160%]">
					Доход
				</p>
				<div className="flex items-center justify-between 810:items-center 810:flex-col gap-4">
					<p className="810:hidden text-[14px] leading-[114%] opacity-80 font-medium">
						В день
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.dailyRevenueAfterPoolFee)
								? "0"
								: results.dailyRevenueAfterPoolFee?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
				<div className="flex items-center justify-between 810:items-center 810:flex-col gap-4">
					<p className="810:hidden text-[14px] leading-[114%] opacity-80 font-medium">
						В месяц
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.monthlyRevenue)
								? "0"
								: results.monthlyRevenue?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
				<div className="flex items-center justify-between 810:items-center 810:flex-col gap-4">
					<p className="810:hidden text-[14px] leading-[114%] opacity-80 font-medium">
						В год
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.yearlyRevenue)
								? "0"
								: results.yearlyRevenue?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
			</div>
			<div className="flex flex-col 810:grid grid-cols-[300px_1fr_1fr_1fr] gap-2 810:gap-8 810:items-end justify-between bg-black text-white rounded-3xl pt-5 pb-6 px-6 810:py-6 810:px-10">
				<p className="mb-2 810:mb-0 text-[14px] leading-[143%] font-medium 810:text-[15px] 810:leading-[160%]">
					Чистая прибыль
				</p>
				<div className="flex items-center justify_between 810:items-center 810:flex-col gap-4">
					<p className="810:hidden text-[14px] leading-[114%] opacity-80 font-medium">
						В день
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.dailyProfit)
								? "0"
								: results.dailyProfit?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
				<div className="flex items-center justify_between 810:items-center 810:flex-col gap-4">
					<p className="810:hidden text-[14px] leading-[114%] opacity-80 font-medium">
						В месяц
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.monthlyProfit)
								? "0"
								: results.monthlyProfit?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
				<div className="flex items-center justify_between 810:items-center 810:flex-col gap-4">
					<p className="810:hidden text-[14px] leading-[114%] opacity-80 font-medium">
						В год
					</p>
					<p className="text-[14px] 810:text-[15px]">
						<span>
							{isNaN(results.yearlyProfit)
								? "0"
								: results.yearlyProfit?.toFixed(0)}
						</span>{" "}
						<span>₽</span>
					</p>
				</div>
			</div>
		</div>
	</section>
)

export default CalculationResults
