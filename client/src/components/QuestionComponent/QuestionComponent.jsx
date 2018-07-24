import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './question-component.css';

class QuestionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    componentWillMount() {

    }

    onSelectAnswer(e, quiz) {
        Object.assign(quiz, { answer: e.target.value });
        const questions = this.state.questions;
        this.setState(questions);
    }

    render() {
        return (
            <div className="quiz-container">
                {
                    this.props.questions.map((quiz, idx) => {
                        return (<div key={`question-key-${idx}`}>
                            <p><span>Q{idx + 1}_</span>{quiz.question}</p>
                            <ul>
                                {
                                    quiz.options.map((option, key) => {
                                        return (<li className="form-check" key={`question-${idx}-option-${key}`}>
                                            <input className="form-check-input" type="radio" name={option} id={option} value={option} checked={quiz.answer === option} onChange={(e) => this.onSelectAnswer(e, quiz)} />
                                            <label className="form-check-label" htmlFor={option}>{option}</label>
                                        </li>);
                                    })
                                }
                            </ul>
                        </div>)
                    })
                }
            </div>
        );
    }
}

QuestionComponent.propTypes = {
    questions: PropTypes.array
};

QuestionComponent.defaultProps = {
    questions: []
};

export default QuestionComponent;
