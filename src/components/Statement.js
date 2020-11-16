import React, { Component, Fragment} from 'react';

class Statement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextButtonOn: false,
      showStatementFeedbackInstructions: false,
      answerId: null,
      feedbackId: null,
      feedbackExplanation: ''
    }
  }

  getStatementText = () => {
    if(this.props.currentNumber > -1 && this.props.allStatementsCount) {
      return `Statement ${(this.props.currentNumber + 1).toString()} of ${this.props.allStatementsCount.toString()}`
    }
    return ''
  }

  getClassName = (id) => {
    return this.state.answerId === id ? 'statement-button statement-button-selected' : 'statement-button'
  }

  getFeedbackButtonClassName = (id) => {
    return this.state.feedbackId === id ? 'statement-button statement-button-selected' : 'statement-button'
  }

  onAgreementClick = (event) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        nextButtonOn: true,
        answerId: event.target.id
      }
    })
    
    document.querySelector('.back-next-wrapper').scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  onFeedbackClick = (event) => {

    this.setState((previousState) => {
      return {
        ...previousState,
        feedbackId: event.target.id
      }
    })
    
    document.querySelector('.back-next-wrapper').scrollIntoView({ 
      behavior: 'smooth' 
    })
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
    
    this.setState((prevState) => {
      return {
        ...prevState,
        showStatementFeedbackInstructions: false,
        nextButtonOn: false,
        answerId: null,
        feedbackId: null,
        feedbackExplanation: ''
      }
    })

    if(this.state.feedbackId || this.state.feedbackExplanation) {

      let feedbackScore

      switch(this.state.feedbackId) {
        case "feedback-01":
          feedbackScore = 0
          break
        case "feedback-02":
          feedbackScore = 10
          break
        case "feedback-03":
          feedbackScore = 20
          break
        case "feedback-04":
          feedbackScore = 30
          break
        case "feedback-05":
          feedbackScore = 40
          break
        default:
          feedbackScore = 0
      }

      const feedback = {
        score: feedbackScore
      }
      
      if(this.state.feedbackExplanation) feedback.explanation = this.state.feedbackExplanation
      
      this.props.onFeedbackGiven(feedback)

      this.setState((previousState) => {
        return {
          ...previousState,
          feedbackId: null,
          feedExplanation: ''
        }
      })

    }

    this.props.onResponse(mult)

  }

  toggleStatementFeedbackInstructions = (event) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        showStatementFeedbackInstructions: !previousState.showStatementFeedbackInstructions
      }
    })
  }

  render() {

    return (
      <Fragment>
        
      <h3>{ this.getStatementText() }</h3>

      <div className="statement-wrapper">{ this.props.currentText }</div>

      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-01") } id="answer-01" style={{ backgroundColor: '#1b5e20' }}>Strongly agree</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-02") } id="answer-02" style={{ backgroundColor: '#4caf50' }}>Agree</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-03") } id="answer-03" style={{ backgroundColor: '#bbbbbb' }}>Neutral/unsure</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-04") } id="answer-04" style={{ backgroundColor: '#f44336' }}>Disagree</button>
      <button onClick={ this.onAgreementClick } className={ this.getClassName("answer-05") } id="answer-05" style={{ backgroundColor: '#b71c1c' }}>Strongly disagree</button>


      <div className="feedback-wrapper">
        <div className="feedback-instructions-wrapper">
          <h4 style={{ display: this.state.showStatementFeedbackInstructions ? 'none' : 'block' }}>Is the statement above flawed?</h4>
          <p style={{ display: this.state.showStatementFeedbackInstructions ? 'none' : 'block' }}>
            <a id="feedback-expand" onClick={this.toggleStatementFeedbackInstructions}>Click here</a> to provide feedback (optional)
          </p>
          <div className="feedback-instructions" style={{ display: this.state.showStatementFeedbackInstructions ? 'block' : 'none' }}>Indicate below the degree to which statement above is flawed.<br />(biased, unclear or otherwise problematic)</div>
        </div>
        <div style={{ display: this.state.showStatementFeedbackInstructions ? 'block' : 'none' }}>
          <button onClick={ this.onFeedbackClick } className={ this.getFeedbackButtonClassName("feedback-01") } id="feedback-01" style={{ backgroundColor: '#1b5e20' }}>No flaws</button>
          <button onClick={ this.onFeedbackClick } className={ this.getFeedbackButtonClassName("feedback-02") } id="feedback-02" style={{ backgroundColor: '#4caf50' }}>Slightly flawed</button>
          <button onClick={ this.onFeedbackClick } className={ this.getFeedbackButtonClassName("feedback-03") } id="feedback-03" style={{ backgroundColor: '#ff9400' }}>Significantly flawed</button>
          <button onClick={ this.onFeedbackClick } className={ this.getFeedbackButtonClassName("feedback-04") } id="feedback-04" style={{ backgroundColor: '#f44336' }}>Substantially flawed</button>
          <button onClick={ this.onFeedbackClick } className={ this.getFeedbackButtonClassName("feedback-05") } id="feedback-05" style={{ backgroundColor: '#b71c1c' }}>Majorly flawed</button>
          <div className="explanation-wrapper">
            <textarea onChange={(event) => {
              this.setState(previousState => {
                return {...previousState, feedbackExplanation: event.target.value }
              })
            }} className="explanation" placeholder="Explain your feedback (optional)." value={ this.state.feedbackExplanation }>
            </textarea>
          </div>
        </div>
      </div>

      {/* onclick="javascript:setFeedback(0, this.id)" */}
      <div className="back-next-wrapper">
        <button className={ `small_button${ this.state.nextButtonOn ? "" : "_off" }` } onClick={ this.onNextClick } disabled={ this.state.nextButtonOn ? '' :  'disabled' }>Next</button>
      </div>


      </Fragment>
    )
  }
}

export default Statement
