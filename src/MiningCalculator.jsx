import { useEffect, useState } from "react"
import CurrencyRatesFetcher from "./CurrencyRatesFetcher"

const MiningCalculator = ({ formState, poolFee, onCalculate }) => {
	const [btcToUsd, setBtcToUsd] = useState(null)
	const [usdToRub, setUsdToRub] = useState(null)
	const [btcPerThs, setBtcPerThs] = useState(null)

	const handleRatesFetched = ({ btcToUsd, usdToRub }) => {
		setBtcToUsd(btcToUsd)
		setUsdToRub(usdToRub)
	}

	const getMiningData = async () => {
		try {
			const difficultyResponse = await fetch(
				"https://blockchain.info/q/getdifficulty"
			)
			let difficulty = parseFloat(await difficultyResponse.json())
			difficulty = difficulty / 1e13

			const blockRewardResponse = await fetch(
				"https://blockchain.info/q/bcperblock"
			)
			const blockRewardBTC = parseFloat(await blockRewardResponse.json())

			const btcPerDay = blockRewardBTC * 6 * 24
			const networkHashrate = difficulty * 7158388.055
			let btcPerThs = btcPerDay / networkHashrate
			// BTC/THs уменьшение на порядок
			btcPerThs = btcPerThs / 10

			setBtcPerThs(btcPerThs)
		} catch (error) {
			console.error("Ошибка при получении данных для майнинга: ", error)
		}
	}

	const calculateResults = () => {
		if (!btcToUsd || !usdToRub || !btcPerThs) {
			console.log("Данные для расчета не готовы", {
				btcToUsd,
				usdToRub,
				btcPerThs,
			})
			return
		}

		let {
			hashRate,
			asicCount,
			powerConsumption,
			electricityPrice,
			asicPrice,
			hashRateUnit,
		} = formState

		// Конвертация hashRate в Th/s, если необходимо
		if (hashRateUnit === "Gh/s") {
			hashRate = hashRate / 1000
		} else if (hashRateUnit === "Mh/s") {
			hashRate = hashRate / 1000000
		}

		const revenue_per_ths_per_day_usd = btcPerThs * btcToUsd
		const revenue_per_day_usd =
			hashRate * asicCount * revenue_per_ths_per_day_usd
		const revenue_per_day_rub = revenue_per_day_usd * usdToRub

		const power_kw = powerConsumption / 1000
		const electricity_cost_per_day_rub = power_kw * electricityPrice * 24

		const net_profit_per_day_rub =
			revenue_per_day_rub - electricity_cost_per_day_rub

		const net_profit_per_month_rub = net_profit_per_day_rub * 30
		const net_profit_per_year_rub = net_profit_per_day_rub * 365

		const revenue_per_month_rub = revenue_per_day_rub * 30
		const revenue_per_year_rub = revenue_per_day_rub * 365

		const monthlyElectricityCost = electricity_cost_per_day_rub * 30
		const yearlyElectricityCost = electricity_cost_per_day_rub * 365

		const totalAsicPrice = asicPrice * asicCount * usdToRub

		const paybackPeriodMonths = totalAsicPrice / net_profit_per_month_rub

		console.log("Результаты расчета", {
			revenue_per_day_rub,
			revenue_per_month_rub,
			revenue_per_year_rub,
			net_profit_per_day_rub,
			net_profit_per_month_rub,
			net_profit_per_year_rub,
			electricity_cost_per_day_rub,
			monthlyElectricityCost,
			yearlyElectricityCost,
			totalAsicPrice,
			paybackPeriodMonths,
		})

		onCalculate({
			revenue_per_day_rub,
			revenue_per_month_rub,
			revenue_per_year_rub,
			net_profit_per_day_rub,
			net_profit_per_month_rub,
			net_profit_per_year_rub,
			electricity_cost_per_day_rub,
			monthlyElectricityCost,
			yearlyElectricityCost,
			totalAsicPrice,
			paybackPeriodMonths,
		})
	}

	useEffect(() => {
		getMiningData()
	}, [])

	useEffect(() => {
		console.log("Form State Updated:", formState)
		console.log("BTC to USD:", btcToUsd)
		console.log("USD to RUB:", usdToRub)
		console.log("BTC per TH/s:", btcPerThs)

		calculateResults()
	}, [formState, btcToUsd, usdToRub, btcPerThs])

	return (
		<>
			<CurrencyRatesFetcher onRatesFetched={handleRatesFetched} />
		</>
	)
}

export default MiningCalculator
