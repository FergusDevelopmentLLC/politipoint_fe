import { NEW_TEST_RESULT, UPDATE_TEST_RESULT } from "../actions/types";

const initialState = {
  testResult: {}
}

export default (state = initialState, action) => {
  // console.log('action', action)
  
  switch(action.type) {
    case NEW_TEST_RESULT:
      return {
        ...state,
        testResult: action.payload
      };
    case UPDATE_TEST_RESULT:
      return {
        ...state,
        testResult: action.payload
      };
    default:
      return state
  }
}