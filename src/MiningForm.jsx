import React from "react"
import BlueButton from "./BlueButton.jsx"
import CalculationResults from "./CalculationResults.jsx"
import CustomSelect from "./CustomSelect.jsx"
import CustomSimpleSelect from "./CustomSimpleSelect.jsx"
import InputField from "./InputField.jsx"

const MiningForm = () => {
	return (
		<section class="flex flex-col gap-6">
			<p class="font-semibold text-[20px] leading-[120%]">
				Укажите основные данные
			</p>
			<form className="flex flex-col gap-6" action="">
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

					<CustomSelect
						options={[
							{
								value: "btc",
								label: "BTC (Bitcoin)",
								icon: "https://path-to-your-btc-icon.png",
								description: "SHA-256",
							},
							{
								value: "eth",
								label: "ETH (Ethereum)",
								icon: "https://path-to-your-eth-icon.png",
								description: "Ethash",
							},
							{
								value: "ltc",
								label: "LTC (Litecoin)",
								icon: "https://path-to-your-ltc-icon.png",
								description: "Scrypt",
							},
						]}
						placeholder={true}
					/>
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
								options={[
									{
										value: "1",
										label: "Название модели майнера 1",
										icon: "https://path-to-your-icon.png",
										description: "SHA-256 / 104 TH/s / 3200 Вт",
									},
									{
										value: "2",
										label: "Название модели майнера 2",
										icon: "https://path-to-your-icon.png",
										description: "SHA-256 / 104 TH/s / 3200 Вт",
									},
									{
										value: "3",
										label: "Название модели майнера 3",
										icon: "https://path-to-your-icon.png",
										description: "SHA-256 / 104 TH/s / 3200 Вт",
									},
								]}
								placeholder={false}
							/>
						</div>
						<InputField label="Хешрейт" placeholder="0">
							<CustomSimpleSelect
								options={["Mh/s", "Mh/s", "Mh/s"]}
								placeholder={false}
							/>
						</InputField>

						<InputField
							label="Цена электроэнергии"
							placeholder="4.7"
							unit="Кв/ч"
						/>
					</section>

					<section className="flex flex-col gap-6">
						<InputField
							label="Кол-во ASIC-майнеров"
							placeholder="Впишите кол-во майнеров"
							unit="шт."
						/>
						<InputField label="Потребление" placeholder="0" unit="Вт" />
						<InputField label="Цена ASIC-майнера" placeholder="0">
							<CustomSimpleSelect
								options={["₽", "$", "¥"]}
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
						<span>0</span>
						<span>₽</span>
					</div>
				</section>
				<section className="flex justify-center gap-3">
					<BlueButton
						text="Сбросить"
						className="border-black border-solid border border-opacity-10 text-[#bdbfc1] bg-white hover:bg-[#00a3ff] hover:text-white hover:border-[#00a3ff]"
					/>

					<BlueButton
						text="Показать результаты"
						className="text-white bg-[#00a3ff] border-[#00a3ff] border-solid border hover:shadow-[0_4px_12px_0_rgba(0,_163,_255,_0.75)]"
					/>
				</section>
			</form>
			<CalculationResults />
		</section>
	)
}

export default MiningForm
