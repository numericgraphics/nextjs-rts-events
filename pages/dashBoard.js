import React, { createRef, useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'
import InnerHeightLayout from '../components/innerHeightLayout'
import { ColorCardContent } from '../components/ui/ColorCardContent'
import { ColorCard } from '../components/ui/ColorCard'
import LazyImage from '../components/ui/LazyImage'
import { useHeight } from '../hooks/useHeight'
import { CustomDisabledButton } from '../components/ui/CustomDisabledButton'
import DashBoardChallengesProgress from '../components/DashBoardChallengesProgress'
import { ColorBorderButton } from '../components/ui/ColorBorderButton'

const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'flex-start'
    },
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '10px 30px',
        maxHeight: 200,
        zIndex: 2,
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 50,
        zIndex: 2,
        textAlign: 'center'
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.75rem',
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10
    },
    avatar: {
        width: 100,
        height: 100,
        border: 'solid',
        borderColor: 'gray'
    },
    cardHeader: {
        width: '90%',
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
    cardHeaderSide: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardHeaderLeftSideText: {
        alignSelf: 'left',
        textAlign: 'left',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '0.8rem'
    },
    cardHeaderRightSideText: {
        alignSelf: 'flex-end',
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem'
    },
    textRegularCenter: {
        textAlign: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.1rem'
    },
    card: {
        zIndex: 2,
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
        width: '80vw',
        padding: '6px 20px',
        marginTop: 10,
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem'
    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%)'
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
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        backgroundColor: 'white'
    }
}

function DashBoard (props) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [availableChallenges, setAvailableChallenges] = useState(true)
    const [translation, setTranslation] = useState([])
    const [imageURL, setImageURL] = useState()
    const [score, setScore] = useState({})
    const [challenges, setChallenges] = useState([])
    const [remainingChallenges, setRemainingChallenges] = useState(0)
    const { dataProvider, scoreService, store } = useContext(UserContext)
    const { isLoading, setLoading } = store
    const layoutRef = createRef()
    const height = useHeight()

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchGame')
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
                scoreService.init(dataProvider)
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
        setRemainingChallenges(scoreService.getRemainingChallengesByPercent())
        setChallenges(scoreService.getChallenges().length)
        setScore(dataProvider.getScore())
        setImageURL(dataProvider.getTheme().backgroundImageURL)
        setTranslation(dataProvider.getTranslation())
        setUser(dataProvider.getUser())
        setAvailableChallenges(dataProvider.hasAvailableChallenges())
        setLoading(false)
    }

    async function startGame () {
        await Router.push('/challenge')
    }

    useEffect(() => {
        fetchData().then()
    }, [])

    // TODO : remove this local translation
    useEffect(() => {
        translation.bestScore = 'Meilleur score:'
        score.bestScore = 2000
    }, [translation, score])

    return (
        <EventLayout>
            {isLoading
                ? null
                : <InnerHeightLayout ref={layoutRef} class={classes.containerGlobal} >
                    <Box className={classes.header}>
                        <Typography className={classes.HeaderTitle} align={'center'}>
                            {translation.dashBoardHeadTitle}
                        </Typography>
                        <Typography className={classes.HeaderText} align={'center'}>
                            {translation.dashBoardHeadText}
                        </Typography>
                    </Box>
                    <ColorCard className={classes.card}>
                        <ColorCardContent className={classes.content}>
                            <Box className={classes.cardHeader}>
                                <Box className={classes.cardHeaderSide}>
                                    <Typography className={classes.cardHeaderLeftSideText}>
                                        {`${score.success} ${translation.good}`}
                                    </Typography>
                                    <Typography className={classes.cardHeaderLeftSideText}>
                                        {`${score.failure} ${translation.wrong}`}
                                    </Typography>
                                </Box>
                                <Avatar className={classes.avatar} src={user.avatarURL}/>
                                <Box className={classes.cardHeaderSide}>
                                    <Typography className={classes.cardHeaderRightSideText}>
                                        {`${score.totalPoints} pts`}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography className={classes.title}>
                                {user.nickname}
                            </Typography>
                            <Box>
                                <Typography className={classes.textRegularCenter}>
                                    {`${challenges} ${translation.dashBoardChallengesOfTheDay}`}
                                </Typography>
                                {availableChallenges
                                    ? <DashBoardChallengesProgress variant="determinate" progress={remainingChallenges} />
                                    : <Box>
                                        <Typography className={classes.textRegularCenter}>
                                            {`${translation.score} ${score.totalPoints}`}
                                        </Typography>
                                        <Typography className={classes.textRegularCenter}>
                                            {`${translation.bestScore} ${score.bestScore}`}
                                        </Typography>
                                    </Box>
                                }
                            </Box>

                        </ColorCardContent>
                    </ColorCard>
                    <Box className={classes.footer}>
                        <ColorBorderButton variant="outlined" className={classes.button}>
                            {translation.dashBoardSharingButton}
                        </ColorBorderButton>
                        <CustomDisabledButton color="primary" variant="contained" className={classes.button} onClick={startGame} disabled={!availableChallenges}>
                            {translation.dashBoardChallengesButton}
                        </CustomDisabledButton>
                    </Box>
                    <Box className={classes.gradient}/>
                    <LazyImage style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})`, minHeight: height }}/>
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default DashBoard
