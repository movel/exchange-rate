import React, { useState, createContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { css } from 'emotion'
import Select, { components } from 'react-select'
import CurrenciesContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import * as constants from '../../options'
import auth from '../../components/Auth/Auth'
import './Tickers.sass'
import { addSelectedError, addSelected } from '../../store/actions/selected'
import { Dispatch } from 'redux'
import { State } from '../../store/reducers'

const MultiValueContainer = (props: any) => {
  return (
    <div title={props.data.title}>
      <components.MultiValueContainer {...props}/>
    </div>
  )
}

const Option = (props: any) => {
  const { children, className, cx, getStyles, isDisabled, isFocused, isSelected, innerProps } = props;
  const ref = React.createRef()
  
  return (
    <div
      ref={ref}
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
    >
      {children}<span className="tooltip">{props.data.title}</span>
    </div>
  );
};

const options: any = constants.options.map(item => {
  let title = constants.currencies.find(element => {
    return element.value === item.value
  })
  if(title === undefined) title = {value:'no data', label:'no data'}
  return {...item, title: title.label}
})

const selectedContext = createContext([])

const Tickers = (props: RouteComponentProps<any> & StateProps & DispatchProps) => {
  const [selectedOption, setSelectedOption] = useState(props.selected)

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
  }

  console.log('selectedOption', selectedOption)

  return (
    <div className="tickers__container">
      <h1>Tickers</h1>
      <button onClick={() => {
        auth.logout(() => {
          props.history.push("/");
        });
      } }>
        Logout
      </button>
      <br />
      <selectedContext.Provider value={selectedOption}>
        <CurrenciesContainer />
      </selectedContext.Provider>
      <br />
        <Select 
          closeMenuOnSelect={false}
          value={ selectedOption }
          onChange={ handleChange }
          components={{ MultiValueContainer, Option }}
          isMulti 
          options={ options }
          styles={{ option: (base) => ({ ...base, height: '100%' })}}
          className='react-select-container'
          classNamePrefix='react-select'
        />
    </div>
  )
}

interface StateProps {
  selected: [],
}

interface DispatchProps {
  addSelectedError: (err: Error) => void
  addSelected: (selected: []) => void
}

const mapStateToProps = (store: State) => {
  return ({
    selected: store.selected
  });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addSelectedError: (err: Error) => dispatch(addSelectedError(err)),
  addSelected: (selected: []) => dispatch(addSelected(selected)),
})

export default connect<StateProps, DispatchProps, RouteComponentProps<any>, any>(mapStateToProps, mapDispatchToProps)(Tickers)
export { selectedContext }