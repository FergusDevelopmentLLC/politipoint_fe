import { combineReducers } from 'redux'
import postReducer from './postReducer'
import quizReducer from './quizReducer'
import testResultReducer from './testResultReducer'

export default combineReducers({
  posts: postReducer,
  quizReducer: quizReducer,
  testResultReducer: testResultReducer
})