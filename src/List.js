import React from "react";
import "./Styling/Card.css";
import './Styling/List.css'

function List({ filterCoins }) {
  console.log(filterCoins);
  return (
    <div className='list-container' >
      {filterCoins.map((item) => {
        const {
          id,
          name,
          image,
          current_price,
          market_cap_rank,
          price_change_percentage_1h_in_currency,
        } = item;
        return (
          <div key={id} className='list-item' >
            <h3>{name}</h3>
            <div className="item-content">
            <img src={image} alt={name} />
            <ul>
              <li>£{current_price}</li>
              <li>{market_cap_rank}</li>
              <li>{price_change_percentage_1h_in_currency.toFixed(2)}%</li>
            </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default List;
