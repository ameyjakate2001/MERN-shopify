import {
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_WAITING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_WAITING,
  PRODUCT_DETAILS_SUCCESS,
} from './actionTypes'
import axios from 'axios'

export const getProuctList = () => async (dispatch) => {
  // try {
  dispatch({ type: PRODUCT_LIST_WAITING })

  const { data } = await axios.get('/api/products')
  console.log(data)

  dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

  // }
  // catch (error) {
  //     dispatch({ type: PRODUCT_LIST_ERROR, err: error })
  // }
}

export const getProuctDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_WAITING })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_ERROR, err: error })
  }
}
