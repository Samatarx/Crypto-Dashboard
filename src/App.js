import React, { useEffect, useState } from "react";
import "./App.css";
import Card from './Card'

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";

function App() {
  const [info, setInfo] = useState([])


  const fetchdata = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setInfo(data)
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return <main className='App' >
      <div className="coin-search">
        <h1 className="coin-text">Search for Crypto</h1>
        <form>
          <input type="text" placeholder='search' className='input' onChange='' />
        </form>
      </div>
      <Card info={info} />
      </main>;
}

export default App;
