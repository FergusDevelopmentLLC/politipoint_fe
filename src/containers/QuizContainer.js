import React, { Component, Fragment } from 'react'
import Statement from '../components/Statement'
import { HeaderLogoSkinny } from '../components/HeaderLogoSkinny'

import { connect } from 'react-redux'
import { fetchQuestions } from '../actions/quizActions'
import PropTypes from 'prop-types'

class QuizContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: this.props.questions,
      version: 2,
      currentIndex: 0,
      currentText: 'Loading...',
      maxEconomic: 0,
      maxDiplomatic: 0,
      maxCivil: 0,
      maxSocietal: 0,
      userEconomicScore: 0,
      userDiplomaticScore: 0,
      userCivilScore: 0,
      userSocietalScore: 0
    }
  }

  calculateScore = (score, max) => {
    return (100 * (max + score) / (2 * max)).toFixed(1)
  }

  saveResult = async () => {

    let e = this.calculateScore(this.state.userEconomicScore, this.state.maxEconomic) 
    let d = this.calculateScore(this.state.userDiplomaticScore, this.state.maxDiplomatic)
    let g = this.calculateScore(this.state.userCivilScore, this.state.maxCivil) 
    let s = this.calculateScore(this.state.userSocietalScore, this.state.maxSocietal)

    let testResult = {
      question_version: this.state.version,
      economic: parseFloat(e),
      diplomatic: parseFloat(d),
      civil: parseFloat(g),
      societal: parseFloat(s)
    }

    if(this.props.setVersion) {
      this.props.setVersion(testResult.question_version)
    }
    
    const options = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify( { test_result: testResult } )
    }

    let apiUrl = `${this.props.urlPrefix}/test_results`
    await fetch(apiUrl, options)
            .then(res => res.json())
              .then(tr => {
                this.props.setTestResult(tr)//tr should have the county now, after saving
                this.props.history.push('/participation')
              })
  }

  componentDidMount() {
    this.props.fetchQuestions(this.props.urlPrefix, this.state.version)
  }

  static getDerivedStateFromProps(props, state) {
    if(props.questions.length > 0) {
      const questions = props.questions
      return {
        questions: questions,
        currentText: questions[state.currentIndex].question,
        questionIterationId: questions[state.currentIndex].question_iteration_id,
        maxEconomic: questions.reduce((acc, question) => acc + Math.abs(question.effect.econ), 0),
        maxDiplomatic: questions.reduce((acc, question) => acc + Math.abs(question.effect.dipl), 0),
        maxCivil: questions.reduce((acc, question) => acc + Math.abs(question.effect.govt), 0),
        maxSocietal: questions.reduce((acc, question) => acc + Math.abs(question.effect.scty), 0)
      }
    }
    else {
      return null
    }
  }

  onResponse = async (multiplier) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        userEconomicScore:   prevState.userEconomicScore   += multiplier * prevState.questions[prevState.currentIndex].effect.econ,
        userDiplomaticScore: prevState.userDiplomaticScore += multiplier * prevState.questions[prevState.currentIndex].effect.dipl,
        userCivilScore:      prevState.userCivilScore      += multiplier * prevState.questions[prevState.currentIndex].effect.govt,
        userSocietalScore:   prevState.userSocietalScore   += multiplier * prevState.questions[prevState.currentIndex].effect.scty
      }
    }, async () => {
      //go to the next statement if not at end.
      if (this.state.currentIndex < this.state.questions.length - 1) {
        this.setState((prevState) => {
          return {
            ...prevState,
            currentIndex: prevState.currentIndex + 1,
            currentText: prevState.questions[prevState.currentIndex + 1].question
          }
        })

        document.querySelector('.quiz-logo-wrapper').scrollIntoView({ 
          behavior: 'smooth' 
        })
        
      }
      else {
        await this.saveResult()
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

    let apiUrl = `${this.props.urlPrefix}/question_feedbacks`

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
}

const mapStateToProps = (state) => {
  return {
    questions: state.quizReducer.questions
  }
}

export default connect(mapStateToProps, { fetchQuestions })(QuizContainer)