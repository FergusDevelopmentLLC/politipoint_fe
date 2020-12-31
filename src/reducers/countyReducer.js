import { FETCH_COUNTIES } from "../actions/types";

const initialState = {
  counties: {}
}

export default (state = initialState, action) => {
    
  switch(action.type) {
    case FETCH_COUNTIES: 
      return {
        ...state,
        counties: action.payload
      }
    default:
      return state
  }
}