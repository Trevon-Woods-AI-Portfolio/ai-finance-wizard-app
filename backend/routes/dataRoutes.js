import express from "express";
import {
  getStockData,
  getOverviewChartData,
  getGainersLosers,
  getTickerNews,
} from "../controllers/dataControllers.js";

const router = express.Router();

router.get("/quoteData/:ticker", getStockData);
router.get("/chartData/:ticker/:time", getOverviewChartData);
router.get("/gainerslosers", getGainersLosers);
router.get("/news/:ticker", getTickerNews);

export default router;