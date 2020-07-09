import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        width: '100vw'
    }
})

function QuestionTimer (props) {
    const classes = useStyles()
    const { timeLeft, progress } = props

    return (
        <Box className={classes.container}>
            <LinearProgress variant="determinate" value={progress} />
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">
                    {`${Math.round(timeLeft)} secondes restantes`}
                </Typography>
            </Box>
        </Box>
    )
}

export default QuestionTimer
