import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../actions/actionTypes'

const useCheckUser = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/user')

      const data = await res.json()

      if (data) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        })
        setLoading(false)
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error: 'No active user found',
          },
        })
        setLoading(false)
      }
    }

    getUser()
  }, [dispatch])

  return {
    loading,
  }
}

export default useCheckUser
