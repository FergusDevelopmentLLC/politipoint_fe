import { combineReducers } from 'redux'

import quizReducer from './quizReducer'
import testResultReducer from './testResultReducer'
import feedbackReducer from './feedbackReducer'
import ideologyReducer from './ideologyReducer'

export default combineReducers({
  quizReducer,
  testResultReducer,
  feedbackReducer,
  ideologyReducer
})