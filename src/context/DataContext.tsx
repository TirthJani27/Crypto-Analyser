import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Define proper types for your data
interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  // Add other properties as needed
}

interface ApiResponse {
  data: {
    coins: Coin[];
    // Other response properties
  };
  status: string;
}

interface DataContextType {
  data: ApiResponse | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

// Make sure the context is properly initialized with a default value that matches the type
const DataContext = createContext<DataContextType>({
  data: null,
  loading: false,
  error: null,
  fetchData: async () => {},
});

interface DataProviderProps {
  children: ReactNode;
  initialFetch?: boolean;
}

export const DataProvider = ({
  children,
  initialFetch = true,
}: DataProviderProps) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use environment variable for API key
      console.log("--------------- API CALLED --------------------");

      const apiKey = "";

      const response = await axios.get<ApiResponse>(
        "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
        {
          headers: {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetch) {
      fetchData();
    }
  }, [initialFetch]);

  return (
    <DataContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
