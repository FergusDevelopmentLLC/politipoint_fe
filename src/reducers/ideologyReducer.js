import { FETCH_IDEOLOGIES, FETCH_IDEOLOGY_MATCH } from "../actions/types";

const initialState = {
  ideologies: [],
  match: {}
}

export default (state = initialState, action) => {
    
  switch(action.type) {
    case FETCH_IDEOLOGIES: 
      return {
        ...state,
        ideologies: action.payload
      }
    case FETCH_IDEOLOGY_MATCH: 
      return {
        ...state,
        match: action.payload
      }
    default:
      return state
  }
}