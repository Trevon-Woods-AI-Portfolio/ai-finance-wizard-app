import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { extract } from "@extractus/article-extractor";
import {
  getQuoteData,
  getChartData,
  TopGainersLosers,
  tickerNews,
  overview,
  aiInsight,
} from "../utils/generateData.js";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-5",
});

const insightsPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a 40 year veteran stock analysis. Given the articles about the company, provide a detailed response highlighting the positives and negatives from the articles and a brief outlook summary. It is ok if your responses are long. Format the response as a JSON array containing 'positive', 'negative', and 'summary' fields.",
  ],
  ["user", "{articles}"],
]);

const insights = insightsPrompt.pipe(model);

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

const generateWatchlistData = (req, res) => {
  const { tickers } = req.body;
  Promise.all(tickers.map((ticker) => getQuoteData(ticker)))
    .then((data) => res.status(201).json({ data }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const statisticalOverview = (req, res) => {
  const { ticker } = req.params;
  overview(ticker)
    .then((data) => res.status(201).json({ data }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const generateAiInsights = async (req, res) => {
  try {
    const { ticker } = req.params;
    let news = await aiInsight(ticker);
    let articles = await Promise.all(news.slice(0, 5).map(async (item) => {
      try {
        const article = await extract(item.url);
        return article.content;
      } catch (error) {
        console.error(`Error extracting article from ${item.url}:`, error);
        return "";
      }
    }));
    
    const insight = await insights.invoke({ articles: articles.join("\n\n") });

    const aiInsights = JSON.parse(insight.content);

    res.status(201).json({ data: aiInsights });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getStockData,
  getOverviewChartData,
  getGainersLosers,
  getTickerNews,
  generateWatchlistData,
  statisticalOverview,
  generateAiInsights,
};
