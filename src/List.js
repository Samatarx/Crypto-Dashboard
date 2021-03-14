import React from "react";
import "./Styling/List.css";

function List({ filterCoins }) {
  console.log(filterCoins);
  return (
    <div className="list-container">
      <div className="list-row">
        {filterCoins.map((item) => {
          const {
            id,
            name,
            image,
            current_price,
            market_cap_rank,
            price_change_percentage_1h_in_currency,
            price_change_percentage_7d_in_currency,price_change_percentage_24h,
            symbol,

          } = item;
          return (
            <div key={id} className="list-item">
              
              <div className="item-content">
                <h3>{name}</h3>
                <img src={image} alt={name} />
              <p>{symbol.toUpperCase()}</p>
                <p>
                  £
                  {current_price < 1 ? current_price.toFixed(3) : current_price}
                </p>
                <p>{market_cap_rank}</p>
                <p>{price_change_percentage_1h_in_currency.toFixed(2)}%</p>
                <p>{price_change_percentage_7d_in_currency.toFixed(2)}%</p>
                <p>{price_change_percentage_24h.toFixed(2)}%</p>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
