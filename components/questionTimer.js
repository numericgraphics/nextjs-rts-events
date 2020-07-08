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
    const { duration } = props
    const [progress, setProgress] = React.useState(0)
    const [timeLeft, setTimeLeft] = React.useState(duration)
    let count = duration

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(Math.round(count--))
            setProgress(prevProgress =>
                prevProgress >= 100 ? stopTimer() : prevProgress + 100 / duration
            )
        }, 1000)
        function stopTimer () {
            setProgress(100)
            setTimeLeft(0)
            clearInterval(timer)
            props.finishedCallBack()
        }
    }, [count])

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
