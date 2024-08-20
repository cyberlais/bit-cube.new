import { useEffect, useState } from "react"

const MiningCalculator = ({
	formState,
	poolFee,
	onCalculate,
	btcToUsd,
	usdToRub,
}) => {
	const [btcPerThs, setBtcPerThs] = useState(null)

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
		if (!btcPerThs) {
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
			currency,
		} = formState

		// Конвертация hashRate в Th/s, если необходимо
		if (hashRateUnit === "Gh/s") {
			hashRate = hashRate / 1000
		} else if (hashRateUnit === "Mh/s") {
			hashRate = hashRate / 1000000
		}

		// Конвертация цены ASIC-майнера в доллары, если валюта рубли
		if (currency === "₽") {
			asicPrice = asicPrice / usdToRub
		}

		const revenue_per_ths_per_day_usd = btcPerThs * btcToUsd
		const revenue_per_day_usd =
			hashRate * asicCount * revenue_per_ths_per_day_usd
		const revenue_per_day_rub = revenue_per_day_usd * usdToRub

		const power_kw = powerConsumption / 1000
		const electricity_cost_per_day_rub = power_kw * electricityPrice * 24

		const net_profit_per_day_rub =
			revenue_per_day_rub - electricity_cost_per_day_rub
		const net_profit_per_day_usd =
			revenue_per_day_usd - electricity_cost_per_day_rub / usdToRub

		const net_profit_per_month_rub = net_profit_per_day_rub * 30
		const net_profit_per_month_usd = net_profit_per_day_usd * 30

		let totalAsicPrice = asicPrice * asicCount

		// Срок окупаемости рассчитываем в зависимости от валюты
		let paybackPeriodMonths
		if (currency === "₽") {
			paybackPeriodMonths =
				(totalAsicPrice * usdToRub) / net_profit_per_month_rub
			totalAsicPrice = totalAsicPrice * usdToRub // Конвертируем обратно в рубли
		} else {
			paybackPeriodMonths = totalAsicPrice / net_profit_per_month_usd
		}

		console.log("Результаты расчета", {
			revenue_per_day_rub,
			revenue_per_month_rub: revenue_per_day_rub * 30,
			revenue_per_year_rub: revenue_per_day_rub * 365,
			net_profit_per_day_rub,
			net_profit_per_month_rub,
			net_profit_per_year_rub: net_profit_per_day_rub * 365,
			electricity_cost_per_day_rub,
			monthlyElectricityCost: electricity_cost_per_day_rub * 30,
			yearlyElectricityCost: electricity_cost_per_day_rub * 365,
			totalAsicPrice,
			paybackPeriodMonths,
		})

		onCalculate({
			revenue_per_day_rub,
			revenue_per_month_rub: revenue_per_day_rub * 30,
			revenue_per_year_rub: revenue_per_day_rub * 365,
			net_profit_per_day_rub,
			net_profit_per_month_rub,
			net_profit_per_year_rub: net_profit_per_day_rub * 365,
			electricity_cost_per_day_rub,
			monthlyElectricityCost: electricity_cost_per_day_rub * 30,
			yearlyElectricityCost: electricity_cost_per_day_rub * 365,
			totalAsicPrice, // Возвращаем в нужной валюте
			paybackPeriodMonths,
		})
	}

	useEffect(() => {
		getMiningData()
	}, [])

	useEffect(() => {
		if (btcToUsd && usdToRub && btcPerThs) {
			calculateResults()
		}
	}, [formState, btcToUsd, usdToRub, btcPerThs])

	return null
}

export default MiningCalculator
