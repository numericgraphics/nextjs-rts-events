import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import TimerIcon from '@material-ui/icons/Timer'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        width: '100vw'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5
    },
    text: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem',
        color: '#A9A9A9',
        textShadow: '0px 3px 3px #00000040',
        paddingLeft: 5
    }
})
const styles = {
    icon: {
        color: '#A9A9A9',
        textShadow: '0px 3px 3px #00000040'
    }
}

function QuestionTimer (props) {
    const classes = useStyles()
    const { timeLeft, progress } = props

    return (
        <Box className={classes.container}>
            <LinearProgress variant="determinate" value={progress} />
            <Box className={classes.content}>
                <TimerIcon style={styles.icon}/>
                <Typography className={classes.text} >
                    {`${Math.round(timeLeft)} secondes restantes`}
                </Typography>
            </Box>
        </Box>
    )
}

export default QuestionTimer
