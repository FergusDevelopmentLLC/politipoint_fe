import { FETCH_QUESTIONS } from "./types"

export const fetchQuestions = ( urlPrefix, version ) => dispatch => {    
    fetch(`${urlPrefix}/questions/by_version/${version}`).then(res => res.json()).then((questions) => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: questions
      })
    })
  }