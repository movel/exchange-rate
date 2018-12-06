import React, { PureComponent } from 'react';
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'

class QuizCreator extends PureComponent {

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = () => {

  }

  createQuizHandler = () => {

  }

  render() {
    return (
      <div className={ classes.QuizCreator }>
        <div>
          <h1>Creating Test</h1>

          <form onSubmit={ this.submitHandler }>

            <input type="text"/>
            <hr/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>

            <select></select>

            <Button
              type="primary"
              onClick={ this.addQuestionHandler }
            >
              Add question
            </Button>
            <Button
              type="success"
              onClick={ this.createQuizHandler }
            >
              Creat test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;