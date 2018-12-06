import React, { PureComponent } from 'react';
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import { createControl } from '../../Form/formFramework'

function createOptionControl(number) {
  return createControl({
      label: `Option ${number}`,
      errorMessage: `Option don't have idle`
    }, {reqiered: true})
  }

class QuizCreator extends PureComponent {

  state = {
    quiz: [],
    formControls: {
      question: createControl({
        label: 'Enter question',
        errorMessage: `Question don't have idle`
      }, {reqiered: true}),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4)
    }
  }

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