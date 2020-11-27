import { FETCH_QUESTIONS } from "../actions/types";

const initialState = {
  version: 2,
  questions: [],
  testResult: {
    question_version: 1,
    economic: 0,
    diplomatic: 0,
    civil: 0,
    societal: 0
  }
}

const quizReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_QUESTIONS: 
      const questions = action.payload
      return {
        ...state,
        questions: questions,
        testResult: {
          ...state.testResult,
          version: state.version
        }
      }
    default:
      return state
  }
}

export default quizReducer