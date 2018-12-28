import React, { PureComponent } from 'react';
import classes from './Currency.module.css'

class Currency extends PureComponent {
  render() {
    const {
      id,
      name,
      symbol,
      price_usd,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
    } = this.props.dataCurrency;
    console.log('currency.props.dataCurrency', price_usd)
    return (
      <li className={`${classes.currency}+' '+ ${id}`}>
        <p className={classes.currency__name}>{name} ({symbol})</p>
        <h1>${ (+price_usd).toFixed(2) }</h1>
        <p className={percent_change_1h > 0 ? "green" : "red"}>{percent_change_1h}% 1hr</p>
        <p className={percent_change_24h > 0 ? "green" : "red"}>{percent_change_24h}% 24hrs</p>
        <p className={percent_change_7d > 0 ? "green" : "red"}>{percent_change_7d}% 7days</p>
      </li>
    );
  }
}

export default Currency;