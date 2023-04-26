import React, { useState } from 'react'
import Heading from '../components/Heading'
import {
    Grid,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    FormControl,
    CircularProgress,
    FormHelperText
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { userUpdateAction } from '../actions/userActions'

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            width: '100%',
            maxWidth: 400,

            '& > *': {
                marginTop: 10,
                marginBottom: 10,
            }

        },
    },
    msg: {
        marginBottom: 15
    }
}));

const Profilescreen = ({ history }) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const userUpdate = useSelector(state => state.userUpdate)

    const { userInfo } = userLogin
    const { loading, error, success } = userUpdate

    const [name, setName] = useState(userInfo.name || ' ')
    const [email, setEmail] = useState(userInfo.email || ' ')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState('')


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const updateUser = () => {

        setConfirmPasswordError('')

        if (password !== confirmPassword) {
            setConfirmPasswordError('passwords do not match')
        }
        else {
            dispatch(userUpdateAction(userInfo._id, name, email, password))
        }
    }

    return (
        <React.Fragment>
            <Heading headingText="Profile" />
            <Grid container>
                <Grid item md={4}>
                    {success &&
                        <div className={classes.msg}>
                            <Message type="success" msg="User Successfully Updated" />
                        </div>
                    }
                    <form className={classes.root}>
                        <div>
                            <TextField
                                id="user-name"
                                label="Name"
                                variant="outlined"
                                value={name}
                                placeholder="Michael Scott"
                                fullWidth={true}
                                onChange={(e) => setName(e.target.value)}
                                className={classes.input__box}
                            />
                            <TextField
                                id="user-email"
                                label="Email"
                                variant="outlined"
                                value={email}
                                placeholder="Michael@dunderMifflin.com"
                                fullWidth={true}
                                helperText={error ? error.email : ''}
                                error={error && error.email !== ''}
                                onChange={(e) => setEmail(e.target.value)}
                                className={classes.input__box}
                            />
                            <FormControl fullWidth={true}>
                                <InputLabel
                                    htmlFor="user-password-label"
                                    className="MuiInputLabel-outlined"
                                    error={error && error.password !== ''}
                                >
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="user-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="scott123"
                                    label="Password"
                                    value={password}
                                    fullWidth={true}
                                    error={error && error.password !== ''}
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
                                <FormHelperText id="confirmPasssword-helperText" error={error && error.password !== ''}>
                                    {error ? error.password : ''}
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel
                                    htmlFor="user-confirmpassword-label"
                                    className="MuiInputLabel-outlined"
                                    error={confirmPasswordError !== ''}
                                >
                                    Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    id="user-confirmpassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="scott123"
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    error={confirmPasswordError !== ''}
                                    fullWidth={true}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText id="confirmPasssword-helperText" error={confirmPasswordError !== ''}>
                                    {confirmPasswordError}
                                </FormHelperText>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={updateUser}
                            >
                                {loading && <CircularProgress color="inherit" size={20} />}
                                &nbsp;Update
                            </Button>
                        </div>
                    </form>
                </Grid>
                <Grid item md={8}>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Profilescreen
