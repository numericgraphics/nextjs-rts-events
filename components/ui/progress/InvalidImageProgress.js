import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/progress/InvalidImageProgress.style'
import { DarkColorLinearProgress } from './DarkColorLinearProgress'
import AcUnitIcon from '@material-ui/icons/AcUnit'

function progressValueStep (value) {
    switch (true) {
    case value >= 0 && value < 20:
        return 20
    case value >= 20 && value < 40:
        return 40
    case value >= 40 && value < 60:
        return 60
    case value >= 60 && value < 100:
        return 80
    default:
        return 20
    }
}

function InvalidImageProgress (props) {
    const classes = useStyles()
    const { progress } = props

    return (
        <Box className={classes.container}>
            <DarkColorLinearProgress
                variant="determinate"
                value={progressValueStep(progress)}
                className={classes.linearProgress}>
                <AcUnitIcon style={{ color: 'green' }} />
            </DarkColorLinearProgress>
        </Box>
    )
}

export default InvalidImageProgress
