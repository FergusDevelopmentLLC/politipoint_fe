import React, { Component, Fragment} from 'react';

class Statement extends Component {

  render() {

    return (
      <Fragment>
      <h3>Statement { this.props.currentQuestion.toString() } of { this.props.totalQuestionCount.toString() }</h3>

      <div className="statement-wrapper">
        <div>{ this.props.statementText }</div>
      </div>

      <button className="statement-response-button" id="answer-01" style={{ backgroundColor: '#1b5e20' }}>Strongly Agree</button>
      <button className="statement-response-button" id="answer-02" style={{ backgroundColor: '#4caf50' }}>Agree</button>
      <button className="statement-response-button" id="answer-03" style={{ backgroundColor: '#bbbbbb' }}>Neutral/Unsure</button>
      <button className="statement-response-button" id="answer-04" style={{ backgroundColor: '#f44336' }}>Disagree</button>
      <button className="statement-response-button" id="answer-05" style={{ backgroundColor: '#b71c1c' }}>Strongly Disagree</button>
      </Fragment>
    )
  }
}

Statement.defaultProps = {
  currentQuestion: 1,
  totalQuestionCount: 24,
  statementText: 'It is better It is betterIt is betterIt is betterIt is better.'
}

export default Statement
