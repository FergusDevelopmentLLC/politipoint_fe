import React, { Component, Fragment} from 'react';

class Statement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backButtonOn: props.currentNumber > 1 ? true : false,
      nextButtonOn: false,
      answerId: null,
    }
  }

  getStatementText = () => {
    if(this.props.currentNumber > -1 && this.props.allStatementsCount) {
      return `Statement ${(this.props.currentNumber + 1).toString()} of ${this.props.allStatementsCount.toString()}`
    }
    return ''
  }

  getClassName = (id) => {
    return this.state.answerId === id ? 'statement-response-button statement-response-button-selected' : 'statement-response-button'
  }

  onAgreementClick = (event) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        nextButtonOn: true,
        answerId: event.target.id
      }
    })
  }

  onBackClick = (event) => {
    console.log('onNextClick')
  }

  onNextClick = (event) => {
    let mult
    
    switch(this.state.answerId) {
      case "answer-01":
        mult = 1.0
        break
      case "answer-02":
        mult = 0.5
        break
      case "answer-03":
        mult = 0
        break
      case "answer-04":
        mult = -0.5
        break
      case "answer-05":
        mult = -1.0
        break
      default:
        mult = 0
    }
    
    this.props.onResponse(mult)

  }


  render() {

    return (
      <Fragment>
        
      <h3>{ this.getStatementText() }</h3>

      <div className="statement-wrapper">{ this.props.currentText }</div>

      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-01") } id="answer-01" style={{ backgroundColor: '#1b5e20' }}>Strongly Agree</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-02") } id="answer-02" style={{ backgroundColor: '#4caf50' }}>Agree</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-03") } id="answer-03" style={{ backgroundColor: '#bbbbbb' }}>Neutral/Unsure</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-04") } id="answer-04" style={{ backgroundColor: '#f44336' }}>Disagree</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-05") } id="answer-05" style={{ backgroundColor: '#b71c1c' }}>Strongly Disagree</button>

      <div className="back-next-wrapper">
        <button className={ `small_button${ this.state.backButtonOn ? "" : "_off" }` } onClick={ this.onBackClick } disabled={ this.state.backButtonOn ? '' :  'disabled' }>Back</button>
        <button className={ `small_button${ this.state.nextButtonOn ? "" : "_off" }` } onClick={ this.onNextClick } disabled={ this.state.nextButtonOn ? '' :  'disabled' }>Next</button>
      </div>


      </Fragment>
    )
  }
}

export default Statement
