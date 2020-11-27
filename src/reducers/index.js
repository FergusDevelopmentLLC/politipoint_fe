import { combineReducers } from 'redux'
import postReducer from './postReducer'
import quizReducer from './quizReducer'

export default combineReducers({
  posts: postReducer,
  quizReducer: quizReducer
})