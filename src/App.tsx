import Sidebar from "./components/Sidebar";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { DataProvider } from "./context/DataContext";
import Cryptos from "./components/CryptosPage";
import CryptoList from "./components/CryptoList";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="flex w-screen max-h-screen">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cryptoList" element={<CryptoList />} />
              <Route path="/cryptocoins/:id" element={<Cryptos />} />
            </Routes>
          </div>
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
