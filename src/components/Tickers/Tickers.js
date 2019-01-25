import React, { PureComponent } from 'react'
import Select from 'react-select'
import CryptoCurrencyContainer from '../../containers/CryptoCurrencyContainer/CryptoCurrencyContainer'
import CurrencyContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import './Tickers.sass'
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
      <div className="tickers__container">
        <CryptoCurrencyContainer />
        <br />
        <CurrencyContainer selected={selectedOption} />
        <br />
        <div className="select">
          <Select
            value={ selectedOption }
            onChange={ this.handleChange }
            isMulti
            options={ constants.options }
          />
        </div>
      </div>
    )
  }
}

export default Tickers