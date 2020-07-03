import React, { createRef, useContext, useEffect, useState } from 'react'
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
import InnerHeightLayout from '../components/innerHeightLayout'

const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'flex-start'
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
        fontSize: '1.25rem'
    }
})

function DashBoard (props) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [availableChallenges, setAvailableChallenges] = useState(true)
    const [translation, setTranslation] = useState([])
    const { dataProvider } = useContext(UserContext)
    const layoutRef = createRef()

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchGame')

            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
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

    function initPage () {
        setTranslation(dataProvider.getTranslation())
        setUser(dataProvider.getUser())
        setAvailableChallenges(dataProvider.hasAvailableChallenges())
        console.log('----', dataProvider.hasAvailableChallenges())
        setLoading(false)
    }

    async function startGame () {
        await Router.push('/challengeQuestion')
    }

    useEffect(() => {
        console.log('dataProvider', dataProvider)
        fetchData().then()
    }, [])

    return (
        <EventLayout>
            {isLoading
                ? <Progress/>
                : <InnerHeightLayout ref={layoutRef} class={classes.containerGlobal} >
                    <Box className={classes.header}>
                        <Typography className={classes.HeaderTitle} align={'center'}>
                            {translation.dashBoardHeadTitle}
                        </Typography>
                        <Typography className={classes.HeaderText} align={'center'}>
                            {translation.dashBoardHeadText}
                        </Typography>
                    </Box>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <Avatar className={classes.avatar} src={user.avatarURL}/>
                            <Typography className={classes.title}>
                                {user.nickname}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Box className={classes.footer}>
                        {availableChallenges
                            ? <ColorButton variant="contained" className={classes.button} onClick={startGame}>
                                {translation.dashBoardChallengesButton}
                            </ColorButton>
                            : null
                        }
                    </Box>
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default DashBoard
