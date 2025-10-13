import React from "react";

const StatisticsCard = ({ statistics }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-amber-300 mb-4 border-b border-amber-100">
        Statistics
      </h2>
      <div className="flex">
        <div className="p-6 w-[20%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">Exchange:</p>
              <p className="text-amber-100">
                {statistics?.data?.Exchange || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">Currency:</p>
              <p className="text-amber-100">
                {statistics?.data?.Currency || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">Sector:</p>
              <p className="text-amber-100">
                {statistics?.data?.Sector || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">MarketCap:</p>
              <p className="text-amber-100">
                {statistics?.data?.MarketCapitalization || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">PERatio:</h3>
              <p className="text-amber-100">
                {statistics?.data?.PERatio || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">EPS:</h3>
              <p className="text-amber-100">{statistics?.data?.EPS || "N/A"}</p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                PEGRatio:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.PEGRatio || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                52WeekHigh:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.["52WeekHigh"] || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                52WeekLow:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.["52WeekLow"] || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 w-[20%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                DividendYield:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.DividendYield || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                DividendPerShare:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.DividendPerShare || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                RevenuePerShare:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.RevenuePerShareTTM || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                ProfitMargin:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.ProfitMargin || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                OperatingMargin:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.OperatingMarginTTM || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                ReturnOnAssets:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.ReturnOnAssetsTTM || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                ReturnOnEquity:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.ReturnOnEquityTTM || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">Revenue:</h3>
              <p className="text-amber-100">
                {statistics?.data?.RevenueTTM || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                GrossProfit:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.GrossProfitTTM || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 w-[20%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                DilutedEPS:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.DilutedEPSTTM || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                QuarterlyEarningsGrowth:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.QuarterlyEarningsGrowthYOY || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                QuarterlyRevenueGrowth:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.QuarterlyRevenueGrowthYOY || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                AnalystTarget:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.AnalystTargetPrice || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                AnalystRatingStrongBuy:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.AnalystRatingStrongBuy || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                AnalystRatingBuy:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.AnalystRatingBuy || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                AnalystRatingHold:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.AnalystRatingHold || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                AnalystRatingSell:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.AnalystRatingSell || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                AnalystRatingStrongSell:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.AnalystRatingStrongSell || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 w-[20%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                TrailingPE:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.TrailingPE || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">ForwardPE:</p>
              <p className="text-amber-100">
                {statistics?.data?.ForwardPE || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                PriceToSalesRatio:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.PriceToSalesRatioTTM || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                PriceToBookRatio:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.PriceToBookRatio || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                EVToRevenue:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.EVToRevenue || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                EVToEBITDA:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.EVToEBITDA || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">Beta:</h3>
              <p className="text-amber-100">
                {statistics?.data?.Beta || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                50DayMovingAverage:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.["50DayMovingAverage"] || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                200DayMovingAverage:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.["200DayMovingAverage"] || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 w-[20%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                SharesOutstanding:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.SharesOutstanding || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                SharesFloat:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.SharesFloat || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                PercentInsiders:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.PercentInsiders || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <p className="text-md font-semibold text-amber-200">
                PercentInstitutions:
              </p>
              <p className="text-amber-100">
                {statistics?.data?.PercentInstitutions || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                DividendDate:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.DividendDate || "N/A"}
              </p>
            </div>
            <div className="flex bg-gray-800 rounded-lg gap-2">
              <h3 className="text-md font-semibold text-amber-200">
                ExDividendDate:
              </h3>
              <p className="text-amber-100">
                {statistics?.data?.ExDividendDate || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
