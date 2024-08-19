import React, { useCallback, useState } from "react"
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
		electricityPrice: 5,
		asicPrice: initialMinerModel.asicPrice,
	})

	const [results, setResults] = useState({})

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
			electricityPrice: 6.02,
			asicPrice: initialMinerModel.asicPrice,
		})
		setResults({})
	}

	const handleMinerModelSelect = model => {
		setFormState(prevState => ({
			...prevState,
			hashRate: model.hashrate,
			powerConsumption: model.powerConsumption,
			asicPrice: model.asicPrice,
		}))
	}

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
								options={["Th/s", "Gh/s", "Mh/s"]}
								placeholder={false}
							/>
						</InputField>

						<InputField
							unit="₽ / кВт/ч"
							// unit="$ / кВт/ч"
							label="Цена электроэнергии"
							placeholder="4.7"
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
						{isNaN(results.totalAsicPrice)
							? "0"
							: parseInt(results.totalAsicPrice).toLocaleString("ru-RU")}{" "}
						<span>₽</span>
					</div>
				</section>

				{/* <section className="flex justify-center gap-3">
					<BlueButton
						text="Сбросить"
						className="border-black border-solid border border-opacity-10 text-[#bdbfc1] bg-white hover:bg-[#00a3ff] hover:text-white hover:border-[#00a3ff]"
						onClick={resetForm}
					/>
					<BlueButton
            onClick={() => calculateResults()}
            text="Показать результаты"
            className="text-white bg-[#00a3ff] border-[#00a3ff] border-solid border hover:shadow-[0_4px_12px_0_rgba(0,_163,_255,_0.75)]"
          />
				</section> */}
			</section>

			<MiningCalculator
				formState={formState}
				poolFee={poolFee}
				onCalculate={setResults}
			/>

			{results && Object.keys(results).length > 0 && (
				<CalculationResults results={results} />
			)}
		</section>
	)
}

export default MiningForm
