import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { HeaderLogo }  from "../components/HeaderLogo"
import { fetchIdeologies } from '../actions/ideologyActions'
import PropTypes from 'prop-types'

const IdeologiesContainer = ({
  ideologies = [],
  fetchIdeologies
}) => {

  useEffect(() => {
    fetchIdeologies()
  }, [fetchIdeologies])

  return (
    <>
        <HeaderLogo isSkinny={ false }/>
        <dl>
        { 
          ideologies.map((ideology) => {
            return <Fragment key={ `${ideology.id}` } >
                      <dt key={ `dt_${ideology.id}` }>{ ideology.name }</dt>
                      <dd key={ `dd_${ideology.id}` }>{ ideology.definition }</dd>
                   </Fragment>
           })
        }
        </dl>
    </> 
  )
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