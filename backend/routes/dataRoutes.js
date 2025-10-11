import express from "express";
import {
  getStockData,
  getOverviewChartData,
  getGainersLosers,
} from "../controllers/dataControllers";

const router = express.Router();

router.get("/quoteData/:ticker", getStockData);
router.get("/chartData/:ticker", getOverviewChartData);
router.get("/gainersLosers", getGainersLosers);

export default router;