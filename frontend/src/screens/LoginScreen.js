import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { loginAction } from '../actions/userAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginScreen = ({location, history}) => {

     const [Email, setEmail] = useState('')
     const [Password, setPassword] = useState('')

     const redirect = location.search ? location.search.split('=')[1] : '/'
     const dispatch = useDispatch()

     const userLogin = useSelector((state) => state.userLogin)
     const { userInfo, loading, error } = userLogin

     useEffect(() => {
         if(userInfo) {
             history.push(redirect)
         }
     }, [history, userInfo, redirect])


     const submitHandler = (e) => {
         e.preventDefault()
         //Dispatch Action
        dispatch(loginAction(Email,Password))
     }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant='danger'>{error}</Message>}
            { loading && <Loader></Loader>}

            <Form onSubmit={submitHandler}>
               <FormGroup controlId='email'>
                   <Form.Label>Email Address</Form.Label>
                   <Form.Control type='email' placeholder='Email Address' value={Email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
               </FormGroup>
               <FormGroup controlId='password'>
                   <Form.Label>Password</Form.Label>
                   <Form.Control type='password' placeholder='Password' value={Password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
               </FormGroup>

               <Button variant='primary' className="my-3" type='submit'>Sign In</Button>
            </Form>

            <Row>
                <Col>
                    New Customer <Link to={redirect ?`/register?redirect = ${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
