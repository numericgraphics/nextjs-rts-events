import React, { useEffect, useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade/Fade'
import QuestionTimer from '../ui/progress/questionTimer'
import { CustomDisabledButton } from '../ui/button/CustomDisabledButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import hasCountDownModal from '../../hoc/hasCountDownModal'
import { useStyles } from '../../styles/jsx/pages/questions.style'
import { ChallengeStates } from '../../data/challengeState'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'

function Question (props) {
    const classes = useStyles()
    const { quiz, title, duration, advancedType } = props.content
    const { question, answers } = quiz
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(duration)
    const [showComponent, setShowComponent] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [answer, setAnswer] = useState(null)
    const intervalId = useRef()
    const quizTrueFalse = advancedType.quiztruefalse

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

    function startQuestion () {
        setDisabled(false)
        setShowComponent(true)
        startTimer()
    }

    useEffect(() => {
        if (!props.hasPlayed) {
            props.openCountDownModal()
            props.startCountDown()
        } else {
            startQuestion()
        }

        return () => clearInterval(intervalId.current)
    }, [])

    useEffect(() => {
        if (props.status) {
            props.challengeState(ChallengeStates.QUESTIONS)
            startQuestion()
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
        <Box className='content' >
            <Slide in={showComponent} timeout={500} direction="down" >
                <Box>
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
                </Box>
            </Slide>
            <Slide in={showComponent} timeout={200 + (100 * answers.length)} direction="up" >
                <Box className={quizTrueFalse ? 'bottomZoneQuestionsTrueFalse' : 'bottomZoneQuestions'}>
                    {answers.map((item, index) => {
                        return (
                            <Slide key={index} in={showComponent} timeout={200 + (100 * index)} direction="up" >
                                <Box className={classes.buttonWrapper} >
                                    <CustomDisabledButton color="secondary" variant="contained" className={ quizTrueFalse ? answers.length === index + 1 ? ['questionButton', classes.buttonTrue].join(' ') : ['questionButton', classes.buttonFalse].join(' ') : 'questionButton'} disabled={disabled} onClick={() => {
                                        onAnswer(index + 1)
                                    }}>
                                        {quizTrueFalse &&
                                            answers.length === index + 1
                                            ? <CheckIcon
                                                fontSize="small"
                                                className={classes.rateIcon}
                                            />
                                            : <CloseIcon
                                                fontSize="small"
                                                className={classes.rateIcon}
                                            />}
                                        {item}
                                    </CustomDisabledButton>
                                    {(disabled && (answer === index + 1)) && <CircularProgress color={'secondary'} size={24} className={classes.buttonProgress} />}
                                </Box>
                            </Slide>
                        )
                    }
                    )}
                </Box>
            </Slide>
            <Fade in={showComponent} timeout={600}>
                <Box className='backgroundGradientTop' />
            </Fade>
        </Box>
    )
}

export default hasCountDownModal(Question)
