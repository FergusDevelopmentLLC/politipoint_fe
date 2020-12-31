import React from 'react'
import { HeaderLogo }  from "../components/HeaderLogo"
import { Blurb } from "../components/Blurb"
import { ContinuumStatic }  from '../components/ContinuumStatic'
import MapContainer from '../containers/MapContainer'
import { Link } from 'react-router-dom'

const HomeContainer = ({
  version
}) => {
  return (
    <>
    <HeaderLogo version={ version } isSkinny={ false } />
    
    <div className="button-wrapper">
      <Link className='button' to='/quiz'>Click/tap here to begin</Link>
    </div>

    <Blurb headerText={ 'The Test' } htmlContent={
      `<p>
        PolitiPoint provides insight into political leanings beyond the traditional "right" and "left" 
        framework. Test takers are presented a series of statements. Each have a particular political 
        viewpoint. Indicate from <strong>Strongly Agree</strong> to <strong>Strongly Disagree</strong> 
        how closely you identify with the statement. Based on your responses, your results will indicate 
        where you place on a continuum between two opposing perspectives in each of 4 categories:
      </p>`
    } />

    <ContinuumStatic />

    <h2>Test results map</h2>
    <p>
      Upon test completion, the test taker is given the option to aggregate their results with others based on county. 
      Click/tap on a county in the map below to see aggregated details for that county. Click the extrude map button 
      to see information about test result counts per county. 
    </p>
    <MapContainer fake={ true } />
    <p>
      The map above is randomly generated for illustration purposes and do not reflect actual tests results. For actual 
      test results, visit the <Link to='/map'>results map</Link>
    </p>
    
    <Blurb headerText={ 'Feedback' } htmlContent={
      ` <p>An important goal of this project is to improve the test in the following ways.</p>
        <ol>
          <li>Eliminate statement bias</li>
          <li>Simplify the statements</li>
          <li>Make the test shorter</li>
          <li>Eliminate statement bias</li>
        </ol>
        <p>By collecting feedback for each statement, subsequent versions of the test can be improved.</p>
      `
    } />

    <h2>Closest match</h2>
    <p>
      In addition to the test results, the application will match responses most closely with one of 
      following <Link to={'/ideologies'}>ideologies</Link>. This part of the application is experimental 
      and is a work in progress. Currently, the logic behind ideology matching is the same as what can 
      be found at <a href='https://github.com/8values/8values.github.io'>8values</a>. 
    </p>

    <Blurb headerText={ 'What data is being collected?' } htmlContent={
      `<ol>
        <li>Any statement feedback offered</li>
        <li>Test results by U.S. county</li>
      </ol>
      <p>
        Client IP address is used to approximate county location. Test takers can also select their county 
        or choose not to share their results with others from their county on the results map.
      </p>`
    } />

    <Blurb headerText={ 'Credits' } htmlContent={
      ` <p>
          PolitiPoint is inspired and based on the open source project, 
          <a href='https://github.com/8values/8values.github.io'>8values</a>, and 
          <a href='https://www.politicalcompass.org/'>Political compass</a>. Currently all statement wording 
          and bulk of test logic matches <a href='https://github.com/8values/8values.github.io'>8values</a>.
        </p>`
    } />

    <Blurb headerText={ 'Questions / Comments?' } htmlContent={
      ` <p>
          Follow us on twitter: <a href='https://twitter.com/politipoint/'>@politipoint</a><br/>
          Contact us by <a href='mailto: politipoint@protonmail.com'>email</a>
        </p>`
    } />

    <div className="button-wrapper">
      <Link className='button' to='/quiz'>Click/tap here to begin</Link>
    </div>

    </>
  )
}

export default HomeContainer