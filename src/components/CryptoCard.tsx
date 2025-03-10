import { CoinData } from "@/module";
import React from "react";

interface CryptoCardProps {
  props: CoinData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ props }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-xs transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {props.rank}. {props.name}
        </h2>
        <img src={props.iconUrl} alt={props.name} className="w-8 h-8" />
      </div>
      <div className="mt-2 text-gray-600 text-left">
        <p>
          💰 Price: <span className="font-semibold">${props.price}</span>
        </p>
        <p>
          📊 Market Cap:{" "}
          <span className="font-semibold">${props.marketCap}</span>
        </p>
        <p>
          📉 Daily Change:
          <span
            className={`font-semibold ${
              parseFloat(props.change) < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {props.change}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default CryptoCard;
