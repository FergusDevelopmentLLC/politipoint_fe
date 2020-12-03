import { NEW_TEST_RESULT, UPDATE_TEST_RESULT, FETCH_AVERAGED_TEST_RESULTS, CLEAR_AVERAGED_TEST_RESULTS } from "../actions/types";

const initialState = {
  testResult: {}
}

export default (state = initialState, action) => {
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
    case FETCH_AVERAGED_TEST_RESULTS:
      return {
        ...state,
        averagedTestResults: action.payload
      };
    case CLEAR_AVERAGED_TEST_RESULTS:
      return {
        testResult: state.testResult
      };
    default:
      return state
  }
}