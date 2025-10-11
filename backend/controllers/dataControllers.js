import {
  getQuoteData,
  getChartData,
  TopGainersLosers,
} from "../utils/generateData.js";

const getStockData = (req, res) => {
    const {ticker} = req.params
};

const getOverviewChartData = (req, res) => {};

const getGainersLosers = (req, res) => {};

export { getStockData, getOverviewChartData, getGainersLosers };