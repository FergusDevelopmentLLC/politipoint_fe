import React, { Component, Fragment } from 'react'
import Continuum from '../components/Continuum'
import { MapboxGLMap } from '../components/MapboxGLMap'

class ResultsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testResult: this.props.testResult,
      economicMatch: '',
      diplomaticMatch: '',
      civilMatch: '',
      societalMatch: '',
      ideologyMatchDefinition: '',
      ideologyMatchDefinitionSource: '', 
      ideologyMatchName: ''
    }
  }

  async componentDidMount() {
    
    let url = `${ this.props.urlPrefix }/test_result_ideology/${ this.props.testResult.economic }/${ this.props.testResult.diplomatic }/${ this.props.testResult.civil }/${ this.props.testResult.societal }`
    let ideologyMatches = await fetch(url).then(r => r.json())
    
    this.setState((previousState) => {
      return {
        ...previousState,
        economicMatch: ideologyMatches.economic_match,
        diplomaticMatch: ideologyMatches.diplomatic_match,
        civilMatch: ideologyMatches.civil_match,
        societalMatch: ideologyMatches.societal_match,
        ideologyMatchDefinition: ideologyMatches.ideology_match_definition,
        ideologyMatchDefinitionSource: ideologyMatches.ideology_match_definition_source, 
        ideologyMatchName: ideologyMatches.ideology_match_name
      }

    })
  }

  render() {

    return  <div id='results-container'>
              <div className='logo-wrapper'>
                <img src='https://res.cloudinary.com/fergusdev/image/upload/v1602701054/politipoint/logos/politipoint-vertical-color_txkgp9.png' title='PolitiPoint.org' />
              </div>
              <hr/>
              <h3>Test Results</h3>
              <div id="results-container">
                <Continuum type='economic' match={ this.state.economicMatch } value={ this.state.testResult.economic } flip={ true }/>
                <Continuum type='diplomatic' match={ this.state.diplomaticMatch }  value={ this.state.testResult.diplomatic } flip={ false }/>
                <Continuum type='civil' match={ this.state.civilMatch } value={ this.state.testResult.societal } flip={ true }/>
                <Continuum type='societal' match={ this.state.societalMatch } value={ this.state.testResult.societal } flip={ true }/>
              </div>
              <h2>Ideology match: { this.state.ideologyMatchName }</h2>
              <div id="results-ideology">
                <p id="ideology-definition">{ this.state.ideologyMatchDefinition } <a href={ this.state.ideologyMatchDefinitionSource }>Source</a></p>
              </div>
              
              <h2>Test results map</h2>
              <p>
                If you chose to share your test results, they will be represented in the following map. Zoom to a particular county and click it for details. Click the 3D extrude 
                button to see how the number of tests from each county compares. Counties with taller heights have had more test results.
              </p>
              <div id="results-map">
                <MapboxGLMap />
              </div>

              <h2>Don't agree your results?</h2>
              <p>Give <a href="#" onClick={() => {
                this.props.onGotoHome(1)
              }}>version 1</a> a try. It has more questions.</p>

              <h2>Questions / Comments?</h2>
              <p> 
                Follow us on twitter: <a href='https://twitter.com/politipoint'>@politipoint</a><br/>
                Contact us by <a href="politipoint@protonmail.com">email</a><br/>
              </p>
              <div className="button-wrapper">
                <button className="button" onClick={() => {
                  this.props.onGotoHome( this.props.testResult.question_version )
                }}>Back</button>
              </div>
            </div>
           
  }
}

export default ResultsContainer
