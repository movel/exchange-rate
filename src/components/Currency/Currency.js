import React, { PureComponent } from 'react'
import classes from './Currency.module.css'

class Currency extends PureComponent {
  render() {
    const { value, name } = this.props
    return (
      <li className={ `${ classes.currency }` }>
        <p className="currency__name">{ name } &#8381;{ (+value).toFixed(2) }</p>
      </li>
    )
  }
}

export default Currency