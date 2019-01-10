import React from 'react';
import './Cryptocurrency.css'

const Cryptocurrency = props => {
  const tickers = props.data.map((currency) =>
    <li className={"cryptocurrency " + currency.id}>
      <p className="cryptocurrency__name">{currency.name} ({currency.symbol})</p>
      <h1>${ (+currency.price_usd).toFixed(2) }</h1>
      <p className={currency.percent_change_1h > 0 ? "green" : "red"}>{currency.percent_change_1h}% 1hr</p>
      <p className={currency.percent_change_24h > 0 ? "green" : "red"}>{currency.percent_change_24h}% 24hrs</p>
      <p className={currency.percent_change_7d > 0 ? "green" : "red"}>{currency.percent_change_7d}% 7days</p>
    </li>
  )
    
  return (
    <ul className="tickers">
      { tickers }
    </ul> 
  )
}

export default Cryptocurrency