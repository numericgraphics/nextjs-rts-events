import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/progress/InvalidImageProgress.style'
import { DarkColorLinearProgress } from './DarkColorLinearProgress'
import AcUnitIcon from '@material-ui/icons/AcUnit'

function InvalidImageProgress (props) {
    const classes = useStyles()
    const { progress } = props

    return (
        <Box className={classes.container}>
            <DarkColorLinearProgress
                variant="determinate"
                value={progress}
                className={classes.linearProgress}>
                <AcUnitIcon style={{ color: 'green' }} />
            </DarkColorLinearProgress>
        </Box>
    )
}

export default InvalidImageProgress
