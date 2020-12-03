import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeaderLogo } from '../components/HeaderLogo'
import { Continuum } from '../components/Continuum'
import MapContainer from '../containers/MapContainer'

import { connect } from 'react-redux'
import { fetchIdeologyMatches } from '../actions/ideologyActions'
import PropTypes from 'prop-types'

const ResultsContainer = ({
  testResult = {
    economic: 0,
    diplomatic: 0,
    civil: 0,
    societal: 0
  },
  economicMatch = '',
  diplomaticMatch = '',
  civilMatch = '',
  societalMatch = '',
  ideologyMatchName = '',
  ideologyMatchDefinition = '',
  ideologyMatchDefinitionSource = '',
  fetchIdeologyMatches
}) => {

  useEffect(() => {
    fetchIdeologyMatches(testResult.economic, testResult.diplomatic, testResult.civil, testResult.societal)
  }, [testResult, fetchIdeologyMatches])

  return (
    <div id='results-container'>
      <HeaderLogo />
      <h3>Test Results</h3>
      <div id="results-container">
        <Continuum type='economic'    value={ testResult.economic }   match={ economicMatch }   flip={ true } />
        <Continuum type='diplomatic'  value={ testResult.diplomatic } match={ diplomaticMatch } flip={ true } />
        <Continuum type='civil'       value={ testResult.civil }      match={ civilMatch }      flip={ false } />
        <Continuum type='societal'    value={ testResult.societal }   match={ societalMatch }   flip={ true } />
      </div>
      <h2>Ideology match: { ideologyMatchName }</h2>
      <div id="results-ideology">
        <p id="ideology-definition">{ ideologyMatchDefinition } <a href={ ideologyMatchDefinitionSource }>Source</a></p>
      </div>
      
      <h2>Test results map</h2>
      <p>
        If you chose to share your test results, they will be represented in the following map. Zoom to a particular county and click it for details. Click the 3D extrude 
        button to see how the number of tests from each county compares. Counties with taller heights have had more test results.
      </p>
      <div id="results-map">
        <MapContainer />
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

  )
}

ResultsContainer.propTypes = {
  fetchIdeologyMatches: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
  economicMatch: PropTypes.string.isRequired,
  diplomaticMatch: PropTypes.string.isRequired,
  civilMatch: PropTypes.string.isRequired,
  societalMatch: PropTypes.string.isRequired,
  ideologyMatchDefinition: PropTypes.string.isRequired,
  ideologyMatchDefinitionSource: PropTypes.string.isRequired,
  ideologyMatchName: PropTypes.string.isRequired

}

const mapStateToProps = (state) => {
  const match = state.ideologyReducer.match
  return {
    economicMatch:                  match ? match.economic_match : '',
    diplomaticMatch:                match ? match.diplomatic_match : '',
    civilMatch:                     match ? match.civil_match : '',
    societalMatch:                  match ? match.societal_match : '',
    ideologyMatchName:              match ? match.ideology_match_name : '',
    ideologyMatchDefinition:        match ? match.ideology_match_definition : '',
    ideologyMatchDefinitionSource:  match ? match.ideology_match_definition_source : '',
  }
}

export default connect(mapStateToProps, { fetchIdeologyMatches })(ResultsContainer)