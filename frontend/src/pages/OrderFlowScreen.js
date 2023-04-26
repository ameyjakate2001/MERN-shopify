import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Shipping from '../components/Shipping'
import PaymentMethod from '../components/PaymentMethod'
import CompleteOrder from '../components/CompleteOrder'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 20
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}))

function getSteps() {
    return ['Add Shipping Address', 'Choose Payment Method', 'Complete Order']
}


export default function OrderFlowScreen() {

    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const steps = getSteps()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <Shipping handleNext={handleNext} />
            case 1:
                return <PaymentMethod handleNext={handleNext} handleBack={handleBack} />
            case 2:
                return <CompleteOrder handleBack={handleBack} />
            default:
                return 'Unknown stepIndex'
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
        </div>
    )
}
