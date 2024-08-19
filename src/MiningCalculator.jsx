import { useEffect, useState } from "react"

const MiningCalculator = ({ formState, poolFee, onCalculate }) => {
	const [btcToUsd, setBtcToUsd] = useState(null)
	const [usdToRub, setUsdToRub] = useState(null)
	const [btcPerThs, setBtcPerThs] = useState(null)

	const getExchangeRates = async () => {
		try {
			const btcToUsdResponse = await fetch("https://blockchain.info/ticker")
			const btcToUsdData = await btcToUsdResponse.json()
			const btc_to_usd = btcToUsdData.USD?.last

			if (!btc_to_usd) {
				throw new Error("Не удалось получить курс BTC/USD")
			}

			const usdToRubResponse = await fetch(
				"https://api.exchangerate-api.com/v4/latest/USD"
			)
			const usdToRubData = await usdToRubResponse.json()
			const usd_to_rub = usdToRubData.rates?.RUB

			if (!usd_to_rub) {
				throw new Error("Не удалось получить курс USD/RUB")
			}

			setBtcToUsd(btc_to_usd)
			setUsdToRub(usd_to_rub)
		} catch (error) {
			console.error("Ошибка при получении курсов валют: ", error)
		}
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

		const {
			hashRate,
			asicCount,
			powerConsumption,
			electricityPrice,
			asicPrice,
		} = formState

		// Расчет дохода за день
		const revenue_per_ths_per_day_usd = btcPerThs * btcToUsd
		const revenue_per_day_usd =
			hashRate * asicCount * revenue_per_ths_per_day_usd
		const revenue_per_day_rub = revenue_per_day_usd * usdToRub

		// Расчет затрат на электроэнергию за день
		const power_kw = powerConsumption / 1000
		const electricity_cost_per_day_rub = power_kw * electricityPrice * 24

		// Расчет чистой прибыли за день
		const net_profit_per_day_rub =
			revenue_per_day_rub - electricity_cost_per_day_rub

		// Расчет чистой прибыли за месяц и год
		const net_profit_per_month_rub = net_profit_per_day_rub * 30
		const net_profit_per_year_rub = net_profit_per_day_rub * 365

		// Расчет месячного и годового дохода
		const revenue_per_month_rub = revenue_per_day_rub * 30
		const revenue_per_year_rub = revenue_per_day_rub * 365

		// Расчет месячных и годовых затрат на электроэнергию
		const monthlyElectricityCost = electricity_cost_per_day_rub * 30
		const yearlyElectricityCost = electricity_cost_per_day_rub * 365

		// Общая стоимость оборудования
		const totalAsicPrice = asicPrice * asicCount * usdToRub

		// Расчет срока окупаемости в месяцах
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
		getExchangeRates()
		getMiningData()
	}, [])

	useEffect(() => {
		console.log("Form State Updated:", formState)
		console.log("BTC to USD:", btcToUsd)
		console.log("USD to RUB:", usdToRub)
		console.log("BTC per TH/s:", btcPerThs)

		calculateResults()
	}, [formState, btcToUsd, usdToRub, btcPerThs])

	return null
}

export default MiningCalculator
