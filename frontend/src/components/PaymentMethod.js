import React, { useState } from 'react'
import Heading from './Heading'
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { addPaymentMethod } from '../actions/cartActions'

const useStyles = makeStyles({
  paymentForm: {
    width: '100%',
    maxWidth: 300,
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  formAction: {
    marginTop: 20,

    '& > *': {
      marginRight: 20,
    },
  },
})

const PaymentMethod = ({ handleNext, handleBack }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [val, setVal] = useState('UPI')

  const formHandler = () => {
    dispatch(addPaymentMethod(val))
    handleNext()
  }

  return (
    <React.Fragment>
      <Heading headingText='Payment Method' align='center' />
      <div className={classes.paymentForm}>
        <FormControl component='fieldset' style={{ textAlign: 'center' }}>
          <RadioGroup
            aria-label='gender'
            name='gender1'
            value={val}
            onChange={(e) => setVal(e.target.value)}
          >
            <FormControlLabel value='UPI' control={<Radio />} label='UPI' />
          </RadioGroup>
        </FormControl>
        <div className={classes.formAction}>
          <Button
            onClick={() => {
              handleBack()
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              formHandler()
            }}
            color='secondary'
            variant='contained'
          >
            Next
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PaymentMethod
