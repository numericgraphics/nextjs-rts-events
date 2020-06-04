import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import StepConnector from '@material-ui/core/StepConnector'
import withStyles from '@material-ui/core/styles/withStyles'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StarIcon from '@material-ui/icons/Star';

const ColorLibConnector = withStyles({
    line: {
        height: 0,
        border: 0,
    },
})(StepConnector);

const styles = withStyles({
    stepper:{
        backgroundColor: 'rgba(0,0,0,0)'
    }
})

function ColorLibStepIcon(props) {
    const { active  } = props;
    return (
        <div>
            <StarIcon style={{ color: active ? 'green' : 'pink' }} />
        </div>
    );
}

export default function GiftsStepper(props) {
    return (
        <Stepper alternativeLabel activeStep={props.activeStep} connector={<ColorLibConnector />} style={{ backgroundColor: "transparent" }}>
            {props.steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={ColorLibStepIcon}/>
                </Step>
            ))}
        </Stepper>
    );
}

