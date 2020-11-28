import { FETCH_QUESTIONS } from "./types"
import { URL_PREFIX } from './urlPrefix'

export const fetchQuestions = ( version ) => dispatch => {    
    fetch(`${ URL_PREFIX }/questions/by_version/${version}`).then(res => res.json()).then((questions) => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: questions
      })
    })
  }