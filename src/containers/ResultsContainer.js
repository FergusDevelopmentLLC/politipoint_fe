import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { HeaderLogo } from '../components/HeaderLogo'
import { Continuum } from '../components/Continuum'
import { Map } from '../components/Map'

import { connect } from 'react-redux'
import { fetchIdeologyMatches } from '../actions/ideologyActions'
import PropTypes from 'prop-types'

class ResultsContainer extends Component {
  
  componentDidMount() {
    this.props.fetchIdeologyMatches(this.props.testResult.economic, this.props.testResult.diplomatic, this.props.testResult.civil, this.props.testResult.societal)
  }

  render() {

    return  <div id='results-container'>
              <HeaderLogo version={ this.props.version } />
              <h3>Test Results</h3>
              <div id="results-container">
                <Continuum type='economic'    match={ this.props.economicMatch }    value={ this.props.testResult.economic } flip={ true }/>
                <Continuum type='diplomatic'  match={ this.props.diplomaticMatch }  value={ this.props.testResult.diplomatic } flip={ true }/>
                <Continuum type='civil'       match={ this.props.civilMatch }       value={ this.props.testResult.civil } flip={ false }/>
                <Continuum type='societal'    match={ this.props.societalMatch }    value={ this.props.testResult.societal } flip={ true }/>
              </div>
              <h2>Ideology match: { this.props.ideologyMatchName }</h2>
              <div id="results-ideology">
                <p id="ideology-definition">{ this.props.ideologyMatchDefinition } <a href={ this.props.ideologyMatchDefinitionSource }>Source</a></p>
              </div>
              
              <h2>Test results map</h2>
              <p>
                If you chose to share your test results, they will be represented in the following map. Zoom to a particular county and click it for details. Click the 3D extrude 
                button to see how the number of tests from each county compares. Counties with taller heights have had more test results.
              </p>
              <div id="results-map">
                <Map />
              </div>

              <h2>Don't agree your results?</h2>
              <p>Give <Link to='/version1'>version 1</Link> a try. It has more questions.</p>

              <h2>Questions / Comments?</h2>
              <p> 
                Follow us on twitter: <a href='https://twitter.com/politipoint'>@politipoint</a><br/>
                Contact us by <a href="politipoint@protonmail.com">email</a><br/>
              </p>
              <div className="button-wrapper">
                <Link className='button' to='/'>Back</Link>
              </div>
            </div>
           
  }
}

ResultsContainer.propTypes = {
  
  fetchIdeologyMatches: PropTypes.func.isRequired,
  economicMatch: PropTypes.string.isRequired,
  diplomaticMatch: PropTypes.string.isRequired,
  civilMatch: PropTypes.string.isRequired,
  societalMatch: PropTypes.string.isRequired,
  ideologyMatchDefinition: PropTypes.string.isRequired,
  ideologyMatchDefinitionSource: PropTypes.string.isRequired,
  ideologyMatchName: PropTypes.string.isRequired

}

const mapStateToProps = (state) => {
  
  if(Object.keys(state.ideologyReducer.match).length > 0) {
    return {
      economicMatch:   state.ideologyReducer.match.economic_match,
      diplomaticMatch: state.ideologyReducer.match.diplomatic_match,
      civilMatch:      state.ideologyReducer.match.civil_match,
      societalMatch:   state.ideologyReducer.match.societal_match,
      ideologyMatchName: state.ideologyReducer.match.ideology_match_name,
      ideologyMatchDefinition: state.ideologyReducer.match.ideology_match_definition,
      ideologyMatchDefinitionSource: state.ideologyReducer.match.ideology_match_definition_source,
    }
  }
  else {
    return {
      economicMatch: '',
      diplomaticMatch: '',
      civilMatch: '',
      societalMatch: '',
      ideologyMatchDefinition: '',
      ideologyMatchDefinitionSource: '',
      ideologyMatchName: ''
    }
  }
}

export default connect(mapStateToProps, { fetchIdeologyMatches })(ResultsContainer)