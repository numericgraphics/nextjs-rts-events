import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import QuestionTimer from '../questionTimer'
import { useHeight } from '../../hooks/useHeight'

const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'flex-start'
    },
    counter: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        flex: 1,
        maxHeight: 120,
        padding: 10
    },
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '10px 30px',
        paddingTop: '10%',
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 2,
        textAlign: 'center',
        bottom: 30
    },
    avatar: {
        width: 100,
        height: 100,
        border: 'solid',
        borderColor: 'gray'
    },
    card: {
        minWidth: 275,
        minHeight: 300,
        margin: 20
    },
    HeaderText: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.25rem',
        textShadow: '0px 3px 6px #00000040'
    },
    HeaderTitle: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem',
        textShadow: '0px 3px 6px #00000040'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 275,
        minHeight: 300
    },
    button: {
        bottom: 50,
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem',
        marginTop: 10,
        textTransform: 'none'
    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 35%)'
    }
})
const styles = {
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100vw',
        zIndex: 3
    },
    containerImage: {
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        width: '100vw',
        backgroundColor: 'gray'
    }
}

function Question (props) {
    const classes = useStyles()
    const { quiz, title, duration } = props.content
    const { question, answers } = quiz
    const [progress, setProgress] = React.useState(0)
    const [timeLeft, setTimeLeft] = React.useState(duration)
    const intervalId = useRef()
    const height = useHeight()

    function onAnswer (index) {
        if (progress > 0) {
            props.answerCallBack(index)
        }
    }

    function startTimer () {
        let count = duration
        intervalId.current = setInterval(() => {
            setTimeLeft(Math.round(count--))
            setProgress(prevProgress => prevProgress + 100 / duration)
        }, 1000)
    }

    useEffect(() => {
        startTimer()
        return () => clearInterval(intervalId.current)
    }, [])

    useEffect(() => {
        if (progress >= 100) {
            setTimeLeft(0)
            setProgress(0)
            props.answerCallBack(-1)
        }
    }, [progress])

    return (
        <Box style={{ ...styles.containerOverlay, minHeight: height }} >
            <Box className={classes.counter}>
                <QuestionTimer timeLeft={timeLeft} progress={progress} />
            </Box>
            <Box className={classes.header}>
                <Typography className={classes.HeaderTitle} align={'left'}>
                    {title}
                </Typography>
                <Typography className={classes.HeaderText} align={'left'}>
                    {question}
                </Typography>
            </Box>
            <Box className={classes.footer}>
                {answers.map((item, index) => {
                    return (
                        <Button color="primary" variant="contained" key={index} className={classes.button} onClick={() => {
                            onAnswer(index)
                        }}>
                            {item}
                        </Button>
                    )
                }
                )}
            </Box>
        </Box>
    )
}

export default Question
