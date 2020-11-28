import { NEW_TEST_RESULT, UPDATE_TEST_RESULT } from './types'
import { URL_PREFIX } from './urlPrefix'

export const createTestResult = (testResult, history) => dispatch => {
  console.log('createTestResult')
  
  const options = {
    method: 'POST',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify( { test_result: testResult } )
  }

  fetch(`${ URL_PREFIX }/test_results`, options)
    .then(res => res.json())
    .then((testResult) => {
      dispatch({
        type: NEW_TEST_RESULT,
        payload: testResult//testResult should have the county now, after saving
      })
      history.push('/participation')
    })
  
}

export const updateTestResult = (testResult, history) => dispatch => {
  console.log('updateTestResult')
  
  const options = {
    method: 'PATCH',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify( { test_result: testResult } )
  }

  let apiUrl = `${ URL_PREFIX }/test_results_check`
  
  fetch(`${apiUrl}`, options)
    .then(res => res.json())
    .then((savedTestResult) => {
      dispatch({
        type: UPDATE_TEST_RESULT,
        payload: savedTestResult
      })
      history.push(`/results/${ savedTestResult.economic }/${ savedTestResult.diplomatic }/${ savedTestResult.civil }/${ savedTestResult.societal }`)
    })

  // let savedTestResult = await fetch(apiUrl, options).then(r => r.json())
  // dispatch({
  //   type: UPDATE_TEST_RESULT,
  //   payload: savedTestResult
  // })
  // history.push(`/results/${ savedTestResult.economic }/${ savedTestResult.diplomatic }/${ savedTestResult.civil }/${ savedTestResult.societal }`)
  
}