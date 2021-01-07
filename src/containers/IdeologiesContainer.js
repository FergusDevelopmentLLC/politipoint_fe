import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux"
import { fetchIdeologies } from '../actions/ideologyActions'
import { HeaderLogo }  from "../components/HeaderLogo"
import Ideologies  from "../components/Ideologies"

const IdeologiesContainer = (props) => {

  const ideologies = useSelector(state => state.ideologyReducer.ideologies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIdeologies())
  }, [fetchIdeologies])

  return (
    <>
        <HeaderLogo isSkinny={ true }/>
        <Ideologies ideologies={ ideologies } />
    </> 
  )
} 

IdeologiesContainer.propTypes = {
  fetchIdeologies: PropTypes.func.isRequired,
  ideologies: PropTypes.array.isRequired
}

export default IdeologiesContainer