import React, { createRef, useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Router, { withRouter } from 'next/router'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'
import { ColorButton } from '../components/ui/ColorButton'
import InnerHeightLayout from '../components/innerHeightLayout'
import { ColorCard } from '../components/ui/ColorCard'
import { ColorCardContent } from '../components/ui/ColorCardContent'
import { ColorCardActions } from '../components/ui/ColorCardAction'

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

    card: {
        minWidth: 275,
        minHeight: 200,
        margin: 20
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.75rem',
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem',
        textAlign: 'center',
        lineHeight: 1

    },
    secondCardTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem',
        lineHeight: 1,
        marginBottom: 10
    },
    secondCardSubTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1,125rem',
        lineHeight: 1,
        marginBottom: 10
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
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cardFooter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardHeaderSuccess: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    cardHeaderWrong: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        border: 'solid',
        borderColor: 'gray'
    },
    winPointText: {
        fontFamily: 'srgssr-type-Bd',
        color: 'black',
        fontSize: '2.5rem',
        padding: '6px 20px'
    }
})

function ChallengeResult (props) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [result, setResult] = useState({})
    const [gameBestScore, setGameBestScore] = useState(0)
    const [translation, setTranslation] = useState([])
    const { dataProvider, store } = useContext(UserContext)
    const { isLoading, setLoading } = store
    const layoutRef = createRef()

    async function fetchData () {
        try {
            const { challengeID } = dataProvider.getChallenge()
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
                console.log('ChallengeResult  fetchdata', content)
                setResult(content)
                initPage()
            } else {
                // TODO : manage response !== 200
                setLoading(true)
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
                ? null
                : <InnerHeightLayout ref={layoutRef} class={classes.containerGlobal} >
                    <ColorCard className={classes.card}>
                        <ColorCardContent className={classes.content}>
                            <Box className={classes.cardHeader}>
                                <Typography className={classes.cardHeaderSuccess}>
                                    {`${result.score.success} ${translation.good}`}
                                </Typography>
                                <Avatar className={classes.avatar} src={user.avatarURL}/>
                                <Typography className={classes.cardHeaderWrong}>
                                    {`${result.score.failure} ${translation.wrong}`}
                                </Typography>
                            </Box>
                            <Typography className={classes.title}>
                                {`${translation.challengeResultTitle} ${user.nickname}`}
                            </Typography>
                            <Typography className={classes.subTitle}>
                                {result.message}
                            </Typography>
                        </ColorCardContent>
                        <ColorCardActions className={classes.cardFooter}>
                            <Typography className={classes.winPointText}>

                                {result.hasAvailableChallenges
                                    ? result.success
                                        ? `+ ${result.points} pts`
                                        : `${result.points} pts`
                                    : `+ ${result.score.totalPoints} pts`
                                }

                            </Typography>
                        </ColorCardActions>
                    </ColorCard>
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
                                        {`${translation.score} ${result.score.totalPoints}`}
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
