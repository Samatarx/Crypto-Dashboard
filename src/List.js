import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import "./Styling/List.css";

function List({ filterCoins, setRefresh, mode }) {
  const [sorted, setSorted] = useState(filterCoins);
  const [order, setOrder] = useState(true);
  const [input, setInput] = useState("");

  const sortPrice = (field) => {
    let sortedPrices = sorted.sort((a, b) => {
      if (a[field] < b[field]) {
        return order ? 1 : -1;
      }
      if (a[field] > b[field]) {
        return order ? -1 : 1;
      }
      return 0;
    });

    setOrder(!order);
    setSorted(sortedPrices);
    setRefresh(true);
  };

  // const sortDate = () => {
  //  let sortedDates = sorted.sort((a,b) => {
  //     // Turn your strings into dates, and then subtract them
  //     // to get a value that is either negative, positive, or zero.
  //     return new Date(b.date) - new Date(a.date);
  //   })
  //   setSorted(sortedDates)
  // }

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const stopRender = (e) => {
    e.preventDefault();
  };

  const filteredCoins = sorted.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(input.toLowerCase()) ||
      coin.name.toLowerCase().includes(input.toLowerCase())
  );

  const findMonthOfATH = (date) => {
    return date.substring(0, 10).split('-').reverse().join('/')
  }

  // const priceChangeFor100 = (highest, current) => {
  //   (highest/current * 100).toFixed(0)
  // }

  return (
    <div className="List">
      <div className="coin-search">
        <form onSubmit={(e) => stopRender(e)}>
          <input
            type="text"
            placeholder="search for a coin"
            className={`input-${mode}`}
            onChange={(e) => handleChange(e)}
          />
        </form>
      </div>
      <div className="list-container">
        <div className={`list-item-${mode}`}>
          <div className="item-content">
            <div className="name-img">
              <h3>Coin</h3>
            </div>
            <p className="coin-symbol">Code</p>
            <div className="coin-info top">
            <p
                className="coin-price"
                onClick={() => sortPrice("market_cap_rank")}
              >
                Rank
                <FaSort />
              </p>
              <p
                className="coin-price"
                onClick={() => sortPrice("current_price")}
              >
                Value
                <FaSort />
              </p>
              <p
                className="coin-price"
                onClick={() =>
                  sortPrice("ath")
                }
              >
                ATH
                <FaSort />
              </p>
              <p
                className="coin-24h"
                onClick={() => sortPrice("ath_change_percentage")}
              >
                ATH%
                <FaSort />
              </p>
              <p
                className="coin-24h"
              >
                ATH Date
              </p>
              <p
                className="coin-24h"
              >
                £100
              </p>
            </div>
          </div>
        </div>
        <div className="list-row">
          {filteredCoins.length <= 0 ? (
            <h3 className="error-search">Please repeat search</h3>
          ) : (
            filteredCoins.map((item) => {
              const {
                id,
                name,
                image,
                market_cap_rank,
                current_price,
                ath,
                ath_date,
                ath_change_percentage,
                symbol,
              } = item;
              return (
                <div key={id} className={`list-item-${mode}`}>
                  <div className="item-content">
                    <div className="name-img">
                      <h3>{name}</h3>
                      <img src={image} alt={name} />
                    </div>
                    <p className="coin-symbol">{symbol.toUpperCase()}</p>
                    <div className="coin-info">
                      <p className="coin-price">
                        {market_cap_rank}
                      </p>
                      <p className="coin-price">
                        £
                        {current_price < 1
                          ? current_price.toFixed(3)
                          : current_price > 10000
                          ? current_price.toFixed(0)
                          : current_price.toFixed(1)}
                      </p>
                      <p
                        className="coin-price"
                      >
                        £
                        {ath < 1
                          ? ath.toFixed(3)
                          : ath > 10000
                          ? ath.toFixed(0)
                          : ath.toFixed(2)}
                      </p>
                      <p
                        className={`${
                          ath_change_percentage > 0
                            ? "coin-24h percent-green"
                            : "coin-24h percent-red"
                        }`}
                      >
                        {ath_change_percentage
                          ? ath_change_percentage.toFixed(2) + "%"
                          : "n/a"}
                      </p>
                      <p
                        className="coin-24h"
                      >
                        {findMonthOfATH(ath_date)}
                      </p> 
                      <p
                        className="coin-24h"
                      >
                        £{(ath/current_price * 100).toFixed(0)}
                      </p>      
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
