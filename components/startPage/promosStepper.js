import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import StepConnector from '@material-ui/core/StepConnector'
import withStyles from '@material-ui/core/styles/withStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded'
import { useTheme } from '@material-ui/core/styles'

const ColorLibConnector = withStyles({
    line: {
        height: 0,
        border: 0
    }
})(StepConnector)

const styles = makeStyles({
    stepper: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        padding: 5
    }
})

// TODO - ADD GOOD SVG FORM DESIGNER WITH --> PromoSvgIcon
// <PromoSvgIcon style={{ color: active ? '#409AD3' : 'white', fontSize: 15 }} />
// <RemoveIcon style={{ color: active ? '#409AD3' : 'white', fontSize: '5rem' }} />
function ColorLibStepIcon (props) {
    const theme = useTheme()
    const { active } = props
    return (
        <div>
            <RemoveRoundedIcon style={{ color: active ? theme.palette.secondary.main : theme.palette.secondary.light, fontSize: '2.3rem' }} />
        </div>
    )
}

export default function PromosStepper (props) {
    const classes = styles()
    return (
        <Stepper alternativeLabel activeStep={props.activeStep} connector={<ColorLibConnector />} className={classes.stepper} >
            {props.steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel StepIconComponent={ColorLibStepIcon}/>
                </Step>
            ))}
        </Stepper>
    )
}
