import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeaderLogo } from '../components/HeaderLogo'
import { Continuum } from '../components/Continuum'
import MapContainer from '../containers/MapContainer'

import { useSelector, useDispatch } from 'react-redux'
import { fetchIdeologyMatches } from '../actions/ideologyActions'
import PropTypes from 'prop-types'

const ResultsContainer = ({
  testResult = {
    economic: 0,
    diplomatic: 0,
    civil: 0,
    societal: 0
  },
  setVersion,
  history
}) => {

  const economicMatch = useSelector(state => state.ideologyReducer.match ? state.ideologyReducer.match.economic_match : '')
  const diplomaticMatch = useSelector(state => state.ideologyReducer.match ? state.ideologyReducer.match.diplomatic_match : '')
  const civilMatch = useSelector(state => state.ideologyReducer.match ? state.ideologyReducer.match.civil_match : '')
  const societalMatch = useSelector(state => state.ideologyReducer.match ? state.ideologyReducer.match.societal_match : '')
  const ideologyMatchName = useSelector(state => state.ideologyReducer.match ? state.ideologyReducer.match.ideology_match_name : '')
  const ideologyMatchDefinition = useSelector(state => state.ideologyReducer.match ? state.ideologyReducer.match.ideology_match_definition : '')
  const ideologyMatchDefinitionSource = useSelector(state => state.ideologyReducer.match ? state.ideologyReducer.match.ideology_match_definition_source : '')
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIdeologyMatches(testResult.economic, testResult.diplomatic, testResult.civil, testResult.societal))
  }, [testResult])

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
      <p>Give <Link to="#" onClick={ () => {
            setVersion(1)
            history.push("/")
          }}>version 1</Link> a try. It has more questions.</p>

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
  setVersion: PropTypes.func.isRequired
}

export default ResultsContainer