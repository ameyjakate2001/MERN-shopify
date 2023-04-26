import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    FormControl,
    Typography,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { userLoginAction } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../components/Heading'

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            width: '100%',
            maxWidth: 400,
            marginRight: 'auto',
            marginLeft: 'auto',
            paddingLeft: 10,
            paddingRight: 10,

            '& > *': {
                marginTop: 10,
                marginBottom: 10,
            }

        },
    },
    signup: {
        marginTop: 10
    }
}));

function Loginscreen({ history }) {

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dispatch = useDispatch()

    const user = useSelector((state) => state.userLogin)

    const { loading, userInfo, error } = user

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [userInfo, history])

    const checkUser = () => {
        dispatch(userLoginAction(email, password))
    }


    return (
        <React.Fragment>
            <Heading headingText="Sign In" align="center" />
            <form className={classes.root}>
                <div>
                    <TextField
                        id="outlined-error-helper-text"
                        label="Email"
                        variant="outlined"
                        value={email}
                        placeholder="Michael@dunderMifflin.com"
                        fullWidth={true}
                        onChange={(e) => setEmail(e.target.value)}
                        helperText={error ? error.email : ''}
                        error={error && error.email !== ''}
                        className={classes.input__box}
                    />
                    <FormControl fullWidth={true}>
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            className="MuiInputLabel-outlined"
                            error={error && error.password !== ''}
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="scott123"
                            label="Password"
                            value={password}
                            error={error && error.password !== ''}
                            fullWidth={true}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="my-helper-text" error={error && error.password !== ''}>{error ? error.password : ''}</FormHelperText>

                    </FormControl>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={checkUser}
                    >
                        {loading && <CircularProgress color="inherit" size={20} />}
                         &nbsp;sign in
                    </Button>
                    <Link to='/signup' className='link'>
                        <Typography variant="subtitle2" className={classes.signup}>
                            New Customer? Register.
                        </Typography>
                    </Link>
                </div>
            </form>


        </React.Fragment>
    )
}

export default Loginscreen;
