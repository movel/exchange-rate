import React, { PureComponent } from 'react';
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import axios from 'axios'

class QuizList extends PureComponent {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li
          key={ quiz.id }
        >
          <NavLink to={ '/quiz/' + quiz.id }>
            { quiz.name } 
          </NavLink>
        </li>
      )
    })
  }
  
  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-be55b.firebaseio.com/quizes.json')

      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test #${index + 1}`
        })
      })

      this.setState({
        quizes,
        loading: false
      })
    } catch (e) {
      console.log('error: ', e)
    }
  }

  render() {
    return (
      <div className={ classes.QuizList }>
        <div>
          <h1>List of tests</h1>

          { 
            this.state.loading 
              ? <Loader />
              : <ul>
                  { this.renderQuizes() }
                </ul>
          }
        </div>        
      </div>
    );
  }
}

export default QuizList;