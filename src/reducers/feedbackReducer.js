import { NEW_FEEDBACK } from "../actions/types";

const initialState = {
  feedback: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case NEW_FEEDBACK:
      return {
        ...state,
        feedback: action.payload
      };
    default:
      return state
  }
}