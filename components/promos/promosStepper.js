import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import StepConnector from '@material-ui/core/StepConnector'
import withStyles from '@material-ui/core/styles/withStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const ColorLibConnector = withStyles({
    line: {
        height: 0,
        border: 0
    }
})(StepConnector)

const styles = makeStyles({
    stepper: {
        width: '30vw',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        padding: 5
    }
})

function ColorLibStepIcon (props) {
    const { active } = props
    return (
        <div>
            <FiberManualRecordIcon style={{ color: active ? '#409AD3' : 'white', fontSize: 15 }} />
        </div>
    )
}

export default function PromosStepper (props) {
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
