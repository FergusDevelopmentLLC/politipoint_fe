import { FETCH_IDEOLOGIES } from "./types"
import { URL_PREFIX } from './urlPrefix'

export const fetchIdeologies = () => dispatch => {    
  fetch(`${ URL_PREFIX }/ideologies`).then(res => res.json()).then((ideologies) => {
    dispatch({
      type: FETCH_IDEOLOGIES,
      payload: ideologies
    })
  })
}