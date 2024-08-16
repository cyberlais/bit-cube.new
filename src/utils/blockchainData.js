async function getMiningData() {
	// Получаем текущую сложность сети
	const difficultyResponse = await fetch(
		"https://blockchain.info/q/getdifficulty"
	)
	const difficulty = await difficultyResponse.json()

	// Получаем текущую награду за блок
	const blockRewardResponse = await fetch(
		"https://blockchain.info/q/getblockreward"
	)
	const blockReward = await blockRewardResponse.json()

	// Константы
	const seconds_per_day = 86400 // секунд в сутках

	// Расчет дохода с 1 TH/s в BTC
	const revenue_per_ths_per_day_btc =
		(blockReward * seconds_per_day) / (difficulty * Math.pow(2, 32))

	return revenue_per_ths_per_day_btc
}

async function calculateMiningProfit() {
	// Входные данные
	const hashrate_ths = 242
	const power_watts = 5324
	const electricity_cost_per_kwh = 6.02 // руб/кВт·ч

	// Получаем курсы валют
	const { btc_to_usd, usd_to_rub } = await getExchangeRates()
	const revenue_per_ths_per_day_btc = await getMiningData()

	// Переводим доходность в доллары
	const revenue_per_ths_per_day_usd = revenue_per_ths_per_day_btc * btc_to_usd

	// Расчет дохода в рублях
	const revenue_per_day_usd = hashrate_ths * revenue_per_ths_per_day_usd
	const revenue_per_day_rub = revenue_per_day_usd * usd_to_rub

	// Расчет затрат на электричество
	const power_kw = power_watts / 1000 // перевод в кВт
	const electricity_cost_per_day_rub = power_kw * electricity_cost_per_kwh * 24 // затраты на электричество в день

	// Чистый доход
	const net_profit_per_day_rub =
		revenue_per_day_rub - electricity_cost_per_day_rub
	const net_profit_per_month_rub = net_profit_per_day_rub * 30
	const net_profit_per_year_rub = net_profit_per_day_rub * 365

	console.log(`Курс BTC/USD: ${btc_to_usd}`)
	console.log(`Курс USD/RUB: ${usd_to_rub}`)
	console.log(`Доход с 1 TH/s в BTC: ${revenue_per_ths_per_day_btc}`)
	console.log(`Чистый доход в день: ${net_profit_per_day_rub.toFixed(2)} руб.`)
	console.log(
		`Чистый доход в месяц: ${net_profit_per_month_rub.toFixed(2)} руб.`
	)
	console.log(`Чистый доход в год: ${net_profit_per_year_rub.toFixed(2)} руб.`)
}

// Запускаем расчет
 calculateMiningProfit()
