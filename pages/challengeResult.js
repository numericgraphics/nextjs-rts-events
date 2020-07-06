import React, { createRef, useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Router, { withRouter } from 'next/router'
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
        fontSize: '1.75rem',
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem'
    },
    secondCardTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem'
    },
    secondCardSubTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1,125rem'
    },
    secondCardText: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1,125rem'
    },
    secondCardButton: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
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
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [result, setResult] = useState({})
    const [isLoading, setLoading] = useState(true)
    // const [userSuccess, setUserSuccess] = useState(0)
    // const [userErrors, setUserErrors] = useState(0)
    const [userScore, setUserScore] = useState(0)
    const [gameBestScore, setGameBestScore] = useState(0)
    const [translation, setTranslation] = useState([])
    const { dataProvider, scoreService } = useContext(UserContext)
    const layoutRef = createRef()

    async function fetchData () {
        try {
            const { challengeID } = dataProvider.getQuiz()
            const { answer } = props.router.query
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

        // TODO : Manage user result
        setUserScore(scoreService.getUserPoints())
        setGameBestScore(210)
    }

    async function continueGame () {
        await Router.push('/challengeQuestion')
    }

    async function gotoDashBoard () {
        await Router.push('/dashBoard')
    }

    useEffect(() => {
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
                        {result.hasAvailableChallenges
                            ? <Box>
                                <ColorButton variant="contained" className={classes.button} onClick={gotoDashBoard}>
                                    {translation.challengeResultButtonDashBoard}
                                </ColorButton>
                                <ColorButton variant="contained" className={classes.button} onClick={continueGame}>
                                    {translation.challengeResultButtonContinue}
                                </ColorButton>
                            </Box>
                            : <Card className={classes.card}>
                                <CardContent className={classes.content}>
                                    <Typography className={classes.secondCardTitle}>
                                        {translation.challengeResultInfoTitle}
                                    </Typography>
                                    <Typography className={classes.secondCardSubTitle}>
                                        {translation.challengeResultInfoText}
                                    </Typography>
                                    <Typography className={classes.secondCardText}>
                                        {`${translation.score} ${userScore}`}
                                    </Typography>
                                    <Typography className={classes.secondCardText}>
                                        {`${translation.bestScore} ${gameBestScore}`}
                                    </Typography>
                                    <ColorButton variant="contained" className={classes.secondCardButton} onClick={gotoDashBoard}>
                                        {translation.challengeResultButtonDashBoard}
                                    </ColorButton>
                                </CardContent>
                            </Card>
                        }
                    </Box>
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default withRouter(ChallengeResult)
