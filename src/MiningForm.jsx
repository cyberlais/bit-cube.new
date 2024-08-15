import React, { useEffect, useState } from "react"
import BlueButton from "./BlueButton.jsx"
import CalculationResults from "./CalculationResults.jsx"
import { getExchangeRate } from "./currencies.ts"
import CustomCryptoSelect from "./CustomCryptoSelect.jsx"
import CustomSelect from "./CustomSelect.jsx"
import CustomSimpleSelect from "./CustomSimpleSelect.jsx"
import InputField from "./InputField.jsx"
import { minerModels } from "./models"
import { fetchAllCryptoData } from "./utils/cryptoData"

const MiningForm = () => {
	const initialMinerModel = minerModels[0]

	const [hashRate, setHashRate] = useState(initialMinerModel.hashrate)
	const [asicCount, setAsicCount] = useState(1)
	const [powerConsumption, setPowerConsumption] = useState(
		initialMinerModel.powerConsumption
	)
	const [electricityPrice, setElectricityPrice] = useState(6.02)
	const [asicPrice, setAsicPrice] = useState(initialMinerModel.asicPrice)
	const [results, setResults] = useState({})
	const [cryptoDataArray, setCryptoDataArray] = useState([])
	const [exchangeRate, setExchangeRate] = useState(70) // Состояние для курса валют

	// Состояния для переменных, которые нужно обновлять
	const [networkDifficulty, setNetworkDifficulty] = useState(90666502495566)
	const [blockTime, setBlockTime] = useState(10)
	const [blockReward, setBlockReward] = useState(6.25)
	const [cryptoPrice, setCryptoPrice] = useState(5112667.49)

	const poolFee = 0

	const calculateResults = () => {
		console.log(cryptoPrice)
		const blocksPerDay = 1440 / blockTime

		const dailyElectricityCost =
			((powerConsumption * asicCount * 24) / 1000) * electricityPrice
		const monthlyElectricityCost = dailyElectricityCost * 30
		const yearlyElectricityCost = monthlyElectricityCost * 12

		const dailyRevenue =
			((hashRate * asicCount) / networkDifficulty) *
			blocksPerDay *
			blockReward *
			cryptoPrice *
			exchangeRate
		const dailyRevenueAfterPoolFee = dailyRevenue * (1 - poolFee / 100)

		const monthlyRevenue = dailyRevenueAfterPoolFee * 30
		const yearlyRevenue = monthlyRevenue * 12

		const dailyProfit = dailyRevenueAfterPoolFee - dailyElectricityCost
		const monthlyProfit = dailyProfit * 30
		const yearlyProfit = monthlyProfit * 12

		const totalAsicPrice = asicPrice * asicCount

		const paybackPeriodMonths = totalAsicPrice / monthlyProfit

		setResults({
			blocksPerDay,
			dailyElectricityCost,
			monthlyElectricityCost,
			yearlyElectricityCost,
			dailyRevenue,
			dailyRevenueAfterPoolFee,
			monthlyRevenue,
			yearlyRevenue,
			dailyProfit,
			monthlyProfit,
			yearlyProfit,
			totalAsicPrice,
			paybackPeriodMonths,
		})
	}

	useEffect(() => {
		calculateResults()
	}, [
		hashRate,
		asicCount,
		powerConsumption,
		electricityPrice,
		asicPrice,
		networkDifficulty,
		blockTime,
		blockReward,
		cryptoPrice,
	])

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAllCryptoData()
			setCryptoDataArray(data)
		}

		fetchData()
	}, [])

	useEffect(() => {
		const fetchExchangeRate = async () => {
			const rate = await getExchangeRate()
			setExchangeRate(rate)
		}

		fetchExchangeRate()
	}, [])

	const handleMinerModelSelect = model => {
		setHashRate(model.hashrate)
		setPowerConsumption(model.powerConsumption)
		setAsicPrice(model.asicPrice * exchangeRate) // Конвертация цены в рубли
	}

	// Функция для обновления переменных на основе выбранной криптовалюты
	const handleCryptoSelect = crypto => {
		setNetworkDifficulty(crypto.difficulty)
		setBlockTime(crypto.blockTime)
		setBlockReward(crypto.blockReward)
		setCryptoPrice(crypto.price)
		setCryptoPrice(crypto.price * exchangeRate) // Конвертация цены в рубли
	}

	return (
		<section className="flex flex-col gap-6">
			<p className="font-semibold text-[20px] leading-[120%]">
				Укажите основные данные
			</p>
			<section className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<label className="font-medium text-[14px] leading-[114%] opacity-60">
						Добываемая монета/алгоритм
					</label>
					<select className="hidden" id="hidden-select">
						<option value="btc" selected>
							BTC (Bitcoin)
						</option>
						<option value="eth">ETH (Ethereum)</option>
						<option value="ltc">LTC (Litecoin)</option>
					</select>
					{cryptoDataArray.length > 0 && (
						<CustomCryptoSelect
							options={cryptoDataArray}
							onSelect={handleCryptoSelect}
							placeholder={true}
						/>
					)}
				</div>

				<section className="grid 810:grid-cols-2 gap-6">
					<section className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<label className="font-medium text-[14px] leading-[114%] opacity-60">
								Устройство для размещения
							</label>
							<select className="hidden" id="hidden-select-miner">
								<option value="1" selected>
									Название модели майнера 1
								</option>
								<option value="2">Название модели майнера 2</option>
								<option value="3">Название модели майнера 3</option>
							</select>

							<CustomSelect
								options={minerModels}
								placeholder={true}
								onSelect={handleMinerModelSelect}
							/>
						</div>
						<InputField
							label="Хешрейт (Th/s)"
							placeholder="62"
							type="number"
							value={hashRate}
							onChange={e => setHashRate(parseFloat(e.target.value))}
							required={true}
						>
							<CustomSimpleSelect
								options={["Th/s", "Gh/s", "Mh/s"]}
								placeholder={false}
							/>
						</InputField>

						<InputField
							label="Цена электроэнергии (₽/кВт·ч)"
							placeholder="4.7"
							type="number"
							value={electricityPrice}
							onChange={e => setElectricityPrice(parseFloat(e.target.value))}
							required={true}
						/>
					</section>

					<section className="flex flex-col gap-6">
						<InputField
							label="Кол-во ASIC-майнеров (шт.)"
							placeholder="2"
							type="number"
							value={asicCount}
							onChange={e => setAsicCount(parseFloat(e.target.value))}
							required={true}
						/>
						<InputField
							label="Потребление (Вт)"
							placeholder="3200"
							type="number"
							value={powerConsumption}
							onChange={e => setPowerConsumption(parseFloat(e.target.value))}
							required={true}
						/>
						<InputField
							label="Цена ASIC-майнера (₽)"
							placeholder="50000"
							type="number"
							value={asicPrice.toFixed(0)}
							onChange={e => setAsicPrice(parseFloat(e.target.value))}
							required={true}
						>
							<CustomSimpleSelect
								options={["₽", "$"]}
								placeholder="Выберите валюту"
							/>
						</InputField>
					</section>
				</section>
				<section className="flex flex-wrap justify-between rounded-xl gap-2 810:gap-6 p-6 bg-[rgba(152,_169,_193,_0.1);]">
					<p className="font-medium text-[15px] leading-[160%] opacity-60">
						Стоимость оборудования
					</p>
					<div className="font-bold text-[24px] leading-[133%]">
						<>
							{isNaN(results.totalAsicPrice)
								? "0"
								: results.totalAsicPrice.toFixed(0)}
						</>
						<span> ₽</span>
					</div>
				</section>
				<section className="flex justify-center gap-3">
					<BlueButton
						text="Сбросить"
						className="border-black border-solid border border-opacity-10 text-[#bdbfc1] bg-white hover:bg-[#00a3ff] hover:text-white hover:border-[#00a3ff]"
						onClick={() => {
							setHashRate(62)
							setAsicCount(2)
							setPowerConsumption(3200)
							setElectricityPrice(4.7)
							setAsicPrice(50000)
						}}
					/>

					<BlueButton
						onClick={calculateResults}
						text="Показать результаты"
						className="text-white bg-[#00a3ff] border-[#00a3ff] border-solid border hover:shadow-[0_4px_12px_0_rgba(0,_163,_255,_0.75)]"
					/>
				</section>
			</section>
			<CalculationResults results={results} />
		</section>
	)
}

export default MiningForm
