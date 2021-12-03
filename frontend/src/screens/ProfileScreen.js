import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap'
import { getUserDetails } from '../actions/userAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterScreen = ({ location, history }) => {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { user, loading, error } = userDetails

  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        if(!user.name) {
            dispatch(getUserDetails('profile'))
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch Action
    if (Password !== confirmPassword) {
      setMessage('Passwords do not Match')
    } else {

     }
  }

  return (
      <Row>
           <Col md={3}> 
                    <h1>User Profile</h1>
                    {error && <Message variant='danger'>{error}</Message>}
                    {message && <Message variant='danger'>{message}</Message>}
                    {loading && <Loader></Loader>}

                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Name'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Email Address'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='confirmPassword'>
                        <Form.Label> Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                        </FormGroup>

                        <Button variant='primary' className='my-3' type='submit'>
                        Update
                        </Button>
                 </Form>
          </Col>
          <Col md={9}>

          </Col>
      </Row>
  )
}

export default RegisterScreen
