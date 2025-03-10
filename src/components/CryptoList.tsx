import { Link } from "react-router-dom";
import CryptoCard from "./CryptoCard";
import { useData } from "../context/DataContext";
import { getAll } from "../module";

function CryptoList() {
  const allData = useData();
  const list = getAll(allData);
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {list.map((crypto) => (
        <Link to={`/cryptocoins/${crypto.uuid}`}>
          <CryptoCard props={crypto} key={crypto.rank} {...crypto} />
        </Link>
      ))}
    </div>
  );
}

export default CryptoList;
