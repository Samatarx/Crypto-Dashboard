import React from "react";
import "./Styling/List.css";

function List({ filterCoins }) {
  return (
    <div className="list-container">
      <div className="list-item top">
        <div className="item-content">
          <div className="name-img">
            <h3>Coin</h3>
          </div>
          <p className="coin-symbol">Code</p>
          <div className="coin-info top">
            <p className="coin-price">Current Price</p>
            <p className="coin-1h">1h Price Change</p>
            <p className="coin-24h">24h Price Change</p>
            <p className="coin-7d">7d Price Change</p>
          </div>
        </div>
      </div>
      <div className="list-row">
        {filterCoins.map((item) => {
          const {
            id,
            name,
            image,
            current_price,
            market_cap_rank,
            price_change_percentage_1h_in_currency,
            price_change_percentage_7d_in_currency,
            price_change_percentage_24h,
            symbol,
          } = item;
          return (
            <div key={id} className="list-item">
              <div className="item-content">
                <div className="name-img">
                  <h3>{name}</h3>
                  <img src={image} alt={name} />
                </div>
                <p className="coin-symbol">{symbol.toUpperCase()}</p>
                <div className="coin-info">
                  <p className="coin-price">
                    £
                    {current_price < 1
                      ? current_price.toFixed(3)
                      : current_price}
                  </p>
                  <p
                    className={`${
                      price_change_percentage_1h_in_currency > 0
                        ? "coin-1h percent-green"
                        : "coin-1h percent-red"
                    }`}
                  >
                    {price_change_percentage_1h_in_currency.toFixed(2)}%
                  </p>
                  <p
                    className={`${
                      price_change_percentage_24h > 0
                        ? "coin-24h percent-green"
                        : "coin-24h percent-red"
                    }`}
                  >
                    {price_change_percentage_24h.toFixed(2)}%
                  </p>
                  <p
                    className={`${
                      price_change_percentage_7d_in_currency > 0
                        ? "coin-7d percent-green"
                        : "coin-7d percent-red"
                    }`}
                  >
                    {price_change_percentage_7d_in_currency.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
