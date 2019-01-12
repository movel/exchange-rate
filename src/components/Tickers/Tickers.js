import React, { PureComponent } from 'react'
import Select from 'react-select'
import CryptoCurrencyContainer from '../../containers/CryptoCurrencyContainer/CryptoCurrencyContainer'
import CurrencyContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import classes from './Tickers.module.css'
import * as constants from '../../options'

class Tickers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: [{
        "value": "JPY",
        "label": "JPY"
      }],
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption } = this.state

    return (
      <div className={ classes.tickers__container }>
        <CryptoCurrencyContainer />
        <br />
        <CurrencyContainer selected={selectedOption} />
        <br />
        <div className={ classes.select }>
          <Select
            value={ selectedOption }
            onChange={ this.handleChange }
            isMulti
            options={ constants.options }
          />
        </div>
        
        <p>Information updated every minute courtesy of <a href="http://www.coinmarketcap.com" target="_blank" rel="noopener noreferrer">coinmarketcap.com</a></p>
      </div>
    );
  }
}

export default Tickers;