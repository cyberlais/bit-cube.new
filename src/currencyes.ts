export interface Currencyes {
  value: string;
  label: string;
  icon: string;
  description: string;
}
export const currencyes:Currencyes[] =  [
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
]