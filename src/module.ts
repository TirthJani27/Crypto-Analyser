function getStatus(allData: unknown) {
  if (
    allData &&
    typeof allData === "object" &&
    "data" in allData &&
    allData.data &&
    typeof allData.data === "object" &&
    "data" in allData.data &&
    allData.data.data &&
    typeof allData.data.data === "object" &&
    "stats" in allData.data.data &&
    allData.data.data.stats
  ) {
    const stats = allData.data.data.stats as Record<string, unknown>;
    return stats;
  }
  return {};
}

interface CoinData {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  sparkline: string[];
  lowVolume: boolean;
  coinrankingUrl: string;
  "24hVolume": string;
  btcPrice: string;
  contractAddresses: string[];
}

function getAll(allData: unknown) {
  if (
    allData &&
    typeof allData === "object" &&
    "data" in allData &&
    allData.data &&
    typeof allData.data === "object" &&
    "data" in allData.data &&
    allData.data.data &&
    typeof allData.data.data === "object" &&
    "coins" in allData.data.data &&
    allData.data.data.coins
  ) {
    const coinsArr = allData.data.data.coins as CoinData[];

    return coinsArr;
  }
  return [];
}

function getTop10(allData: unknown) {
  if (
    allData &&
    typeof allData === "object" &&
    "data" in allData &&
    allData.data &&
    typeof allData.data === "object" &&
    "data" in allData.data &&
    allData.data.data &&
    typeof allData.data.data === "object" &&
    "coins" in allData.data.data &&
    allData.data.data.coins
  ) {
    const coinsArr = allData.data.data.coins as CoinData[];
    const list = [];
    for (let index = 0; index < 10; index++) {
      const element = coinsArr[index];
      list.push(element);
    }
    return list;
  }
  return [];
}

interface CoinDataIndividual {
  status: string;
  data: {
    coin: Coin;
  };
}

interface Coin {
  volume(volume: unknown): unknown;
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: Link[];
  supply: Supply;
  numberOfMarkets: number;
  numberOfExchanges: number;
  "24hVolume": string;
  marketCap: string;
  fullyDilutedMarketCap: string;
  price: string;
  btcPrice: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  allTimeHigh: AllTimeHigh;
  coinrankingUrl: string;
  tier: number;
  lowVolume: boolean;
  listedAt: number;
  hasContent: boolean;
  notices: null | string;
  contractAddresses: string[];
  tags: string[];
}

interface Link {
  name: string;
  url: string;
  type: string;
}

interface Supply {
  confirmed: boolean;
  supplyAt: number;
  max: string;
  total: string;
  circulating: string;
}

interface AllTimeHigh {
  price: string;
  timestamp: number;
}

type PriceHistory = {
  date: unknown;
  price: string; // The price at the given timestamp
  timestamp: number; // The timestamp (Unix time)
};

type PriceData = {
  status: string; // "success" or other status
  data: {
    change: string; // The change in price
    history: PriceHistory[]; // An array of historical price data
  };
};

export { getStatus, getTop10, getAll };
export type { CoinData, PriceData, CoinDataIndividual };
