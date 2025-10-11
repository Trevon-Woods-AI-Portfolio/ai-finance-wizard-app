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
  let outputsize = 0;

  switch (time) {
    case "1min":
      outputsize = 1440;
      break;
    case "5min":
      outputsize = 288;
      break;
    case "15min":
      outputsize = 96;
      break;
    case "1h":
      outputsize = 24;
      break;
    case "4h":
      outputsize = 6;
      break;
    case "1day":
      outputsize = 30;
      break;
    case "1-week":
      outputsize = 12;
      break;
    case "1-month":
      outputsize = 12;
      break;

    default:
      break;
  }

  const res = await fetch(
    `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=${time}&outputsize=${outputsize}&apikey=${process.env.TWELVE_DATA_API_KEY}`
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

async function TopGainersLosers() {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  );
  const data = await res.json();

  return data;
}

async function tickerNews(ticker) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  );

  const data = await res.json();

  return data;
}

export { getQuoteData, getChartData, TopGainersLosers, tickerNews };
