import React from 'react'

function Card({info}) {
    
    console.log(info[0])
    return (
        <div>
                {info.map((item)=>{
                    const {id,name,image,current_price,market_cap_rank,price_change_percentage_1h_in_currency} = item 
                    return <div key={id} >
                        <h3>{name}</h3>
                        <img src={image} alt={name}/>
                        <ul>
                            <li>£{current_price}</li>
                            <li>{market_cap_rank}</li>
                            <li>{price_change_percentage_1h_in_currency.toPrecision(2)}%</li>
                        </ul>
                    </div>
                })}
        </div>
    )
}

export default Card
