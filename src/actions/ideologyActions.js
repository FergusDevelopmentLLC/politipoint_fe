import { FETCH_IDEOLOGIES, FETCH_IDEOLOGY_MATCH } from "./types"
import { URL_PREFIX } from './urlPrefix'

export const fetchIdeologies = () => dispatch => {    
  fetch(`${ URL_PREFIX }/ideologies`).then(res => res.json()).then((ideologies) => {
    dispatch({
      type: FETCH_IDEOLOGIES,
      payload: ideologies
    })
  })
}

export const fetchIdeologyMatches = (economic, diplomatic, civil, societal) => dispatch => {    
 let url = `${ URL_PREFIX }/test_result_ideology/${ economic }/${ diplomatic }/${ civil }/${ societal }`
  fetch(url).then(res => res.json()).then((match) => {
    dispatch({
      type: FETCH_IDEOLOGY_MATCH,
      payload: match
    })
  })
}