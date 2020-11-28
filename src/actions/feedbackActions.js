import { NEW_FEEDBACK } from './types'
import { URL_PREFIX } from './urlPrefix'

export const createFeedback = (question_feedback) => dispatch => {
  
  const options = {
    method: 'POST',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify( { question_feedback: question_feedback } )
  }

  fetch(`${ `${ URL_PREFIX }/question_feedbacks` } `, options)
    .then(res => res.json())
    .then((feedback) => {
      console.log('feedback saved:', feedback)
      dispatch({
        type: NEW_FEEDBACK,
        payload: feedback
      })
    })
  
}