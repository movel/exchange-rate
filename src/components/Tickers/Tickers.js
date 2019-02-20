import React, {
  PureComponent
} from 'react'
import { css } from 'emotion'
import Select, { components } from 'react-select'
import Tooltip from '@atlaskit/tooltip'
import CryptoCurrencyContainer from '../../containers/CryptoCurrencyContainer/CryptoCurrencyContainer'
import CurrencyContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import './Tickers.sass'
import * as constants from '../../options'

const MultiValueContainer = (props) => {
  return (
    <Tooltip content={props.data.title}>
      <components.MultiValueContainer {...props}/>
    </Tooltip>
  )
}

const Option = (props) => {
  const { children, className, cx, getStyles, isDisabled, isFocused, isSelected, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      className={cx(
        css(getStyles('option', props)),
        {
          'option': true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className
      )}
      {...innerProps}
      title={props.data.title}
    >
      {children}
    </div>
  );
};

const options = constants.options.map( item => {
  return {...item, title: constants.currencies[item.label]}
})

class Tickers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: [{
        "value": "JPY",
        "label": "JPY",
        "title": "Japanese Yen",
      }],
    }
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedOption
    })
  }

  render() {
    const {selectedOption} = this.state

    // https://codesandbox.io/s/k57k95qy53?module=/example.js
    // https://codesandbox.io/s/1qopmv0nvj?module=/example.js

    return (
      <div className="tickers__container">
        <CurrencyContainer selected={selectedOption} />
        <br />

        <Select 
          value={ selectedOption }
          onChange={ this.handleChange }
          components={{ MultiValueContainer, Option }}
          styles={{ option: (base) => ({ ...base, height: '100%' }) }}
          isMulti 
          options={ options }
        />
        
      </div>
    )
  }
}

export default Tickers