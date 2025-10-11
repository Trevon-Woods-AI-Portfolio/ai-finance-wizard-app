async function getQuoteData(ticker) {
  const res = await fetch(
    `https://api.twelvedata.com/quote?symbol=${ticker}&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );

  const data = await res.json();

  const res2 = await fetch(
    `https://api.twelvedata.com/price?symbol=${ticker}&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );

  const data2 = await res2.json();

  const res3 = await fetch(
    `https://api.twelvedata.com/logo?symbol=${ticker}&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );

  const data3 = await res3.json();

  console.log(data);
  return {
    symbol: data.symbol,
    name: data.name,
    logo: data3,
    price: parseFloat(data2.price),
    change: parseFloat(data.change),
    percentageChange: parseFloat(data.percent_change),
    timestamp: new Date(),
  };
}

async function getChartData(ticker, time) {
  const res = await fetch(
    `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=${time}&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );

  const data = await res.json();

  console.log(data);
  return data.values.map((item) => ({
    datetime: item.datetime,
    open: parseFloat(item.open),
    high: parseFloat(item.high),
    low: parseFloat(item.low),
    close: parseFloat(item.close),
    volume: parseFloat(item.volume),
  }));
}

async function TopGainersLosers(ticker, time) {
  const res = await fetch(
    `https://api.twelvedata.com/market_movers/stocks?apikey=${process.env.TWELVE_DATA_API_KEY}&outputsize=15`
  );
  const gainersData = await res.json();

  const res2 = await fetch(
    `https://api.twelvedata.com/market_movers/stocks?apikey=${process.env.TWELVE_DATA_API_KEY}&direction=losers&outputsize=15`
  );
  const losersData = await res2.json();

  return { gainers: gainersData, losers: losersData };
}

export { getQuoteData, getChartData, TopGainersLosers };