import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { QuestionComponent } from './components';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      modal: false,
      backdrop: true
    };
  }

  componentWillMount(){
    fetch('http://localhost:3000/api/questions', {})
    .then((response) => response.json())
    .then((res) => {
      const questions = res.data;
      this.setState({ questions });
    });
  }

  onSubmitAnswer(e) {
    e.preventDefault();

    fetch('http://localhost:3000/api/score', { 
      method: 'POST', 
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state.questions)
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({
        result: res,
        modal: !this.state.modal
      });
    });
  }

  render() {
    const result = this.state.result || {};

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">General Knowledge_</h1>
        </header>
        <form className="questions-container text-center" onSubmit={(e) => this.onSubmitAnswer(e)}>
          <QuestionComponent questions={ this.state.questions } />
          <Button type="submit" color="primary" size="lg">Submit</Button>
        </form>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader>
            Your Score
          </ModalHeader>
          <ModalBody>
            <h4>{result.score}</h4>
            <p>{ `${result.correct} Correct` } </p>
            <p className="incorrect">{ `${result.incorrect} Incorrect` }</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  className: PropTypes.string
};

App.defaultProps = {
  className: 'modal-dialog-centered modal-sm'
};

export default App;
