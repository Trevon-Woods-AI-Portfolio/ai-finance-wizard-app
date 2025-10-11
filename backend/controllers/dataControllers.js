import {
  getQuoteData,
  getChartData,
  TopGainersLosers,
  tickerNews,
} from "../utils/generateData.js";

const getStockData = (req, res) => {
  const { ticker } = req.params;
  getQuoteData(ticker)
    .then((data) => res.status(201).json({ data }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const getOverviewChartData = (req, res) => {
    const { ticker, time } = req.params;
    getChartData(ticker, time)
        .then((data) => res.status(201).json({ data }))
        .catch((err) => res.status(500).json({ error: err.message }));
};

const getGainersLosers = (req, res) => {
    TopGainersLosers()
        .then((data) => res.status(201).json({ data }))
        .catch((err) => res.status(500).json({ error: err.message }));
};

const getTickerNews = (req, res) => {
    const { ticker } = req.params;
    tickerNews(ticker)
        .then((data) => res.status(201).json({ data }))
        .catch((err) => res.status(500).json({ error: err.message }));
};

export { getStockData, getOverviewChartData, getGainersLosers, getTickerNews };
