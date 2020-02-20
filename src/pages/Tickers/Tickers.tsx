import React, { useState, createContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import Select, { components } from 'react-select'
import CurrenciesContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import * as constants from '../../options'
import './Tickers.sass'
import { addSelectedError, addSelected } from '../../store/actions/selected'
import { State } from '../../store/reducers'
import { logout } from '../../store/actions/auth'
import { fetchConfigFromFirebase, postGoogleFirebase, patchGoogleFirebase } from '../../store/actions/config'
import { checkActualData } from '../../store/actions/rates'
import { getSelected } from '../../store/selectors/selected'
import { getConfig, getConfigKey } from '../../store/selectors/config'
import { getActualData } from '../../store/selectors/rates'
import { getIsAuthenticated, getToken, getUserId } from '../../store/selectors/auth'

// React-select component configuration
// --- BEGIN ---
const MultiValueContainer = (props: { data: { title: string | undefined; }; }) => {
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
// React-select component configuration
// --- END ---

const selectedContext = createContext([])

const Tickers = (props: any) => {
  const [selectedOption, setSelectedOption] = useState(props.selected.selected)

  // let config_key: string = props.config_key

  useEffect(() => {
    // Load Config data for user
    let configData = null

    if(props.isAuthenticated) {
      let configFromLocalStorage = localStorage.getItem('dataConfig')
      if (typeof configFromLocalStorage === 'string') {
        configData = JSON.parse(configFromLocalStorage)
      }

      if(configData.userId && configData.userId === props.userId) {
        // Load config from LocalStorage
        setSelectedOption(configData.selected)
        props.addSelected(configData.selected)
      } else {
        // Remove config data for other user
        localStorage.removeItem('dataConfig')
        // Load config data from FireBase
        props.fetchConfigFromFirebase(props.userId)
        .then(() => {
          // if(typeof props.config.config[0] == null) {
            
          // } else {
          //   console.log('props.config.config[0]', props.config.config[0])
          //   setSelectedOption(props.config.config[0])
          //   props.addSelected(props.config.config[0])
          // }
        })
      }
      
    }

    // Load Currencies data
    // Check Last data on FireBase
    let rates: any  = null
    let actualData = false

    props.checkActualData()
    .then(() => {
      let ratesFromLocalStorage = localStorage.getItem('rates')
      if (typeof ratesFromLocalStorage === 'string') {
        rates = JSON.parse(ratesFromLocalStorage)
      }

      actualData = rates.actualData
      if(actualData) {

      } else {

      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.config_key])

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    props.addSelected(selectedOption)
    // Save config on FireBase
    if(props.isAuthenticated) {
      let post_config_data = { userId: props.userId, selected: selectedOption }
      if(props.config.config_key) {
        props.patchGoogleFirebase(props.config.config_key, post_config_data)
      }
      else {
        props.postGoogleFirebase(post_config_data)
      }
    } 
  }

  return (
    <div className="tickers__container">
      <h1>Tickers</h1>
      <button onClick={() => {
        props.logout(() => {
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

const mapStateToProps = (state: State) => {
  return ({
    selected: getSelected(state),
    config: getConfig(state),
    isAuthenticated: getIsAuthenticated(state),
    token: getToken(state),
    userId: getUserId(state),
    config_key: getConfigKey(state),
    isActualData: getActualData(state),
  });
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    addSelectedError: (err: Error) => dispatch(addSelectedError(err)),
    addSelected: (selected: []) => dispatch(addSelected(selected)),
    logout: () => dispatch(logout()),
    fetchConfigFromFirebase: (userId: string) => dispatch(fetchConfigFromFirebase(userId)),
    postGoogleFirebase: (data: []) => dispatch(postGoogleFirebase(data)),
    patchGoogleFirebase: (key: string, data: []) => dispatch(patchGoogleFirebase(key, data)),
    checkActualData: () => dispatch(checkActualData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickers)
export { selectedContext }