import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-be55b.firebaseio.com/'
})