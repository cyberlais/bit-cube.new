import { useEffect } from "react"

const MiningCalculator = ({ formState, poolFee, onCalculate }) => {
  const exchangeRate = 70; // Фиксированное значение курса валют
  const networkDifficulty = 90666502495566; // Фиксированная сложность сети
  const blockTime = 10; // Фиксированное время блока
  const blockReward = 6.25; // Фиксированное вознаграждение за блок
  const cryptoPrice = 5112667.49; // Фиксированная цена криптовалюты

  const calculateResults = () => {
    const {
      hashRate,
      asicCount,
      powerConsumption,
      electricityPrice,
      asicPrice,
    } = formState;

    const blocksPerDay = 1440 / (blockTime / 60);
    const dailyElectricityCost = ((powerConsumption * asicCount * 24) / 1000) * electricityPrice;
    const dailyRevenue = ((hashRate * asicCount) / networkDifficulty) * blocksPerDay * blockReward * cryptoPrice;
    const dailyRevenueAfterPoolFee = dailyRevenue * (1 - poolFee / 100);

    const monthlyElectricityCost = dailyElectricityCost * 30;
    const monthlyRevenue = dailyRevenueAfterPoolFee * 30;

    const yearlyElectricityCost = monthlyElectricityCost * 12;
    const yearlyRevenue = monthlyRevenue * 12;

    const dailyProfit = dailyRevenueAfterPoolFee - dailyElectricityCost;
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = monthlyProfit * 12;

    const totalAsicPrice = asicPrice * asicCount * exchangeRate;
    const paybackPeriodMonths = totalAsicPrice / monthlyProfit;

    onCalculate({
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
    });
  };

  useEffect(() => {
    calculateResults();
  }, [formState]);

  return null;
};

export default MiningCalculator;
