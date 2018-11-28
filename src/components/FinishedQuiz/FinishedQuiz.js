import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
  return (
    <div className={ classes.FinishedQuiz }>
      <ul>
        <li>
          <strong>1. 
            How are you?
          </strong>
          <i className={ ' ' } />
        </li>
      </ul>

      <p>Right 4 of 20</p>

      <div>
        <button>Again</button>
      </div>
    </div>
  )
}

export default FinishedQuiz 