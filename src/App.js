import React, { useEffect, useState } from "react";
import "./Styling/App.css";
import List from "./List";
import Card from "./Card";
import { FaRedo } from "react-icons/fa";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

function App() {
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchdata = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoins(data);
      setRefresh(false);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata()
  }, [refresh]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const filterCoins = coins.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(input.toLowerCase()) ||
      coin.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <main className="App">
      <div className="coin-search">
        <h1 className="coin-text">Search for Crypto</h1>
        <div className="coin-buttons">
        <form>
          <input
            type="text"
            placeholder="search for a coin"
            className="input"
            onChange={handleChange}
          />
        </form>
        <button onClick={() => setRefresh(true)}>
          <FaRedo />
        </button>
        </div>
      </div>
      <button className="view-switch" onClick={() => setView(!view)}>
        {view ? "card" : "list"}
      </button>
      {filterCoins.length > 0 ? (
        view ? (
          <List filterCoins={filterCoins} setRefresh={setRefresh} />
        ) : (
          <Card filterCoins={filterCoins} />
        )
      ) : (
        <h1>Please try again</h1>
      )}
    </main>
  );
}

export default App;
