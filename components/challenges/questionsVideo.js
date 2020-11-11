import React, { useContext, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import QuestionTimer from './questionTimer'
import Fade from '@material-ui/core/Fade/Fade'
import { CustomDisabledButton } from '../ui/CustomDisabledButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import VideoControler from '../ui/VideoController'
import hasButtonModal from '../../hoc/hasButtonModal'
import UserContext from '../../hooks/userContext'
import useAppVisibility from '../../hooks/useAppVisivility'

const useStyles = makeStyles({
    counter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        flex: 1,
        maxHeight: 100
    },
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '1rem 0.8rem',
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 2,
        textAlign: 'center',
        marginBottom: 30
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
        lineHeight: '1.2em',
        textShadow: '0px 3px 6px #00000040'
    },
    HeaderTitle: {
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
    buttonWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '1rem!important'
    },
    buttonProgress: {
        position: 'absolute'
    }
})

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
            videoController.player.current.play()
            setShowComponent(true)
            startTimer()
        }
    }

    useEffect(() => {
        videoController.player.current.addEventListener('loadedmetadata', canPlay)
        videoController.setVideoVisible(true)
        videoController.setVideoPoster(imageURL)
        videoController.setVideoSource(videoURL)
        if (!videoController.videoHasPlayed) {
            props.openModal(imageURL)
        }

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
        <Fade in={showComponent} timeout={500}>
            <Box className='content' >
                <Box className='topZone'>
                    <Box className={classes.counter}>
                        <QuestionTimer timeLeft={timeLeft} progress={progress} />
                        {props.content.videoURL && <VideoControler controls={true}/>}
                    </Box>
                    <Box className={[classes.header, 'color-White'].join(' ')}>
                        <Typography variant='subtitle1' className={classes.HeaderTitle} align={'left'}>
                            {title}
                        </Typography>
                        <Typography variant='h3' className={classes.HeaderText} align={'left'}>
                            {question}
                        </Typography>
                    </Box>
                </Box>
                <Box className='bottomZone'>
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

export default hasButtonModal(QuestionVideo)
