import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, SetStateAction } from "react";
import axios from "axios";
import { Component as LineChart } from "./LineChart";
import { CoinDataIndividual, PriceData } from "./../module";
import { AlertCircle } from "lucide-react";
function Cryptos() {
  const { id } = useParams();
  const [timeperiod, setTimeperiod] = useState("30d");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [coinDataIndividual, setCoinDataIndividual] =
    useState<CoinDataIndividual | null>(null);
  const [coinDataTimePeriod, setCoinDataTimePeriod] =
    useState<PriceData | null>(null);

  const timeperiods = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "3m", label: "3 Months" },
    { value: "1y", label: "1 Year" },
    { value: "3y", label: "3 Years" },
    { value: "5y", label: "5 Years" },
  ];

  const fetchData = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError("");

    try {
      const [historyResponse, coinResponse] = await Promise.all([
        axios.get(`https://coinranking1.p.rapidapi.com/coin/${id}/history`, {
          params: {
            referenceCurrencyUuid: "yhjMzLPhuIDl",
            timePeriod: timeperiod,
          },
          headers: {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key":
              "",
          },
        }),
        axios.get(`https://coinranking1.p.rapidapi.com/coin/${id}`, {
          params: {
            referenceCurrencyUuid: "yhjMzLPhuIDl",
          },
          headers: {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key":
              "",
          },
        }),
      ]);

      setCoinDataTimePeriod(historyResponse.data);
      setCoinDataIndividual(coinResponse.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Error fetching data:", error);
      setError("Failed to fetch cryptocurrency data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [id, timeperiod]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTimeperiodChange = (newTimeperiod: SetStateAction<string>) => {
    setTimeperiod(newTimeperiod);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin border-blue-500"></div>
        <span className="ml-3 text-gray-600">
          Loading cryptocurrency data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen justify-center items-center flex-col">
        <div className="flex items-center text-red-500 mb-4">
          <AlertCircle className="mr-2" />
          <h2 className="text-xl font-semibold">Error</h2>
        </div>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const coinName = coinDataIndividual?.data?.coin?.name || "Cryptocurrency";
  const coinSymbol = coinDataIndividual?.data?.coin?.symbol || "";
  const coinPrice = coinDataIndividual?.data?.coin?.price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }).format(Number(coinDataIndividual.data.coin.price))
    : "N/A";

  const coinChange = coinDataIndividual?.data?.coin?.change;
  const changeClass =
    coinChange !== undefined && Number(coinChange) > 0
      ? "text-green-500"
      : coinChange !== undefined && Number(coinChange) < 0
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {coinName} ({coinSymbol})
            </h1>
            <div className="flex items-center mt-2">
              <span className="text-xl font-semibold">{coinPrice}</span>
              {coinChange !== undefined && (
                <span className={`ml-2 ${changeClass}`}>
                  {Number(coinChange) > 0 ? "+" : ""}
                  {coinChange}%
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex flex-wrap gap-2">
              {timeperiods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => handleTimeperiodChange(period.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    timeperiod === period.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {coinDataTimePeriod ? (
          <LineChart timePeriod={timeperiod} data={coinDataTimePeriod} />
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">No chart data available</p>
          </div>
        )}
      </div>

      {coinDataIndividual?.data?.coin && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            About {coinName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Market Stats</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-medium">
                    $
                    {Number(
                      coinDataIndividual.data.coin.marketCap
                    ).toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">24h Volume:</span>
                  <span className="font-medium">
                    $
                    {Number(
                      coinDataIndividual.data.coin.volume
                    ).toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Rank:</span>
                  <span className="font-medium">
                    #{coinDataIndividual.data.coin.rank}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Supply Info</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Circulating Supply:</span>
                  <span className="font-medium">
                    {Number(
                      coinDataIndividual.data.coin.supply?.circulating || 0
                    ).toLocaleString()}{" "}
                    {coinSymbol}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Total Supply:</span>
                  <span className="font-medium">
                    {Number(
                      coinDataIndividual.data.coin.supply?.total || 0
                    ).toLocaleString()}{" "}
                    {coinSymbol}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Max Supply:</span>
                  <span className="font-medium">
                    {Number(
                      coinDataIndividual.data.coin.supply?.max || 0
                    ).toLocaleString()}{" "}
                    {coinSymbol}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {coinDataIndividual.data.coin.description && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Description</h3>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: coinDataIndividual.data.coin.description,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cryptos;
