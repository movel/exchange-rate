import React, { PureComponent } from 'react';
import './Cryptocurrency.css'

class Cryptocurrency extends PureComponent {
  render() {
    const {
      id,
      name,
      symbol,
      price_usd,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
    } = this.props.data;
    return (
      <li className={"cryptocurrency " + id}>
        <p className="cryptocurrency__name">{name} ({symbol})</p>
        <h1>${ (+price_usd).toFixed(2) }</h1>
        <p className={percent_change_1h > 0 ? "green" : "red"}>{percent_change_1h}% 1hr</p>
        <p className={percent_change_24h > 0 ? "green" : "red"}>{percent_change_24h}% 24hrs</p>
        <p className={percent_change_7d > 0 ? "green" : "red"}>{percent_change_7d}% 7days</p>
      </li>
    );
  }
}


export default Cryptocurrency;