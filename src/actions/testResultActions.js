import { NEW_TEST_RESULT, UPDATE_TEST_RESULT, FETCH_AVERAGED_TEST_RESULTS, CLEAR_AVERAGED_TEST_RESULTS, CLEAR_DATA } from './types'
import { URL_PREFIX } from './urlPrefix'

export const createTestResult = (testResult, history) => dispatch => {
  
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

  const options = {
    method: 'PATCH',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify( { test_result: testResult } )
  }

  let apiUrl = `${ URL_PREFIX }/test_results/${testResult.id}`
  
  fetch(`${apiUrl}`, options)
    .then(res => res.json())
    .then((savedTestResult) => {
      
      dispatch({
        type: UPDATE_TEST_RESULT,
        payload: savedTestResult
      })

      dispatch({
        type: CLEAR_DATA
      })
      //history.push(`/results/${ savedTestResult.economic }/${ savedTestResult.diplomatic }/${ savedTestResult.civil }/${ savedTestResult.societal }`)
      history.push(`/results?e=${ savedTestResult.economic }&d=${ savedTestResult.diplomatic }&c=${ savedTestResult.civil }&s=${ savedTestResult.societal }`)
    })
}

export const fetchAveragedTestResults = (fake = false, fakeLimit = 300) => dispatch => {
  let apiUrl = fake ? `${ URL_PREFIX }/test_results_fake/${fakeLimit}` : `${ URL_PREFIX }/test_results_averaged`
  fetch(apiUrl).then(res => res.json()).then((testResults) => {
    dispatch({
      type: FETCH_AVERAGED_TEST_RESULTS,
      payload: testResults
    })
  })
}

export const clearAveragedTestResults = () => dispatch => {
  dispatch({
    type: CLEAR_AVERAGED_TEST_RESULTS
  })
}