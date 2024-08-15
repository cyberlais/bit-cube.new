import React, { useEffect, useState } from "react"
import ToggleSwitch from "./ToggleSwitch.jsx"
import { getExchangeRate } from "./currencies.ts"

const CalculationResults = ({ results }) => {
	const [isUSD, setIsUSD] = useState(false)
	const [exchangeRate, setExchangeRate] = useState(1)

	useEffect(() => {
		const fetchExchangeRate = async () => {
			const rate = await getExchangeRate()
			setExchangeRate(rate)
		}

		fetchExchangeRate()
	}, [])

	const convertValue = value => {
		return isUSD ? (value / exchangeRate).toFixed(0) : value.toFixed(0)
	}

	return (
		<section className="flex flex-col gap-6 810:gap-8 px-4 py-6 1024:px-12 1024:py-10 bg-[rgba(152,_169,_193,_0.1)] rounded-3xl">
			<div className="flex flex-col gap-6 810:flex-row justify-between items-center">
				<p className="w-full text-[20px] leading-[120%] font-semibold">
					Результаты расчета
				</p>
				<ToggleSwitch isUSD={isUSD} setIsUSD={setIsUSD} />
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
									: convertValue(results.dailyElectricityCost)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.monthlyElectricityCost)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.yearlyElectricityCost)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.dailyRevenueAfterPoolFee)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.monthlyRevenue)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.yearlyRevenue)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.dailyProfit)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.monthlyProfit)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
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
									: convertValue(results.yearlyProfit)}
							</span>{" "}
							<span>{isUSD ? "$" : "₽"}</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CalculationResults
