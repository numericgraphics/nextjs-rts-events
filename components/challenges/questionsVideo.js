import React, { useContext, useEffect, useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import QuestionTimer from '../ui/progress/questionTimer'
import Fade from '@material-ui/core/Fade/Fade'
import { CustomDisabledButton } from '../ui/button/CustomDisabledButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import VideoControler from '../ui/video/VideoController'
import hasButtonModal from '../../hoc/hasButtonModal'
import UserContext from '../../hooks/userContext'
import useAppVisibility from '../../hooks/useAppVisivility'
import { useStyles } from '../../styles/jsx/pages/questionVideo.style'
import Slide from '@material-ui/core/Slide/Slide'

function QuestionVideo (props) {
    const classes = useStyles()
    const appVisibilityStatus = useAppVisibility()
    const { quiz, title, duration, imageURL, videoURL } = props.content
    const { question, answers } = quiz
    const { store } = useContext(UserContext)
    const { videoController } = store
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(duration)
    const [showComponent, setShowComponent] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [answer, setAnswer] = useState(null)
    const intervalId = useRef()

    function onAnswer (index) {
        if (progress > 0) {
            setAnswer(index)
            videoController.player.current.pause()
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

    function canPlay () {
        if (videoController.videoHasPlayed) {
            setShowComponent(true)
            videoController.player.current.play()
            startTimer()
        }
    }

    useEffect(() => {
        videoController.player.current.addEventListener('loadedmetadata', canPlay)
        videoController.setVideoSource(videoURL)
        if (!videoController.videoHasPlayed) {
            props.openModal()
            videoController.setVideoPoster(imageURL)
        }
        videoController.setShowVideo(true)
        return () => {
            clearInterval(intervalId.current)
            videoController.player.current.removeEventListener('loadedmetadata', canPlay)
        }
    }, [])

    useEffect(() => {
        if (props.firstPlayStarPlaying) {
            setDisabled(false)
            videoController.setVideoPoster('')
            setShowComponent(true)
            startTimer()
        }
    }, [props.firstPlayStarPlaying])

    useEffect(() => {
        if (progress >= 100) {
            setTimeLeft(0)
            setProgress(0)
            videoController.player.current.pause()
            props.answerCallBack(-1)
            setDisabled(true)
        }
    }, [progress, appVisibilityStatus])

    return (
        <Box className='content' >
            <Slide in={showComponent} timeout={500} direction="down" >
                <Box>
                    <Box className='timerZone'>
                        <Box className={classes.counter}>
                            <QuestionTimer timeLeft={timeLeft} progress={progress} />
                            {props.content.videoURL && <VideoControler controls={true}/>}
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
            <Slide in={showComponent} timeout={600} direction="up" style={{ transitionDelay: showComponent ? '100ms' : '0ms' }}>
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
            </Slide>
            <Fade in={showComponent} timeout={500} >
                <Box className='backgroundGradientTop' />
            </Fade>
        </Box>
    )
}

export default hasButtonModal(QuestionVideo)
