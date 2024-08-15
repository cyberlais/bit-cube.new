export const getExchangeRate = async (): Promise<number> => {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
	console.log(data.rates.RUB)
  return data.rates.RUB;
};