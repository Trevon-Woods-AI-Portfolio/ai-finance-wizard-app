async function getQuoteData(ticker) {
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=${ticker}&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );
  
    const data = await res.json();

    const res2 = await fetch();
  
    console.log(data);
    return {
      symbol: data.symbol,
      name: data.name,
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
  