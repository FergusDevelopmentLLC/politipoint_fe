import React, { Component, Fragment } from 'react'
import Statement from '../components/Statement'
import { HeaderLogoSkinny } from '../components/HeaderLogoSkinny'

import { connect } from 'react-redux'
import { fetchQuestions } from '../actions/quizActions'
import { createTestResult } from '../actions/testResultActions'
import PropTypes from 'prop-types'
import { URL_PREFIX } from '../actions/urlPrefix'

class QuizContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: this.props.questions,
      version: this.props.version,
      currentIndex: 20,
      currentText: 'Loading...',
      testResult: {
        question_version: this.props.version,
        economic: 0,
        diplomatic: 0,
        civil: 0,
        societal: 0
      }
    }
  }

  componentDidMount() {
    this.props.fetchQuestions(this.state.version)
  }

  static getDerivedStateFromProps(props, state) {
    if(props.questions.length > 0 && state.questions.length === 0) {
      return {
        questions: props.questions,
        currentText: props.questions[state.currentIndex].question
      }
    }
    else {
      return null
    }
  }

  calculateScore = (score, max) => {
    return (100 * (max + score) / (2 * max)).toFixed(1)
  }

  saveTestResult = () => {

    const questions = this.state.questions

    const maxEconomic   = questions.reduce((acc, question) => acc + Math.abs(question.effect.econ), 0)
    const maxDiplomatic = questions.reduce((acc, question) => acc + Math.abs(question.effect.dipl), 0)
    const maxCivil      = questions.reduce((acc, question) => acc + Math.abs(question.effect.govt), 0)
    const maxSocietal   = questions.reduce((acc, question) => acc + Math.abs(question.effect.scty), 0)

    let testResult = {
      question_version: this.state.version,
      economic:   parseFloat(this.calculateScore(this.state.testResult.economic, maxEconomic)),
      diplomatic: parseFloat(this.calculateScore(this.state.testResult.diplomatic, maxDiplomatic)),
      civil:      parseFloat(this.calculateScore(this.state.testResult.civil, maxCivil)),
      societal:   parseFloat(this.calculateScore(this.state.testResult.societal, maxSocietal))
    }

    console.log('testResult', testResult)

    this.props.createTestResult(testResult, this.props.history)
    
  }
  
  onResponse = async (multiplier) => {

    this.setState((previousState) => {
      
      // save updated testResult in state
      return {
        ...previousState,
        testResult: {
          ...previousState.testResult,
          economic: previousState.testResult.economic       += multiplier * previousState.questions[previousState.currentIndex].effect.econ,
          diplomatic: previousState.testResult.diplomatic   += multiplier * previousState.questions[previousState.currentIndex].effect.dipl,
          civil: previousState.testResult.civil             += multiplier * previousState.questions[previousState.currentIndex].effect.govt,
          societal: previousState.testResult.societal       += multiplier * previousState.questions[previousState.currentIndex].effect.scty
        }
      }
    }, () => {
      // after saving test result to state, if this is not the last question, increment it
      if (this.state.currentIndex < this.state.questions.length - 1) {
        this.setState((previousState) => {
          const nextIndex = previousState.currentIndex + 1
          return {
            ...previousState,
            currentIndex: nextIndex,
            currentText: previousState.questions[nextIndex].question
          }
        })
      }
      else {
        console.log('save result?')
        this.saveTestResult()
      }
    })

  }

  onFeedbackGiven = async (feedback) => {

    feedback.question_iteration_id = this.state.questions[this.state.currentIndex].question_iteration_id

    const options = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify( { question_feedback: feedback } )
    }

    let apiUrl = `${ URL_PREFIX }/question_feedbacks`

    await fetch(apiUrl, options)
            .then(res => res.json())
              .then(feedback => {
                //console.log('feedback saved', feedback)
              })
  }

  render() {
    return (
      <Fragment>
      <HeaderLogoSkinny version={ this.state.version } />
      <Statement 
        currentText={ this.state.currentText } 
        currentIndex={ this.state.currentIndex } 
        allStatementsCount={ this.state.questions.length }
        onResponse={ this.onResponse }
        onFeedbackGiven={ this.onFeedbackGiven }
        />
      </Fragment>
    )
  }
}

QuizContainer.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  createTestResult: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    questions: state.quizReducer.questions
  }
}

export default connect(mapStateToProps, { fetchQuestions, createTestResult })(QuizContainer)