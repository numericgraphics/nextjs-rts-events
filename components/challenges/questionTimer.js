import React, { useContext, useEffect, useState } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import TimerIcon from '@material-ui/icons/Timer'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../../hooks/userContext'

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5
    },
    text: {
        color: '#FFFFFF',
        paddingLeft: 5
    },
    linearProgress: {
        backgroundColor: theme.palette.primary.dark
    }
}))
const styles = {
    icon: {
        color: '#FFFFFF',
        fontSize: '1rem',
        marginTop: 3
    }
}

function QuestionTimer (props) {
    const classes = useStyles()
    const { timeLeft, progress } = props
    const { dataProvider } = useContext(UserContext)
    const [translation, setTranslation] = useState([])

    useEffect(() => {
        setTranslation(dataProvider.getTranslation())
    })

    return (
        <Box className={classes.container}>
            <LinearProgress variant="determinate" color={'primary'} value={progress} className={classes.linearProgress}/>
            <Box className={classes.content}>
                <TimerIcon style={styles.icon}/>
                <Typography variant="subtitle2" className={classes.text} >
                    {`${Math.round(timeLeft)} ${translation.challengeQuestionTimeRemaining}`}
                </Typography>
            </Box>
        </Box>
    )
}

export default QuestionTimer
