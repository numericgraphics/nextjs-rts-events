import React, { createRef, useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Router, { useRouter } from 'next/router'
import Progress from '../components/progress'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'
import { ColorButton } from '../components/ui/ColorButton'
import InnerHeightLayout from '../components/innerHeightLayout'

const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'flex-start'
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
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.25rem'
    },
    subTitle: {
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
        fontSize: '1.25rem',
        marginTop: 10
    }
})

function ChallengeResult (props) {
    const router = useRouter()
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [answer, setAnswer] = useState({})
    const [result, setResult] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [translation, setTranslation] = useState([])
    const { dataProvider } = useContext(UserContext)
    const layoutRef = createRef()

    useEffect(() => {
        console.log('router useEffect')
        if (router && Object.entries(router.query).length > 0) {
            // TODO : manage answer is null or doesnt exist
            setAnswer(router.query.answer)
        }
    }, [router])

    async function fetchData () {
        try {
            const { challengeID } = dataProvider.getQuiz()
            const response = await fetch('/api/fetchQuizResult', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer, challengeID })
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
                setResult(content)
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

    function initPage () {
        setTranslation(dataProvider.getTranslation())
        setUser(dataProvider.getUser())
        setLoading(false)
    }

    async function continueGame () {
        await Router.push('/challengeQuestion')
    }

    async function gotoDashBoard () {
        await Router.push('/dashBoard')
    }

    useEffect(() => {
        console.log('init useEffect')
        fetchData().then()
    }, [])

    return (
        <EventLayout>
            {isLoading
                ? <Progress/>
                : <InnerHeightLayout ref={layoutRef} class={classes.containerGlobal} >
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <Avatar className={classes.avatar} src={user.avatarURL}/>
                            <Typography className={classes.title}>
                                {`${translation.challengeResultTitle} ${user.nickname}`}
                            </Typography>
                            <Typography className={classes.subTitle}>
                                {result.message}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Box className={classes.footer}>
                        <ColorButton variant="contained" className={classes.button} onClick={gotoDashBoard}>
                            {translation.challengeResultButtonDashBoard}
                        </ColorButton>
                        {result.hasAvailableChallenges
                            ? <ColorButton variant="contained" className={classes.button} onClick={continueGame}>
                                {translation.challengeResultButtonContinue}
                            </ColorButton>
                            : null
                        }
                    </Box>
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default ChallengeResult
