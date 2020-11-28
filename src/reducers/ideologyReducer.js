import { FETCH_IDEOLOGIES } from "../actions/types";

const initialState = {
  ideologies: []
}

export default (state = initialState, action) => {
    
  switch(action.type) {
    case FETCH_IDEOLOGIES: 
      return {
        ...state,
        ideologies: action.payload
      }
    default:
      return state
  }
}