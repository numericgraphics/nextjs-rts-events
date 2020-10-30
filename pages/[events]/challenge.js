import React, { useContext, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import UserContext from '../../components/UserContext'
import EventLayout from '../../components/eventLayout'
import Question from '../../components/challenges/questions'
import QuestionsVideo from '../../components/challenges/questionsVideo'
import Result from '../../components/challenges/result'
import LazyImage from '../../components/ui/LazyImage'
import { getAllEvents } from '../../lib/events'

const ChallengeStates = Object.freeze({
    COUNTDOWN: 'countDown',
    QUESTIONS: 'questions',
    RESULT: 'result',
    LOADING: 'loading',
    ERROR: 'error'
})

function Challenge () {
    const router = useRouter()
    const { events } = router.query
    const { dataProvider, store } = useContext(UserContext)
    const { isGlobalLoading, isLoading, setLoading, setEventName, videoController } = store
    const [challengeState, setChallengeState] = useState(ChallengeStates.COUNTDOWN)
    const [questionsContent, setQuestionsContent] = useState({})
    const [resultContent, setResultContent] = useState({})
    const [answer, setAnswer] = useState(null)
    const [imageURL, setImageURL] = useState()
    const [backgroundType, setBackgroundType] = useState('image')

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
                dataProvider.setData(content)
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
        videoController.setShowVideo(false)
        fetchQuestions().then()
    }

    // Get the good component by challenge state
    // return <Progress />
    function getChallengeContent (state) {
        switch (state) {
        case ChallengeStates.LOADING:
        case ChallengeStates.QUESTIONS:
            return backgroundType === 'video'
                ? <QuestionsVideo content={questionsContent} answerCallBack={setAnswer} />
                : <Question content={questionsContent} answerCallBack={setAnswer} />
        case ChallengeStates.RESULT:
            return <Result content={resultContent} playGameCallBack={playGame} gotoDashBoard={gotoDashBoard}/>
        }
    }

    async function gotoDashBoard () {
        if (backgroundType === 'video') {
            videoController.setVideoSource('')
            videoController.setVideoVisible(false)
        }
        await Router.push('/[events]/dashBoard', `/${events}/dashBoard`)
    }

    // Call through question component callBack when user answered question
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
                videoController.setShowVideo(true)
                setBackgroundType('video')
            } else {
                videoController.setShowVideo(false)
                setImageURL(imageURL)
                setBackgroundType('image')
            }
            setChallengeState(ChallengeStates.QUESTIONS)
        }
    }, [questionsContent])

    useEffect(() => {
        videoController.setVideoVisible(backgroundType === 'video')
    }, [backgroundType])

    // Back from fetchQuizzResult
    useEffect(() => {
        if (Object.keys(resultContent).length !== 0) {
            setChallengeState(ChallengeStates.RESULT)
            initGame()
        }
    }, [resultContent])

    const addBlur = challengeState === ChallengeStates.QUESTIONS ? 'false' : 'true'
    const addColor = challengeState === ChallengeStates.RESULT ? 'true' : 'false'

    return (
        <EventLayout>
            {isLoading
                ? null
                : <React.Fragment>
                    {getChallengeContent(challengeState)}
                    {backgroundType === 'image' &&
                    <LazyImage addblur={ addBlur } addcolor={ addColor} className='background' style={{ backgroundImage: `url(${imageURL})` }}/>}
                </React.Fragment>
            }
        </EventLayout>
    )
}

export default Challenge

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
