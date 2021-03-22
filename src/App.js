import React, { useEffect, useState } from "react";
import "./Styling/App.css";
import List from "./List";
import Card from "./Card";
import Loader from "react-loader-spinner";
import {FaAngleDoubleUp} from 'react-icons/fa'

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
      <h1 className="coin-text" id='#top'>Cryptocurrency Dashboard</h1>
      <article className="sub-heading">
        <h2>View type:</h2>
        <button className="view-switch" onClick={() => setView(!view)}>
          {view ? "list" : "card"}
        </button>
      </article>
     
        {view ? (
          <h1> </h1>
        ) : (
          <div className="search-refresh">
             <div className="coin-search">
            <form>
              <input
                type="text"
                placeholder="search for a coin"
                className="input"
                onChange={handleChange}
                onSubmit={stopRender}
              />
            </form>
            </div>
            <button className="btn-refresh" onClick={() => setRefresh(true)}>
              Refresh 
            </button>
          </div>
        )}
     
      {filterCoins.length > 0 ? (
        view ? (
          <List filterCoins={filterCoins} setRefresh={setRefresh} />
        ) : (
          <Card filterCoins={filterCoins} />
        )
      ) : (
        <h3 className="error-search">Please try again</h3>
      )}
      <a href="#top" ><FaAngleDoubleUp className='top' /></a>
    </main>
  );
}

export default App;
