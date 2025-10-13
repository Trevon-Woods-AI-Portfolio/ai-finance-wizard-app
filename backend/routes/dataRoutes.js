import express from "express";
import {
  getStockData,
  getOverviewChartData,
  getGainersLosers,
  getTickerNews,
  generateWatchlistData,
  statisticalOverview,
  generateAiInsights
} from "../controllers/dataControllers.js";

const router = express.Router();

router.get("/quoteData/:ticker", getStockData);
router.get("/chartData/:ticker/:time", getOverviewChartData);
router.get("/gainerslosers", getGainersLosers);
router.get("/news/:ticker", getTickerNews);
router.get("/overview/:ticker", statisticalOverview);
router.get("/insights/:ticker", generateAiInsights)
router.post("/watchlist", generateWatchlistData);

export default router;
