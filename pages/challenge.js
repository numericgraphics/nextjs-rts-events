import React, { createRef, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import UserContext from '../components/UserContext'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'
import InnerHeightLayout from '../components/innerHeightLayout'
import hasCountDownModal from '../hoc/hasCountDownModal'
import Question from '../components/challenges/questions'
import Result from '../components/challenges/result'
import LazyImage from '../components/ui/LazyImage'
import { useHeight } from '../hooks/useHeight'
// import Progress from '../components/challenges/progress'

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
    const classes = useStyles()
    const layoutRef = createRef()
    const { dataProvider, store } = useContext(UserContext)
    const { isLoading, setLoading } = store
    const [challengeState, setChallengeState] = useState(ChallengeStates.LOADING)
    const [questionsContent, setQuestionsContent] = useState({})
    const [resultContent, setResultContent] = useState({})
    const [answer, setAnswer] = useState(null)
    const [imageURL, setImageURL] = React.useState()
    const height = useHeight()

    async function fetchQuestions () {
        try {
            const response = await fetch('/api/fetchQuiz')
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData({ challenge: content })
                setQuestionsContent(content)
            } else {
                // TODO : manage response !== 200
                await Router.push({
                    pathname: '/dashBoard',
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
                body: JSON.stringify({ answer: answerToString, challengeID })
            })

            if (response.status === 200) {
                /*
                ////// MODEL END
                hasAvailableChallenges: false
                message: "La bonne réponse était: Réponse3"
                nextAvailableChallengeID: null
                points: 0
                success: false
                 */
                const content = await response.json()
                initGame()
                setResultContent(content)
            } else {
                // TODO : manage response !== 200
                await Router.push({
                    pathname: '/dashBoard',
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
        case ChallengeStates.QUESTIONS:
            return <Question content={questionsContent} answerCallBack={setAnswer}/>
        case ChallengeStates.RESULT:
            return <Result content={resultContent} playGameCallBack={playGame}/>
        case ChallengeStates.LOADING:
        case ChallengeStates.COUNTDOWN:
            return null
        }
    }

    // Call through question component callBack
    useEffect(() => {
        if (challengeState === ChallengeStates.QUESTIONS) {
            setChallengeState(ChallengeStates.LOADING)
            fetchResult().then()
        }
    }, [answer])

    // init Challenge
    useEffect(() => {
        fetchQuestions().then()
    }, [])

    // Back from fetchQuizz call
    useEffect(() => {
        if (Object.keys(questionsContent).length !== 0) {
            if (isLoading) {
                setLoading(false)
            }
            const { imageURL } = questionsContent
            setImageURL(imageURL)
            setChallengeState(ChallengeStates.COUNTDOWN)
            props.openCountDownModal()
            props.startCountDown()
        }
    }, [questionsContent])

    useEffect(() => {
        if (props.status) {
            setChallengeState(ChallengeStates.QUESTIONS)
        }
    }, [props.status])

    // Back from fetchQuizzResult
    useEffect(() => {
        if (Object.keys(resultContent).length !== 0) {
            setChallengeState(ChallengeStates.RESULT)
        }
    }, [resultContent])

    useEffect(() => {
        console.log('Challenge -  DEBUG - challengeState', challengeState)
    }, [challengeState])

    return (
        <EventLayout>
            {isLoading
                ? null
                : <InnerHeightLayout ref={layoutRef} className={classes.containerGlobal}>
                    {getChallengeContent(challengeState)}
                    {challengeState === ChallengeStates.QUESTIONS
                        ? <Box className={classes.gradient}/>
                        : null}
                    <LazyImage style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})`, minHeight: height, filter: challengeState === ChallengeStates.QUESTIONS ? 'none' : 'blur(4px)' }}/>
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default hasCountDownModal(Challenge)
