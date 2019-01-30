import React, {
  PureComponent
} from 'react'
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import Tooltip from '@atlaskit/tooltip'
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

    const formatGroupLabel = data => (
      <div title={data.options.title}>
        {data.options.title}
      </div>
    )

    const MultiValueContainer = (props) => {
      return (
        <Tooltip content={props.data.label}>
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
            {
              'option': true,
              'option--is-disabled': isDisabled,
              'option--is-focused': isFocused,
              'option--is-selected': isSelected,
            },
            className
          )}
          {...innerProps}
          title={props.data.label}
        >
          {children}
        </div>
      );
    };

    // https://codesandbox.io/s/k57k95qy53?module=/example.js
    // https://codesandbox.io/s/1qopmv0nvj?module=/example.js

    return (
      <div className="tickers__container">
        <CryptoCurrencyContainer />
        <br />

        <CurrencyContainer selected={selectedOption} />
        <br />

        <Select 
          value={selectedOption}
          onChange={this.handleChange}
          components={{ MultiValueContainer, Option }}
          styles={{ option: (base) => ({ ...base, border: `2px dotted #333355`, height: '100%' }) }}
          isMulti 
          options={constants.options}
          formatGroupLabel={formatGroupLabel}
        />
      </div>
    )
  }
}

export default Tickers