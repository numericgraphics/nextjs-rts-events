import React, { useEffect, useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import QuestionTimer from './questionTimer'
import Fade from '@material-ui/core/Fade/Fade'
import { CustomDisabledButton } from '../ui/CustomDisabledButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import hasCountDownModal from '../../hoc/hasCountDownModal'
import { useStyles } from '../../styles/questions.style'

function Question (props) {
    const classes = useStyles()
    const { quiz, title, duration } = props.content
    const { question, answers } = quiz
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(duration)
    const [showComponent, setShowComponent] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [answer, setAnswer] = useState(null)
    const intervalId = useRef()

    function onAnswer (index) {
        if (progress > 0) {
            setAnswer(index)
            props.answerCallBack(index)
            clearInterval(intervalId.current)
            setDisabled(true)
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
        props.openCountDownModal()
        props.startCountDown()
        return () => clearInterval(intervalId.current)
    }, [])

    useEffect(() => {
        if (props.status) {
            setDisabled(false)
            setShowComponent(true)
            startTimer()
        }
    }, [props.status])

    useEffect(() => {
        if (progress >= 100) {
            setTimeLeft(0)
            setProgress(0)
            props.answerCallBack(-1)
            setDisabled(true)
        }
    }, [progress])

    return (
        <Fade in={showComponent} timeout={500}>
            <Box className='content' >
                <Box className='timerZone'>
                    <Box className={classes.counter}>
                        <QuestionTimer timeLeft={timeLeft} progress={progress} />
                    </Box>
                </Box>
                <Box className='topZone'>
                    <Box className={[classes.header, 'color-White'].join(' ')}>
                        <Typography variant='subtitle1' className={classes.HeaderTitle} align={'left'}>
                            {title}
                        </Typography>
                        <Typography variant='h3' className={classes.HeaderText} align={'left'}>
                            {question}
                        </Typography>
                    </Box>
                </Box>
                <Box className='bottomZoneQuestions'>
                    {answers.map((item, index) => {
                        return (
                            <Box key={index} className={classes.buttonWrapper} >
                                <CustomDisabledButton color="secondary" variant="contained" className={'questionButton'} disabled={disabled} onClick={() => {
                                    onAnswer(index + 1)
                                }}>
                                    {item}
                                </CustomDisabledButton>
                                {(disabled && (answer === index + 1)) && <CircularProgress color={'secondary'} size={24} className={classes.buttonProgress} />}
                            </Box>
                        )
                    }
                    )}
                </Box>
                <Box className='backgroundGradientTop' />
            </Box>
        </Fade>
    )
}

export default hasCountDownModal(Question)
