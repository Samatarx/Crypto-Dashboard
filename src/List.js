import React, { useState } from "react";
import "./Styling/List.css";

function List({ filterCoins, setRefresh }) {
  const [sorted, setSorted] = useState(filterCoins);
  const [order, setOrder] = useState(true)

  const sortPrice = (field) => {
    
    let sortedPrices = sorted.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
       if (a[field] > b[field]) {
        return 1;
      }

      return 0;
    });
    // let sortedPrices =  sorted.sort((a,b) => {
    //     const x = a[field]
    //     const y = b[field]
    //     return (order? x>y: x<y)
    //   } )
      setOrder(false)
    setSorted(sortedPrices);
    console.log(sortedPrices);
    setRefresh(true);
  };

  // if (order){
  //   sorted.reverse()
  //   console.log(sorted)
 
  // }

 
  // console.log(filterCoins[0].current_price)

  // var newCoins = filterCoins.map(el => Object.keys(el).map((key) => [el[key]]))

  // var test = newCoins.map((item) => item[26])

  // console.log(test);

  // const [sortType, setSortType] = useState(true)

  // const onSort = sortType => {
  //   setSortType(!sortType)
  // }

  // const sorted = filterCoins.sort((a,b) => {
  //   const {current_price} = filterCoins
  //   const isReveresed = (sortType)? 1 : -1
  //   return isReveresed * a.current_price.localeCompare(b.current_price)
  // })

  // console.log(sorted)

  return (
    <div className="list-container">
      <div className="list-item top">
        <div className="item-content">
          <div className="name-img">
            <h3>Coin</h3>
          </div>
          <p className="coin-symbol">Code</p>
          <div className="coin-info top">
            <p
              className="coin-price"
              onClick={() => sortPrice("current_price")}
            >
              Current Price
            </p>
            <p
              className="coin-1h"
              onClick={() =>
                sortPrice("price_change_percentage_1h_in_currency")
              }
            >
              1h Price Change
            </p>
            <p
              className="coin-24h"
              onClick={() => sortPrice("price_change_percentage_24h")}
            >
              24h Price Change
            </p>
            <p
              className="coin-7d"
              onClick={() =>
                sortPrice("price_change_percentage_7d_in_currency")
              }
            >
              7d Price Change
            </p>
          </div>
        </div>
      </div>
      <div className="list-row">
        {sorted.map((item) => {
          const {
            id,
            name,
            image,
            current_price,
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
                      : current_price.toFixed(2)}
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
