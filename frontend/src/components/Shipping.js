import React, { useState } from 'react'
import Heading from './Heading'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
    TextField,
    Button
} from '@material-ui/core'
import { addShippingAddress } from '../actions/cartActions'

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

const Shipping = ({ handleNext }) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [pinCode, setPinCode] = useState(shippingAddress.pinCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const saveShippingAddress = () => {
        dispatch(addShippingAddress({ address, city, pinCode, country }))
        handleNext()
    }

    return (
        <React.Fragment>
            <form className={classes.root}>
                <div>
                    <TextField
                        id="name-input"
                        label="Address"
                        variant="outlined"
                        value={address}
                        placeholder="Scranton city Mall"
                        fullWidth={true}
                        onChange={(e) => setAddress(e.target.value)}
                        className={classes.input__box}
                    />
                    <TextField
                        id="name-input"
                        label="City"
                        variant="outlined"
                        value={city}
                        placeholder="Scranton"
                        fullWidth={true}
                        onChange={(e) => setCity(e.target.value)}
                        className={classes.input__box}
                    />
                    <TextField
                        id="name-input"
                        label="Pin Code"
                        variant="outlined"
                        value={pinCode}
                        placeholder="843516"
                        fullWidth={true}
                        onChange={(e) => setPinCode(e.target.value)}
                        className={classes.input__box}
                    />
                    <TextField
                        id="name-input"
                        label="Country"
                        variant="outlined"
                        value={country}
                        placeholder="USA"
                        fullWidth={true}
                        onChange={(e) => setCountry(e.target.value)}
                        className={classes.input__box}
                    />
                    <Button variant='contained' color='secondary' fullWidth={true} onClick={saveShippingAddress}>
                        SUBMIT
                    </Button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default Shipping
