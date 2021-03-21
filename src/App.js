import React, { useEffect, useState } from "react";
import "./Styling/App.css";
import List from "./List";
import Card from "./Card";
import Loader from "react-loader-spinner";
import { FaRedo } from "react-icons/fa";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

function App() {
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRefresh(false);
      setCoins(data);
      setLoading(false);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const stopRender = (e) => {
    e.preventDefault();
  };

  const filterCoins = coins.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(input.toLowerCase()) ||
      coin.name.toLowerCase().includes(input.toLowerCase())
  );

  if (loading) {
    return <Loader type="Rings" color="#d10000" className="loader" />;
  }

  return (
    <main className="App">
      <h1 className="coin-text">Cryptocurrency Dashboard</h1>
      <div className="coin-search">
        <button className="view-switch" onClick={() => setView(!view)}>
          {view ? "card" : "list"}
        </button>
        <div className="search-refresh">
          {view ? (
            <h1> </h1>
          ) : (
            <form>
              <input
                type="text"
                placeholder="search for a coin"
                className="input"
                onChange={handleChange}
                onSubmit={stopRender}
              />
            </form>
          )}
          <button className="btn-refresh" onClick={() => setRefresh(true)}>
            <FaRedo />
          </button>
        </div>
      </div>
      {filterCoins.length > 0 ? (
        view ? (
          <List filterCoins={filterCoins} setRefresh={setRefresh} />
        ) : (
          <Card filterCoins={filterCoins} />
        )
      ) : (
        <h3 className="error-search">Please try again</h3>
      )}
    </main>
  );
}

export default App;
