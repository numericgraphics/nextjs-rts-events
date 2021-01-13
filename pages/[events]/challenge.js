import React, { createRef, useContext, useEffect, useState } from 'react'
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
import InvalidImage from '../../components/ui/image/InvalidImage'
import ImageValidation from '../../components/ui/image/ImageValidation'

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
    const modalGiftRef = createRef()
    const modalInvalidImageRef = createRef()

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

    // TODO Fix backend result - check fetchQuizRecoResult api
    async function fetchResultReco () {
        try {
            // console.log(b64Image)
            const { challengeID } = dataProvider.getChallenge()
            const cleanB64 = rawImage.replace(/^data:image.+;base64,/, '')
            console.log(cleanB64)
            const bodyContent = { img: cleanB64, challengeID, eventName: events, locale, ...(timeStampMode.enable && { date: timeStampMode.date, time: timeStampMode.time }) }
            console.log(bodyContent)
            const response = await fetch('/api/fetchQuizRecoResult', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            console.log(response)
            if (response.status === 200) {
                const content = await response.json()
                console.log('content from result', content)
                dataProvider.setData(content)
                setResultContent(content)
            } else {
                setChallengeState(ChallengeStates.QUESTIONS_IMAGE_INVALID)
                onOpenModal()
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
                answerCallBack={setRawImage} />
        case ChallengeStates.QUESTIONS_IMAGE_VALIDATION:
            return <ImageValidation/>
        case ChallengeStates.QUESTIONS_IMAGE_INVALID:
            return null
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
        } else if (challengeState === ChallengeStates.QUESTIONS_IMAGE_INVALID) {

        }
        console.log('challenge gotoDashboard')
        await Router.push('/[events]/dashBoard', `/${events}/dashBoard`)
    }

    function getModalContent (state) {
        switch (state) {
        case ChallengeStates.QUESTIONS_IMAGE_INVALID:
            return <InvalidImage ref={modalInvalidImageRef} reSnap={reSnap} gotoDashBoard={gotoDashBoard} open={open}/>
        default:
        case ChallengeStates.RESULT:
            return <Gift ref={modalGiftRef} gift={gift} handleClose={closeModal} open={open}/>
        }
    }

    function onOpenModal () {
        setOpen(true)
    }

    function closeModal () {
        setOpen(false)
    }

    function reSnap () {
        closeModal()
        setRawImage(null)
        setImageURL(questionsContent.imageURL)
        setTimeout(() => {
            setChallengeState(ChallengeStates.QUESTIONS_IMAGE)
        }, 500)
    }

    useEffect(() => {
        if (isGlobalLoading) {
            gotoDashBoard().then()
        } else {
            setEventName(events)
            fetchQuestions().then()
        }
    }, [])

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
        if (rawImage) {
            setImageURL(rawImage)
            setChallengeState(ChallengeStates.QUESTIONS_IMAGE_VALIDATION)
            setTimeout(() => {
                fetchResultReco().then()
            }, 2000)
            if (!hasPlayed) {
                setHasPlayed(true)
            }
        }
    }, [rawImage])

    // Back from fetchQuizz call
    useEffect(() => {
        if (Object.keys(questionsContent).length !== 0) {
            if (isLoading) {
                setLoading(false)
            }
            const { imageURL, videoURL, reco } = questionsContent
            if (videoURL) {
                setBackgroundType('video')
                setChallengeState(ChallengeStates.QUESTIONS_VIDEO)
            } else if (reco !== null) {
                setImageURL(imageURL)
                setBackgroundType('image')
                setChallengeState(ChallengeStates.QUESTIONS_IMAGE)
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

    // initialize the game back from fetch result
    useEffect(() => {
        if (Object.keys(resultContent).length !== 0) {
            setChallengeState(ChallengeStates.RESULT)
            initGame()
        }
    }, [resultContent])

    // Only set background value, for blud and color if background type is image
    useEffect(() => {
        if (backgroundType === 'image') {
            const needBackGround = (
                challengeState === ChallengeStates.COUNTDOWN ||
                challengeState === ChallengeStates.RESULT ||
                challengeState === ChallengeStates.LOADING ||
                challengeState === ChallengeStates.QUESTIONS_IMAGE_VALIDATION ||
                challengeState === ChallengeStates.QUESTIONS_IMAGE_INVALID)
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
                {getModalContent(challengeState)}
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
