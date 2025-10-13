import express from "express";
import {
  getStockData,
  getOverviewChartData,
  getGainersLosers,
  getTickerNews,
  generateWatchlistData,
  statisticalOverview,
} from "../controllers/dataControllers.js";

const router = express.Router();

router.get("/quoteData/:ticker", getStockData);
router.get("/chartData/:ticker/:time", getOverviewChartData);
router.get("/gainerslosers", getGainersLosers);
router.get("/news/:ticker", getTickerNews);
router.post("/watchlist", generateWatchlistData);
router.get("/overview/:ticker", statisticalOverview);

export default router;
