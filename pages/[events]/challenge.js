import React, { useContext, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import UserContext from '../../hooks/userContext'
import EventLayout from '../../components/ui/layout/eventLayout'
import Question from '../../components/challenges/questions'
import QuestionsVideo from '../../components/challenges/questionsVideo'
import Result from '../../components/challenges/result'
import BackGroundDisplay from '../../components/ui/background/BackGroundDisplay'
import { getAllEvents, getEventsData } from '../../lib/events'
import { ChallengeStates } from '../../data/challengeState'
import Box from '@material-ui/core/Box'
import Gift from '../../components/gifts/gift'
import GenericModal from '../../components/ui/modal/genericModal'
import QuestionImage from '../../components/challenges/questionsImage'

function Challenge () {
    const router = useRouter()
    const { events } = router.query
    const { dataProvider, store } = useContext(UserContext)
    const { locale, isGlobalLoading, isLoading, setLoading, setEventName, videoController, timeStampMode } = store
    const [challengeState, setChallengeState] = useState(ChallengeStates.LOADING)
    const [questionsContent, setQuestionsContent] = useState({})
    const [hasPlayed, setHasPlayed] = useState(false)
    const [resultContent, setResultContent] = useState({})
    const [answer, setAnswer] = useState(null)
    const [imageURL, setImageURL] = useState()
    const [backgroundType, setBackgroundType] = useState('image')
    const [addColor, setColor] = useState(false)
    const [addBlur, setBlur] = useState(false)
    const [open, setOpen] = useState(false)
    const [gift, setGift] = useState({ description: '', title: '', locked: true })
    // eslint-disable-next-line no-unused-vars
    const [rawImage, setRawImage] = useState(null)

    async function fetchQuestions () {
        try {
            const bodyContent = { eventName: events, locale, ...(timeStampMode.enable && { date: timeStampMode.date, time: timeStampMode.time }) }
            const response = await fetch('/api/fetchQuiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData({ challenge: content })
                setQuestionsContent(content)
            } else {
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
            const bodyContent = { answer: answerToString, challengeID, eventName: events, locale, ...(timeStampMode.enable && { date: timeStampMode.date, time: timeStampMode.time }) }
            const response = await fetch('/api/fetchQuizResult', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })

            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
                setResultContent(content)
            } else {
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
    function playGameCallBack () {
        setChallengeState(ChallengeStates.LOADING)
        videoController.setVideoPoster('')
        videoController.setVideoSource('')
        setLoading(true)
        fetchQuestions().then()
    }

    // Get the good component by challenge state
    // return <Progress />
    function getChallengeContent (state) {
        switch (state) {
        case ChallengeStates.LOADING:
            return null
        case ChallengeStates.COUNTDOWN:
        case ChallengeStates.QUESTIONS:
            return <Question
                content={questionsContent}
                answerCallBack={setAnswer}
                challengeState={setChallengeState}
                hasPlayed={hasPlayed}/>
        case ChallengeStates.QUESTIONS_VIDEO:
            return <QuestionsVideo
                content={questionsContent}
                answerCallBack={setAnswer} />
        case ChallengeStates.QUESTIONS_IMAGE:
            return <QuestionImage
                content={questionsContent}
                setImageURL={setImageURL}
                answerCallBack={setRawImage} />
        case ChallengeStates.RESULT:
            return <Result
                openModal={onOpenModal}
                setGift={setGift}
                content={resultContent}
                playGameCallBack={playGameCallBack}
                gotoDashBoard={gotoDashBoard}/>
        }
    }

    async function gotoDashBoard () {
        if (backgroundType === 'video') {
            videoController.setVideoSource('')
            videoController.setVideoPoster('')
            videoController.setShowVideo(false)
        }
        await Router.push('/[events]/dashBoard', `/${events}/dashBoard`)
    }

    function getModalContent () {
        return <Gift gift={gift} handleClose={closeModal} open={open}/>
    }

    function onOpenModal () {
        setOpen(true)
    }

    function closeModal () {
        setOpen(false)
    }

    // Call through question component callBack when user answered question
    useEffect(() => {
        if (challengeState === ChallengeStates.QUESTIONS || challengeState === ChallengeStates.QUESTIONS_VIDEO) {
            fetchResult().then()
            if (!hasPlayed) {
                setHasPlayed(true)
            }
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
            const { reco } = questionsContent
            if (videoURL) {
                setBackgroundType('video')
                setChallengeState(ChallengeStates.QUESTIONS_VIDEO)
            //    TODO check RECO propertie in challange object
            } else if (reco !== null) {
                console.log('questionsContent', questionsContent)
                setChallengeState(ChallengeStates.QUESTIONS_IMAGE)
                setImageURL(imageURL)
                setBackgroundType('image')
            } else {
                videoController.setShowVideo(false)
                setImageURL(imageURL)
                setBackgroundType('image')

                if (!hasPlayed) {
                    setChallengeState(ChallengeStates.COUNTDOWN)
                } else {
                    setChallengeState(ChallengeStates.QUESTIONS)
                }
            }
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

    useEffect(() => {
        if (backgroundType === 'image') {
            const needBackGround = (
                challengeState === ChallengeStates.COUNTDOWN ||
                challengeState === ChallengeStates.RESULT ||
                challengeState === ChallengeStates.LOADING)
            setColor(needBackGround)
            setBlur(needBackGround)
        }
    }, [challengeState])

    return (
        <React.Fragment>
            <EventLayout>
                {!isLoading && <Box>
                    {getChallengeContent(challengeState)}
                    {backgroundType === 'image' &&
                    <BackGroundDisplay
                        addBlur={ addBlur }
                        addColor={ addColor }
                        className='background'
                        animated={true}
                        imageURL={imageURL}/>}
                </Box>
                }
            </EventLayout>
            <GenericModal
                handleClose={closeModal}
                open={open}
                hideBackdrop={true}
            >
                {getModalContent()}
            </GenericModal>
        </React.Fragment>
    )
}

export default Challenge

export async function getStaticPaths ({ locales }) {
    const eventPaths = await getAllEvents()

    const paths = []
    eventPaths.forEach((path) => {
        locales.forEach((locale) => {
            paths.push({ ...path, locale })
        })
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params, locale }) {
    const eventData = await getEventsData(params.events, locale)
    return {
        props: {
            eventData,
            locale
        },
        revalidate: 1
    }
}
