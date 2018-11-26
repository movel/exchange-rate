import React, { Component } from 'react';
import Layout from './hoc/layout/Layout'
import './App.css';
import Quiz from './containers/Quiz/Quiz'

class App extends Component {
  render() {
    return (
      <Layout>
        <Quiz />
      </Layout>
    );
  }
}

export default App;
