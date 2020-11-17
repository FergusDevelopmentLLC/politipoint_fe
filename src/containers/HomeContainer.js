import React, { Component, Fragment } from 'react'
import HeaderLogo from "../components/HeaderLogo"
import Button from "../components/Button"
import Blurb from "../components/Blurb"
import ContinuumStatic from '../components/ContinuumStatic'

class HomeContainer extends Component {
  
  // {/* TODO: how to handle ideologies link? */}
  render() {
    
    return (
    <Fragment>
    <HeaderLogo version={ this.props.version } />
    <Button onGotoQuiz={ this.props.onGotoQuiz } />
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

    
    <Blurb headerText={ 'Closest match' } htmlContent={
      `<p>
          In addition to the test results, the application will match responses most closely with one of 
          following <a href='#'>ideologies</a>. This part of the application is experimental and is a work in progress. 
          Currently, the logic behind ideology matching is the same as what can be found at 
          <a href='https://github.com/8values/8values.github.io'>8values</a>.
        </p>`
    } />

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

    <Button onGotoQuiz={ this.props.onGotoQuiz } />
    </Fragment>
    )
  }
}
export default HomeContainer