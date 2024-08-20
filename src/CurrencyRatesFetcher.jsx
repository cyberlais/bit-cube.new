import { useEffect, useState } from "react"

const CurrencyRatesFetcher = ({ onRatesFetched }) => {
	const [btcToUsd, setBtcToUsd] = useState(null)
	const [usdToRub, setUsdToRub] = useState(null)

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
			onRatesFetched({ btcToUsd: btc_to_usd, usdToRub: usd_to_rub })
		} catch (error) {
			console.error("Ошибка при получении курсов валют: ", error)
		}
	}

	useEffect(() => {
		getExchangeRates()
	}, [])

	return null
}

export default CurrencyRatesFetcher
