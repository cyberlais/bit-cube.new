export let cryptoDataArray: Array<{ 
    symbol: string; 
    blockReward: number; 
    difficulty: number; 
    blockTime: number;
    price: number;
    icon: string;
}> = [];

async function fetchCryptoData(symbol: string) {
    const url = `https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms=${symbol}&tsyms=USD`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.Data && data.Data[symbol]) {
        const cryptoData = data.Data[symbol].CoinInfo;
        const priceResponse = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`);
        const priceData = await priceResponse.json();
        
        // Вычисляем сложность сети
        const netHashesPerSecond = cryptoData.NetHashesPerSecond || 0;
        const blockTime = cryptoData.BlockTime || 1; // Установите значение по умолчанию 1 секунда, если нет данных
        const difficulty = (netHashesPerSecond * blockTime) / (2 ** 32);

        // Формируем полный URL для иконки
        const iconUrl = `https://www.cryptocompare.com${cryptoData.ImageUrl}`;

        cryptoDataArray.push({
            symbol: symbol,
            blockReward: cryptoData.BlockReward || 0,
            difficulty: difficulty || 0,
            blockTime: blockTime || 0,
            price: priceData.USD || 0,
            icon: iconUrl // Используем иконку из API
        });
    } else {
        console.error(`Данные по криптовалюте ${symbol} не найдены`);
    }
}

const cryptoSymbols = [
    'BTC', 'DASH', 'GRS', 'KAS', 'CKB', 'ZEC', 'ETC', 'DOGE', 'HNS', 'KDA', 'LTC', 'MONA'
];

export async function fetchAllCryptoData() {
    for (const symbol of cryptoSymbols) {
        await fetchCryptoData(symbol);
    }
		console.log(cryptoDataArray)
    return cryptoDataArray;
}
