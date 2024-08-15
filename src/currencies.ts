export const getExchangeRate = async (): Promise<number> => {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/RUB');
  const data = await response.json();
  return data.rates.USD;
};