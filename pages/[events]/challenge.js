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

    async function fetchResultReco () {
        try {
            const testImg = '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QMcaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMyA3OS4xNjQ1MjcsIDIwMjAvMTAvMTUtMTc6NDg6MzIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBGN0M0NkZFMzk0RDExRUJBODFEQTAxMjc3QTlCOEJGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBGN0M0NkZEMzk0RDExRUJBODFEQTAxMjc3QTlCOEJGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIxIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSIxQTNFNzM3OTcyMDE4NzBGNzU1NUYxNEZBQkZDRkNGMiIgc3RSZWY6ZG9jdW1lbnRJRD0iMUEzRTczNzk3MjAxODcwRjc1NTVGMTRGQUJGQ0ZDRjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAUEBAZEhknFxcnMiYfJjIuJiYmJi4+NTU1NTU+REFBQUFBQUREREREREREREREREREREREREREREREREREREREARUZGSAcICYYGCY2JiAmNkQ2Kys2REREQjVCRERERERERERERERERERERERERERERERERERERERERERERERERET/wAARCACAAMgDASIAAhEBAxEB/8QAdAAAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBgEAAwEBAAAAAAAAAAAAAAAAAAECAwQQAAICAQQCAgICAwEAAAAAAAABEQIDITESBEEiURNhcTIFgVIUYhEBAQEBAQEAAQUBAAAAAAAAAAERAiExQWFxEiIDYv/aAAwDAQACEQMRAD8A5I1I5BpHI6WJBQakEkAYkaqhqoaqALVQuIxVCVRgvibxGQdAEXxN4hwbAGXxM4jINgMIniDxHuoPEQJdQHUogF1Ead1FupS6gOojiV1BaKHUW6iBUHQMaMguEGDgoOLSakGkYkGkQpqQaRyQaQE5INI5INIDZBsGwcMmQcaR9rtrGnVbgB5O0q7akr7lrabEWO1nrbYKzX+SoFlM7+SlZGjzqW0TH1yeq/JrEVfW8hwS0vA7m6qd0T1zvwSigxoJWVlKOMbFltANDWgWiTJdRTqUNANCMh1Bgc0C6lwi4ODg4tI0g0jKoYkZqakGkYkGkAakEYgkMnHHHDBWflwfHRngf9FL34/Hk9/sX4UbPn7Yk3I4B5Mjb02BblSC1BzzUx192VIVpuOWvXYoxr1l+CbqWU6bMszLjj5fBcTTaOUUY7QtTzer2/tfFLYtTt+ykq60S1RovDaVA0w7+tIEFhGMzqi2gWhjAYGW0C0MaMaKiSmjg2jiybUYhKDmCMUamGmTcglYeEpTCQlWDTDAYYcjQJN3MlceN8lM6JHzayQ4toe7/ZtfWlPtMpHiZ6VvSfI40nP9dNo0Hk6tOzVK2kaprckwYKuqacW8spTanz+i/wBmdb9S6vtVzOkss5fbThfZkP2VdXW2s+DMd/qev6X6HKMmL8OKtdKqCvEm9tyOmadvJZRcIguIUV40UtpNh76kmLD7ay18lajwY2fytra8yRjBYTBZmQWCw2CxAILCMZcIEHGs4si5gF2kxsxMUMxBoXUNMZHVYaFVY1ADKs691SrtbZGVIv7LI/XGvOrJvh8zaj7FXnq8j33RNhfNF9K+sEPUWrr8NmTo/QN6PBZWj0e5tkm5R6bxK9XU8y9OLa2Neax6jbUV990KwTeVkXlwbXIuUMe8fCLTKZpGaii2KqL35PdQkR437SehjrLkd6zw+ed9U1r8HKu4X8a8jsNfnyH/ACr8UDBYT0AZz0MYLCYLJDDDjDSExnHNnF/hKWzMTBtYxWCKp9WMTEKwxWAjkx1WSqw2lh0Hpnk58/25n8L1R6N7RVv4R4eJ6yZ9NOI9Oj0IsdOOey+dSrE5OWOcrt+jNpFFX4Je9i9edd1uVcNZGWryrDKlTj5dXTsXPKljhvyeb2Mf/NltT8yv0Fh5ZrJL+K3NpcjHNuPY6deT5M9elSHrY+KR6CehPN2tepk8FlfoFitoBb+Iyi8mn51nb5heTRsWNz+BDZh3Mpz2OYLObBbIPGSZJjYMlxImzgJONCQ2uYrCXY1WGFVbBq5IrhfbAgsVg65EiD7p0Q/HitbVi+/FYqtmUHkxxtB6+KlVozzOzXhmsvyK82TarmzcVYXoVVI8LKqszXTkMQlMbVjhPA/vMMulq/yb4juj1ljqkN7/AL5q1/1Uj8KhD3zBJnqnGoHyKoMK5gptGNWiEUGyb8senXSe4l0Um5Lwzk5YWS0puFWrDgy1ElIWcC1pRGT1QOEimocBpmNhkAGoRwnNklwcHg/i8vkdzJnkMVnbRE2lih5BmPHbK/wbg63mxdSiqVObfp7gsHWrXV7l1IFUZs8WbzmT4zt069ZR4vecZtfhHsKx4vfyVfYj4SRH+0zlf+d9w/DYqqyPFZNaFNWcbZQmMT0EJm8oGaHLac9v8IsxM8yt5yXf/oux3HQvoMknpYanJpyim1DdoFJg3vBrPIyvrslpMpcRe4NbwyWmeKszlSTctBrtNSV2hj6+pnwbtALsDawFnoZ2qhDtNpOFycM3/9k='
            const { challengeID } = dataProvider.getChallenge()
            const bodyContent = { img: testImg, challengeID, eventName: events, locale, ...(timeStampMode.enable && { date: timeStampMode.date, time: timeStampMode.time }) }
            const response = await fetch('/api/fetchQuizRecoResult', {
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
        if (challengeState === ChallengeStates.QUESTIONS || challengeState === ChallengeStates.QUESTIONS_VIDEO || challengeState === ChallengeStates.QUESTIONS_IMAGE) {
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
            if (challengeState === ChallengeStates.QUESTIONS || challengeState === ChallengeStates.QUESTIONS_VIDEO || challengeState === ChallengeStates.QUESTIONS_IMAGE) {
                fetchResultReco().then()
                if (!hasPlayed) {
                    setHasPlayed(true)
                }
            }
        }
    }, [rawImage])

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
