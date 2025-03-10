import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : ""
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <nav className="mt-4">
          <h1 className="p-4">Logo</h1>
          <ul className="space-y-2">
            <Link to="/">
              <li className="p-4 hover:bg-gray-700 cursor-pointer">Home</li>
            </Link>
            <Link to="/cryptoList">
              <li className="p-4 hover:bg-gray-700 cursor-pointer">
                Cryptocurrencies
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
