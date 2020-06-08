import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import StepConnector from '@material-ui/core/StepConnector'
import withStyles from '@material-ui/core/styles/withStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StarIcon from '@material-ui/icons/Star'

const ColorLibConnector = withStyles({
    line: {
        height: 0,
        border: 0
    }
})(StepConnector)

const styles = makeStyles({
    stepper: {
        backgroundColor: 'transparent'
    }
})

function ColorLibStepIcon (props) {
    const { active } = props
    return (
        <div>
            <StarIcon style={{ color: active ? '#409AD3' : 'white' }} />
        </div>
    )
}

export default function GiftsStepper (props) {
    const classes = styles()
    return (
        <Stepper alternativeLabel activeStep={props.activeStep} connector={<ColorLibConnector />} className={classes.stepper} >
            {props.steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={ColorLibStepIcon}/>
                </Step>
            ))}
        </Stepper>
    )
}
