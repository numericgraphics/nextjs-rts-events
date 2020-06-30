import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import UserContext from '../components/UserContext'
import EventLayout from '../components/eventLayout'
import Progress from '../components/progress'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// import Card from '@material-ui/core/Card/Card'
// import CardContent from '@material-ui/core/CardContent'
// import Avatar from '@material-ui/core/Avatar'
import { ColorButton } from '../components/ui/ColorButton'

const useStyles = makeStyles({
    containerGlobal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100vw',
        height: '100vh'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '15vh',
        padding: '10px 30px',
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
    const [isLoading, setLoading] = useState(true)
    // eslint-disable-next-line no-unused-vars
    const [translation, setTranslation] = useState([])
    const [question, setQuestion] = useState('')
    const [result, setResult] = useState([])
    const { dataProvider } = useContext(UserContext)

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchQuestion')
            if (response.status === 200) {
                const content = await response.json()
                const { question, reponses } = content
                setQuestion(question)
                setResult(reponses)
                initPage()
            } else {
                await Router.push({
                    pathname: '/',
                    query: { modal: true }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function fetchResult (index) {
        await Router.push('/challengeResult')
    }

    function initPage () {
        setTranslation(dataProvider.getTranslation())
        setLoading(false)
    }

    function onAnswer (index) {
        console.log('onAnswer', index)
        fetchResult(index).then()
    }

    useEffect(() => {
        fetchData().then()
    }, [])

    return (
        <EventLayout>
            {isLoading
                ? <Progress/>
                : <Container className={classes.containerGlobal}>
                    <Box className={classes.header}>
                        <Typography className={classes.HeaderTitle} align={'left'}>
                            Question 1
                        </Typography>
                        <Typography className={classes.HeaderText} align={'left'}>
                            {question}
                        </Typography>
                    </Box>
                    <Box className={classes.footer}>
                        {result.map((item, index) => {
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
                </Container>
            }
        </EventLayout>
    )
}

export default ChallengeQuestion
