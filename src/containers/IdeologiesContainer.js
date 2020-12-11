import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { HeaderLogo }  from "../components/HeaderLogo"
import { fetchIdeologies } from '../actions/ideologyActions'
import PropTypes from 'prop-types'
import Ideologies  from "../components/Ideologies"

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
        <Ideologies ideologies={ ideologies } />
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