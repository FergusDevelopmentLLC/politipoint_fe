import { FETCH_COUNTIES } from "./types"

export const fetchCounties = () => dispatch => {    
  fetch(`${ process.env.PUBLIC_URL }/counties_albers.json`).then(res => res.json()).then((counties) => {
    dispatch({
      type: FETCH_COUNTIES,
      payload: counties
    })
  })
}