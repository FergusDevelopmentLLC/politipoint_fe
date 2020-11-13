import React, { Component, Fragment} from 'react';

class Statement extends Component {
  constructor() {
    super()
    this.state = {
      isBackButtonOn: false,
      isNextButtonOn: false
    }
  }

  getStatementText = () => {
    if(this.props.currentNumber && this.props.allStatementsCount) {
      return `Statement ${this.props.currentNumber.toString()} of ${this.props.allStatementsCount.toString()}`
    }
    return ''
  }

  render() {

    return (
      <Fragment>
        
      <h3>{ this.getStatementText() }</h3>

      <div className="statement-wrapper">
        <div>{ this.props.currentText }</div>
      </div>

      <button className="statement-response-button" id="answer-01" style={{ backgroundColor: '#1b5e20' }}>Strongly Agree</button>
      <button className="statement-response-button" id="answer-02" style={{ backgroundColor: '#4caf50' }}>Agree</button>
      <button className="statement-response-button" id="answer-03" style={{ backgroundColor: '#bbbbbb' }}>Neutral/Unsure</button>
      <button className="statement-response-button" id="answer-04" style={{ backgroundColor: '#f44336' }}>Disagree</button>
      <button className="statement-response-button" id="answer-05" style={{ backgroundColor: '#b71c1c' }}>Strongly Disagree</button>

      <div class="back-next-wrapper">
        <button className={ `small_button${ this.state.isBackButtonOn ? "" : "_off" }` }>Back</button>
        <button className={ `small_button${ this.state.isNextButtonOn ? "" : "_off" }` }>Next</button>
      </div>


      </Fragment>
    )
  }
}

export default Statement
