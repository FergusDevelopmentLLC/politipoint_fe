import React, { Component, Fragment } from 'react'
import Statement from '../components/Statement'

class QuizContainer extends Component {

  constructor() {
    super()
    this.state = {
      questions: [],
      currentNumber: 0,
      currentText: 'Loading...',
      maxEconomic: 0,
      maxDiplomatic: 0,
      maxCivil: 0,
      maxSocietal: 0,
      currentEconScore: 0,
      currentDiplomaticScore: 0,
      currentCivilScore: 0,
      currentSocietalScore: 0
    }
  }

  async componentDidMount() {

    let url = `${this.props.urlPrefix}/questions/by_version/${this.props.version}`
    
    let questions = await fetch(url).then(r => r.json())
    
    this.setState((previousState) => {
      return {
        ...previousState,
        questions: questions,
        currentText: questions[previousState.currentNumber].question
      }
    }, () => {
      this.setState((previousState) => {
        return {
          ...previousState,
          maxEconomic: questions.reduce((acc, question) => acc + Math.abs(question.effect.econ), 0),
          maxDiplomatic: questions.reduce((acc, question) => acc + Math.abs(question.effect.dipl), 0),
          maxCivil: questions.reduce((acc, question) => acc + Math.abs(question.effect.govt), 0),
          maxSocietal: questions.reduce((acc, question) => acc + Math.abs(question.effect.scty), 0)
        }
      })
    })
    
  }

  onResponse = (multiplier) => {
    console.log('multiplier', multiplier)
  }

  render() {
    return (
      <Fragment>
      <div className='quiz-logo-wrapper'>
        <img alt='Politipoint' src="https://res.cloudinary.com/fergusdev/image/upload/v1602701055/politipoint/logos/politipoint-wordmark-color_ewmxr1.png" />
      </div>
      <hr/>
      <Statement 
        currentText={ this.state.currentText } 
        currentNumber={ this.state.currentNumber } 
        allStatementsCount={ this.state.questions.length } 
        onResponse={ this.onResponse }
        />

      </Fragment>
    )
  }
}

export default QuizContainer