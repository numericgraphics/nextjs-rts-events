import React, { createRef, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import UserContext from '../components/UserContext'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { ColorButton } from '../components/ui/ColorButton'
import InnerHeightLayout from '../components/innerHeightLayout'
import hasCountDownModal from '../hoc/hasCountDownModal'
import QuestionTimer from '../components/questionTimer'

const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'flex-start',
        backgroundColor: 'pink'
    },
    counter: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        flex: 1,
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
        fontSize: '1.25rem'
    },
    HeaderTitle: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem'
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
    }
})

function ChallengeQuestion (props) {
    const classes = useStyles()
    // eslint-disable-next-line no-unused-vars
    const [translation, setTranslation] = useState([])
    const [duration, setDuration] = useState(0)
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState([])
    const { dataProvider, store } = useContext(UserContext)
    const { isLoading, setLoading } = store
    const layoutRef = createRef()

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchQuiz')
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData({ challenge: content })
                const { quiz, title, duration } = content
                const { question, answers } = quiz
                setTitle(title)
                setQuestion(question)
                setAnswers(answers)
                setDuration(duration)
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

    async function fetchResult (index) {
        await Router.push({
            pathname: '/challengeResult',
            query: { answer: index }
        })
    }

    function initPage () {
        setTranslation(dataProvider.getTranslation())
        props.startTimer()
        setLoading(false)
    }

    function onAnswer (index) {
        console.log('onAnswer', index)
        fetchResult(index).then()
    }

    useEffect(() => {
        props.openModal()
        fetchData().then()
    }, [])

    function endTimer () {
        console.log('endTimer')
    }

    return (
        <EventLayout>
            {isLoading
                ? null
                : <InnerHeightLayout ref={layoutRef} class={classes.containerGlobal} >
                    <Box className={classes.counter}>
                        <QuestionTimer finishedCallBack={endTimer} duration={duration}/>
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
                                <ColorButton key={index} variant="contained" className={classes.button} onClick={() => {
                                    onAnswer(index)
                                }}>
                                    {item}
                                </ColorButton>
                            )
                        }
                        )}
                    </Box>
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default hasCountDownModal(ChallengeQuestion)
