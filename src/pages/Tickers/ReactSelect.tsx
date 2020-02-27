import React from 'react'
import { css } from 'emotion'
import { components } from 'react-select'
import * as constants from '../../options'

// React-select component configuration
// --- BEGIN ---
export const MultiValueContainer = (props: { data: { title: string | undefined; }; }) => {
  return (
    <div title={props.data.title}>
      <components.MultiValueContainer {...props}/>
    </div>
  )
}

export const Option = (props: any) => {
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

export const options: any = constants.options.map(item => {
  let title = constants.currencies.find(element => {
    return element.value === item.value
  })
  if(title === undefined) title = {value:'no data', label:'no data'}
  return {...item, title: title.label}
})
// React-select component configuration
// --- END ---