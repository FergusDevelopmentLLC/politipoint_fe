import { combineReducers } from 'redux'
import postReducer from './postReducer'
import quizReducer from './quizReducer'
import testResultReducer from './testResultReducer'
import feedbackReducer from './feedbackReducer'

export default combineReducers({
  posts: postReducer,
  quizReducer: quizReducer,
  testResultReducer: testResultReducer,
  feedbackReducer: feedbackReducer
})