import { combineReducers } from 'redux'

import quizReducer from './quizReducer'
import testResultReducer from './testResultReducer'
import feedbackReducer from './feedbackReducer'
import ideologyReducer from './ideologyReducer'
import countyReducer from './countyReducer'

const appReducer = combineReducers({
  quizReducer,
  testResultReducer,
  feedbackReducer,
  ideologyReducer,
  countyReducer
})

//https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (state, action) => {
  
  if (action.type === 'CLEAR_DATA') {
    state = undefined
  }
  
  return appReducer(state, action)
}

export default rootReducer