import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constant/userConstant'

import axios from 'axios'

const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(data)
    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const { data } = await axios.post(
      'http://localhost:5000/api/users/register',
      { name, email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(data)
    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { userLogin : { userInfo }} = getState()

    const { data } = await axios.post(
      `http://localhost:5000/api/users/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
      }
    )

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const logoutAction = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT })
  localStorage.removeItem('userInfo')
}

export { loginAction, registerAction, logoutAction, getUserDetails }
