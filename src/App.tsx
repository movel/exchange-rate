import React, { Component } from 'react';
import './App.css';

import Google from './components/Google'
import Modal from './components/Modal'

import ModalExample from './ModalExample'

type State = {
  isOpen: boolean,
  isLoggedIn: boolean,
  visible: boolean,
}

type Props = {}

class App extends Component<Props, State> {
  state = { 
    isOpen: false,
    isLoggedIn: false,
    visible: false,
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openModal() {
    this.setState({
        visible : true
    });
}

  closeModal() {
      this.setState({
          visible : false
      });
  }

  render() {

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
        <section>
            <h1>React-Modal Examples</h1>
            <input type="button" value="Open" onClick={() => this.openModal()} />
            <ModalExample visible={this.state.visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                <div>
                    <h1>Title</h1>
                    <p>Some Contents</p>
                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                </div>
            </ModalExample>
        </section>       
      </div>
    );
  }
}

export default App;
