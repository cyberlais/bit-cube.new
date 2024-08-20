import React, { useCallback, useEffect, useState } from "react"
import FlipNumbers from "react-flip-numbers"
import CalculationResults from "./CalculationResults.jsx"
import CustomCryptoSelect from "./CustomCryptoSelect.jsx"
import CustomSelect from "./CustomSelect.jsx"
import CustomSimpleSelect from "./CustomSimpleSelect.jsx"
import InputField from "./InputField.jsx"
import MiningCalculator from "./MiningCalculator"
import { minerModels } from "./models"

const MiningForm = () => {
	const initialMinerModel = minerModels[0]

	const [formState, setFormState] = useState({
		hashRate: initialMinerModel.hashrate,
		asicCount: 1,
		powerConsumption: initialMinerModel.powerConsumption,
		electricityPrice: 5.0,
		asicPrice: initialMinerModel.asicPrice,
		hashRateUnit: "Th/s",
		currency: "₽",
	})

	const [results, setResults] = useState({})
	const [btcToUsd, setBtcToUsd] = useState(null)
	const [usdToRub, setUsdToRub] = useState(null)

	const cryptoDataArray = [
		{
			symbol: "Bitcoin",
			icon: "/img/calculator/btc.svg",
		},
	]

	const poolFee = 0

	const handleInputChange = useCallback((field, value) => {
		setFormState(prevState => ({ ...prevState, [field]: parseFloat(value) }))
	}, [])

	const resetForm = () => {
		setFormState({
			hashRate: initialMinerModel.hashrate,
			asicCount: 1,
			powerConsumption: initialMinerModel.powerConsumption,
			electricityPrice: 5.0,
			asicPrice: initialMinerModel.asicPrice,
			hashRateUnit: "Th/s",
			currency: "₽", // добавляем поле для отслеживания текущей валюты
		})
		setResults({})
	}

	const handleMinerModelSelect = model => {
		setFormState(prevState => ({
			...prevState,
			hashRate: model.hashrate,
			powerConsumption: model.powerConsumption,
			asicPrice: model.asicPrice * usdToRub, // конвертация в рубли при выборе устройства
		}))
	}

	const handleSimpleSelect = useCallback(newUnit => {
		setFormState(prevState => {
			const { hashRate, hashRateUnit } = prevState

			let convertedHashRate = hashRate

			// Конвертируем в базовое значение (Th/s)
			if (hashRateUnit === "Gh/s") {
				convertedHashRate = hashRate / 1000
			} else if (hashRateUnit === "Mh/s") {
				convertedHashRate = hashRate / 1000000
			}

			// Конвертируем из базового значения в новую единицу
			if (newUnit === "Gh/s") {
				convertedHashRate = convertedHashRate * 1000
			} else if (newUnit === "Mh/s") {
				convertedHashRate = convertedHashRate * 1000000
			}

			return {
				...prevState,
				hashRate: convertedHashRate,
				hashRateUnit: newUnit, // обновляем единицу измерения
			}
		})
	}, [])

	const handleCurrencySelect = useCallback(
		newCurrency => {
			setFormState(prevState => {
				const { asicPrice, currency } = prevState

				let convertedAsicPrice = asicPrice

				// Если текущая валюта USD и меняем на RUB
				if (currency === "$" && newCurrency === "₽") {
					convertedAsicPrice = asicPrice * usdToRub
				}
				// Если текущая валюта RUB и меняем на USD
				else if (currency === "₽" && newCurrency === "$") {
					convertedAsicPrice = asicPrice / usdToRub
				}

				return {
					...prevState,
					asicPrice: convertedAsicPrice,
					currency: newCurrency, // обновляем валюту
				}
			})
		},
		[usdToRub]
	)

	const renderFlipNumber = value => (
		<FlipNumbers
			height={24}
			width={15}
			play
			perspective={1000}
			numbers={value}
			duration={0.9}
		/>
	)

	useEffect(() => {
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

		getExchangeRates()
	}, [])

	const { hashRate, asicCount, powerConsumption, electricityPrice, asicPrice } =
		formState

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
					<CustomCryptoSelect
						disable={true}
						options={cryptoDataArray}
						placeholder={true}
					/>
				</div>

				<section className="grid 810:grid-cols-2 gap-6">
					<section className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<label className="font-medium text-[14px] leading-[114%] opacity-60">
								Устройство для размещения
							</label>
							<CustomSelect
								options={minerModels}
								placeholder={true}
								onSelect={handleMinerModelSelect}
							/>
						</div>
						<InputField
							label="Хешрейт"
							placeholder="62"
							type="number"
							value={hashRate}
							onChange={e => handleInputChange("hashRate", e.target.value)}
							required={true}
						>
							<CustomSimpleSelect
								onSelect={handleSimpleSelect}
								options={["Th/s", "Gh/s", "Mh/s"]}
								placeholder={false}
							/>
						</InputField>

						<InputField
							useMask={true}
							unit="₽ / кВт/ч"
							// unit="$ / кВт/ч"
							label="Цена электроэнергии"
							placeholder="5.00"
							type="number"
							value={electricityPrice}
							onChange={e =>
								handleInputChange("electricityPrice", e.target.value)
							}
							required={true}
						/>
					</section>

					<section className="flex flex-col gap-6">
						<InputField
							unit="шт"
							label="Кол-во ASIC-майнеров"
							placeholder="2"
							type="number"
							value={asicCount}
							onChange={e => handleInputChange("asicCount", e.target.value)}
							required={true}
						/>
						<InputField
							unit="Вт"
							label="Потребление"
							placeholder="3200"
							type="number"
							value={powerConsumption}
							onChange={e =>
								handleInputChange("powerConsumption", e.target.value)
							}
							required={true}
						/>
						<InputField
							label="Цена ASIC-майнера"
							placeholder="50000"
							type="number"
							value={asicPrice.toFixed(0)}
							onChange={e => handleInputChange("asicPrice", e.target.value)}
							required={true}
						>
							<CustomSimpleSelect
								onSelect={handleCurrencySelect} // используем новую функцию
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
					<div className="flex items-center gap-2 font-bold text-[24px] leading-[133%]">
						{isNaN(results.totalAsicPrice)
							? "0"
							: renderFlipNumber(
									parseInt(results.totalAsicPrice).toLocaleString("ru-RU")
							  )}{" "}
						<span>{formState.currency}</span>
					</div>
				</section>
			</section>

			{btcToUsd && usdToRub && (
				<MiningCalculator
					formState={formState}
					poolFee={poolFee}
					btcToUsd={btcToUsd}
					usdToRub={usdToRub}
					onCalculate={setResults}
				/>
			)}

			{results && Object.keys(results).length > 0 && (
				<CalculationResults results={results} />
			)}
		</section>
	)
}

export default MiningForm
