import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { HeaderLogo }  from "../components/HeaderLogo"
import { fetchIdeologies } from '../actions/ideologyActions'
import PropTypes from 'prop-types'

class IdeologiesContainer extends Component {
  
  componentDidMount () {
    this.props.fetchIdeologies()
  }
  
  render() {
    
    return (
      <Fragment>
        <HeaderLogo />
        <dl>
        { 
          this.props.ideologies.map((ideology) => {
            return <Fragment key={ `${ideology.id}` } >
                   <dt key={ `dt_${ideology.id}` }>{ ideology.name }</dt>
                   <dd key={ `dd_${ideology.id}` }>{ ideology.definition }</dd>
                   </Fragment>
          })}
        </dl>
      </Fragment>
    )
  }
}

IdeologiesContainer.propTypes = {
  fetchIdeologies: PropTypes.func.isRequired,
  ideologies: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    ideologies: state.ideologyReducer.ideologies
  }
}

export default connect(mapStateToProps, { fetchIdeologies })(IdeologiesContainer)