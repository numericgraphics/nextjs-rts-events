import React, { useRef, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router, { useRouter } from 'next/router'
import UserContext from '../../components/UserContext'
import EventLayout from '../../components/eventLayout'
import Box from '@material-ui/core/Box'
import InnerHeightLayout from '../../components/innerHeightLayout'
import hasCountDownModal from '../../hoc/hasCountDownModal'
import Question from '../../components/challenges/questions'
import Result from '../../components/challenges/result'
import LazyImage from '../../components/ui/LazyImage'
import { useHeight } from '../../hooks/useHeight'
import { getAllEvents } from '../../lib/events'
import Video from '../../components/ui/Player'

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
        backgroundColor: 'white'
    }
}
const ChallengeStates = Object.freeze({
    COUNTDOWN: 'countDown',
    QUESTIONS: 'questions',
    RESULT: 'result',
    LOADING: 'loading',
    ERROR: 'error'
})

function Challenge (props) {
    const router = useRouter()
    const { events } = router.query
    const classes = useStyles()
    const layoutRef = useRef()
    // TODO Meilleur temps d'utiliser un useRef ?
    const { dataProvider, store } = useContext(UserContext)
    const { isGlobalLoading, isLoading, setLoading, setEventName } = store
    const [challengeState, setChallengeState] = useState(ChallengeStates.COUNTDOWN)
    const [questionsContent, setQuestionsContent] = useState({})
    const [resultContent, setResultContent] = useState({})
    const [answer, setAnswer] = useState(null)
    const [imageURL, setImageURL] = React.useState()
    const [videoURL, setVideoURL] = useState()
    const height = useHeight()
    const [backgroundType, setBackgroundType] = useState('')
    const [mute, setMute] = useState(true)
    const playerRef = useRef()
    const videoMute = useRef()
    const videoUnmute = useRef()
    const videoPlay = useRef()
    const videoPause = useRef()
    const [curPlaying, setCurPlaying] = useState(true)
    const [endChallenge, setEndChallenge] = useState(false)

    async function fetchQuestions () {
        try {
            const response = await fetch('/api/fetchQuiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventName: events })
            })
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData({ challenge: content })
                setQuestionsContent(content)
            } else {
                // TODO : manage response !== 200
                await Router.push('/[events]/dashBoard', {
                    pathname: `/${events}/dashBoard`,
                    query: { quiz: false }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function fetchResult () {
        try {
            const { challengeID } = dataProvider.getChallenge()
            const answerToString = String(answer)

            const response = await fetch('/api/fetchQuizResult', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer: answerToString, challengeID, eventName: events })
            })

            if (response.status === 200) {
                const content = await response.json()
                setResultContent(content)
            } else {
                // TODO : manage response !== 200
                await Router.push('/[events]/dashBoard', {
                    pathname: `/${events}/dashBoard`,
                    query: { quiz: false }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // init game back from result fetch before  set result content !!! important
    function initGame () {
        setAnswer(null)
        setQuestionsContent({})
    }

    // Callback for Result component to keep playing game
    function playGame () {
        setLoading(true)
        fetchQuestions().then()
    }

    // Get the good component by challenge state
    // return <Progress />
    function getChallengeContent (state) {
        switch (state) {
        case ChallengeStates.LOADING:
        case ChallengeStates.QUESTIONS:
            return <Question content={questionsContent} answerCallBack={setAnswer}/>
        case ChallengeStates.RESULT:
            return <Result content={resultContent} playGameCallBack={playGame}/>
        case ChallengeStates.COUNTDOWN:
            return null
        }
    }

    async function gotoDashBoard () {
        await Router.push('/[events]/dashBoard', `/${events}/dashBoard`)
    }

    // Call through question component callBack
    useEffect(() => {
        if (challengeState === ChallengeStates.QUESTIONS) {
            setChallengeState(ChallengeStates.LOADING)
            fetchResult().then()
        }
    }, [answer])

    // init Challenge or redirect to dashboard if page is reloaded (isGlobalLoading)
    useEffect(() => {
        if (isGlobalLoading) {
            gotoDashBoard().then()
        } else {
            setEventName(events)
            fetchQuestions().then()
        }
    }, [])

    // Back from fetchQuizz call
    useEffect(() => {
        if (Object.keys(questionsContent).length !== 0) {
            if (isLoading) {
                setLoading(false)
            }
            const { imageURL } = questionsContent
            const { videoURL } = questionsContent
            if (videoURL) {
                setVideoURL(videoURL)
                setBackgroundType('video')
            } else {
                setImageURL(imageURL)
                setBackgroundType('image')
            }
            setChallengeState(ChallengeStates.COUNTDOWN)
            props.openCountDownModal()
            props.startCountDown()
        }
    }, [questionsContent])

    useEffect(() => {
        if (props.status) {
            setChallengeState(ChallengeStates.QUESTIONS)
            // eslint-disable-next-line no-unused-expressions
            // backgroundType === 'video' ? playerRef.load(videoURL) : null
            // eslint-disable-next-line no-unused-expressions
            backgroundType === 'video' ? playerRef.current.actions.play() : null
            // eslint-disable-next-line no-unused-expressions
            backgroundType === 'video' ? videoMute.current.onclick = () => { setMute(false) } : null
            // eslint-disable-next-line no-unused-expressions
            backgroundType === 'video' ? videoUnmute.current.onclick = () => { setMute(true) } : null
            // eslint-disable-next-line no-unused-expressions
            // backgroundType === 'video' ? () => { playerRef.current.actions.handlePlay(setCurPlaying(true)) } : null
            // eslint-disable-next-line no-unused-expressions
            // backgroundType === 'video' ? () => { playerRef.current.actions.handlePause(setCurPlaying(false)) } : null
            // eslint-disable-next-line no-unused-expressions
            backgroundType === 'video' ? videoPause.current.onclick = function () {
                playerRef.current.actions.pause()
                setCurPlaying(false)
            } : null
            // eslint-disable-next-line no-unused-expressions
            backgroundType === 'video' ? videoPlay.current.onclick = function () {
                playerRef.current.actions.play()
                setCurPlaying(true)
            } : null
        }
    }, [props.status])

    // Back from fetchQuizzResult
    useEffect(() => {
        if (Object.keys(resultContent).length !== 0) {
            // eslint-disable-next-line no-unused-expressions
            backgroundType === 'video' ? playerRef.current.actions.pause() : null
            setMute(true)
            setCurPlaying(false)
            setEndChallenge(true)
            setChallengeState(ChallengeStates.RESULT)
            initGame()
        }
    }, [resultContent])
    return (
        <EventLayout>
            {isLoading
                ? null
                : <InnerHeightLayout ref={layoutRef} className={classes.containerGlobal}>
                    {getChallengeContent(challengeState)}
                    {challengeState === ChallengeStates.QUESTIONS
                        ? <Box className={classes.gradient}/>
                        : null}
                    {backgroundType === 'image' ? <LazyImage style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})`, minHeight: height, filter: challengeState === ChallengeStates.QUESTIONS ? 'none' : 'blur(4px)' }}/>
                        // eslint-disable-next-line no-const-assign
                        : <Video endChallenge={endChallenge} curPlaying={curPlaying} refPlay={videoPlay} refPause={videoPause} refMute={videoMute} refUnmute={videoUnmute} ref={playerRef} muted={mute} height={height} src={videoURL} /> }
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default hasCountDownModal(Challenge)

export async function getStaticPaths () {
    const paths = await getAllEvents()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const events = params.events
    return {
        props: {
            eventData: { events }
        }
    }
}
