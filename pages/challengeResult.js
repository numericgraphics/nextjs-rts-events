import React, { useContext, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import Progress from '../components/progress'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'
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
    HeaderTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.25rem'
    },
    HeaderText: {
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
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [translation, setTranslation] = useState([])
    const { dataProvider } = useContext(UserContext)

    async function fetchData () {
        initPage()
        // try {
        //     const response = await fetch('/api/fetchGame')
        //
        //     if (response.status === 200) {
        //         const content = await response.json()
        //         dataProvider.setData(content)
        //         initPage()
        //     } else {
        //         await Router.push({
        //             pathname: '/',
        //             query: { modal: true }
        //         })
        //     }
        // } catch (error) {
        //     throw new Error(error.message)
        // }
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
        fetchData().then()
    }, [])

    return (
        <EventLayout>
            {isLoading
                ? <Progress/>
                : <Container className={classes.containerGlobal}>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <Avatar className={classes.avatar} src={user.avatarURL}/>
                            <Typography className={classes.title}>
                                {translation.challengeResultTitle}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Box className={classes.footer}>
                        $<ColorButton variant="contained" className={classes.button} onClick={gotoDashBoard}>
                            {translation.challengeResultButtonDashBoard}
                        </ColorButton>
                        <ColorButton variant="contained" className={classes.button} onClick={continueGame}>
                            {translation.challengeResultButtonContinue}
                        </ColorButton>
                    </Box>
                </Container>
            }
        </EventLayout>
    )
}

export default ChallengeResult
