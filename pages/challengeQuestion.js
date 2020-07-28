import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import UserContext from '../components/UserContext'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InnerHeightLayout from '../components/innerHeightLayout'
import hasCountDownModal from '../hoc/hasCountDownModal'
import QuestionTimer from '../components/challenges/questionTimer'
import { useHeight } from '../hooks/useHeight'

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
        backgroundColor: 'gray'
    }
}

function ChallengeQuestion (props) {
    const classes = useStyles()
    // eslint-disable-next-line no-unused-vars
    const [translation, setTranslation] = useState([])
    const [duration, setDuration] = useState(0)
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState(-1)
    const [progress, setProgress] = React.useState(0)
    const [timeLeft, setTimeLeft] = React.useState(duration)
    const [imageURL, setImageURL] = React.useState()
    const { dataProvider, store } = useContext(UserContext)
    const { isLoading, setLoading } = store
    const layoutRef = createRef()
    const intervalId = useRef()
    const height = useHeight()

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchQuiz')
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData({ challenge: content })
                const { quiz, title, duration, imageURL } = content
                const { question, answers } = quiz
                setTitle(title)
                setQuestion(question)
                setAnswers(answers)
                setDuration(duration)
                setImageURL(imageURL)
                setTimeLeft(duration)
                initPage()
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
        await Router.push({
            pathname: '/challengeResult',
            query: { answer }
        })
    }

    function initPage () {
        setTranslation(dataProvider.getTranslation())
        props.startCountDown()
    }

    function onAnswer (index) {
        if (progress > 0) {
            setAnswer(index)
        }
    }

    useEffect(() => {
        if (progress > 0) {
            fetchResult().then()
            clearInterval(intervalId.current)
        }
    }, [answer])

    useEffect(() => {
        setLoading(false)
        props.openCountDownModal()
        fetchData().then()
        return () => clearInterval(intervalId.current)
    }, [])

    useEffect(() => {
        if (props.status) {
            let count = duration
            intervalId.current = setInterval(() => {
                setTimeLeft(Math.round(count--))
                setProgress(prevProgress => prevProgress + 100 / duration)
            }, 1000)
        }
    }, [props.status])

    useEffect(() => {
        if (progress >= 100) {
            setTimeLeft(0)
            setProgress(0)
            fetchResult().then()
        }
    }, [progress])

    return (
        <EventLayout>
            {isLoading && props.status
                ? null
                : <InnerHeightLayout ref={layoutRef} className={classes.containerGlobal}>
                    <Box style={{ ...styles.containerOverlay, minHeight: height }} >
                        <Box className={classes.counter}>
                            <QuestionTimer timeLeft={timeLeft} progress={progress} />
                        </Box>
                        <Box className={classes.header}>
                            <Typography className={classes.HeaderTitle} align={'left'}>
                                {title}
                            </Typography>
                            <Typography className={classes.HeaderText} align={'left'}>
                                {question}
                            </Typography>
                        </Box>
                        <Box className={classes.footer}>
                            {answers.map((item, index) => {
                                return (
                                    <Button color="primary" variant="contained" key={index} className={classes.button} onClick={() => {
                                        onAnswer(index)
                                    }}>
                                        {item}
                                    </Button>
                                )
                            }
                            )}
                        </Box>
                    </Box>
                    <Box className={classes.gradient}/>
                    <Box style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})`, minHeight: height }} />
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default hasCountDownModal(ChallengeQuestion)
