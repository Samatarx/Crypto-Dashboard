import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./List";
import Card from './Card'

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";

function App() {
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState("");

  const fetchdata = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoins(data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <main className="App">
      <div className="coin-search">
        <h1 className="coin-text">Search for Crypto</h1>
        <form>
          <input
            type="text"
            placeholder="search for a coin"
            className="input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filterCoins.length > 0 ? (
        <List filterCoins={filterCoins} />
      ) : (
        <h1>Please try again</h1>
      )}
    </main>
  );
}

export default App;
