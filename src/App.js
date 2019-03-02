import React, { Component } from 'react';
import './App.css';

import Facebook from './components/Facebook'
import Google from './components/Google'

import Modal from './components/Modal'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      isOpen: false,
      isLoggedIn: false,
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isLoggedIn } = this.state

    return (
      <div className="App">
        <h1>Facebook and Google Login Example</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.toggleModal}>
          Open the modal
        </button>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          `Here's some content for the modal`
        </Modal>
        <div>
          <Google />
        </div>
      </div>
    );
  }
}

export default App;
