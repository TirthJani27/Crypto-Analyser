import { CoinData, getStatus, getTop10 } from "../module";
import { useData } from "../context/DataContext";
import CryptoCard from "./CryptoCard";
import { Link } from "react-router-dom";
// import { getTop10, getStatus } from ".././module";
// import { log } from "console";
// import { all } from "axios";

function Home() {
  const allData = useData();
  console.log(allData);
  if (allData.loading) {
    return (
      <div className="flex h-screen justify-center align-middle ">
        <div className="flex items-center justify-center">
          <div
            className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin border-blue-500`}
            role="status"
            aria-label="loading"
          ></div>
        </div>
      </div>
    );
  }

  const top10: CoinData[] = getTop10(allData) as CoinData[];
  const stats = getStatus(allData);

  return (
    <div className="p-2">
      <header className="flex justify-center align-middle text-center">
        <h1 className="font-semibold">Global Crypto Status</h1>
      </header>
      <main className=" my-2">
        <div className="grid grid-cols-2">
          {Object.keys(stats).map((key) => (
            <div key={key}>
              <h3 className="font-bold mt-4  text-gray-400 text-2xl">
                {key.toLocaleUpperCase()}
              </h3>
              <h2 className="font-bold text-gray-600 text-3xl">
                {stats[key] as React.ReactNode}
              </h2>
            </div>
          ))}
        </div>
        <div className="container text-center mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Top 10 Cryptos In The World
          </h1>
          <div className="flex flex-wrap justify-center align-middle gap-6">
            {top10.map((crypto) => (
              <Link to={`/cryptocoins/${crypto.uuid}`}>
                <CryptoCard props={crypto} key={crypto.rank} {...crypto} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
