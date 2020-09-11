import React, { createRef, useContext, useEffect, useState } from 'react'
import { useStyles } from '../../styles/dashBoard.style'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../../components/UserContext'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Router, { useRouter } from 'next/router'
import EventLayout from '../../components/eventLayout'
import Box from '@material-ui/core/Box'
import { ColorCardContent } from '../../components/ui/ColorCardContent'
import { ColorCard } from '../../components/ui/ColorCard'
import { CustomDisabledButton } from '../../components/ui/CustomDisabledButton'
import DashBoardChallengesProgress from '../../components/DashBoardChallengesProgress'
// import { ColorBorderButton } from '../../components/ui/ColorBorderButton'
import Fade from '@material-ui/core/Fade/Fade'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import { getTranslations } from '../../data/tools'
import { useImagesServices } from '../../hooks/useImagesServices'

function DashBoard (props) {
    const router = useRouter()
    const { eventData } = props
    const { events } = router.query
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [availableChallenges, setAvailableChallenges] = useState(true)
    const [translation, setTranslation] = useState([])
    const [gameStats, setGameStats] = useState({})
    const [progress, setProgress] = useState(0)
    const [preCaching, setPreCaching] = useState([])
    const isImagesPreLoaded = useImagesServices(preCaching)
    const [isPageReady, setPageReady] = useState(false)
    const { dataProvider, gameStatsService, store } = useContext(UserContext)
    const { setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading } = store
    const layoutRef = createRef()
    const theme = useTheme()

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventName: events })
            })
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
                gameStatsService.init(dataProvider)
                setPageReady(true)
            } else {
                await Router.push('/[events]', {
                    pathname: `/${events}`,
                    query: { modal: true }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    function initPage () {
        setProgress(gameStatsService.getProgress())
        setGameStats(dataProvider.getGameStats())
        setTranslation(dataProvider.getTranslation())
        setUser(dataProvider.getUser())
        setAvailableChallenges(dataProvider.hasAvailableChallenges())
        setLoading(false)
    }

    async function startGame () {
        await Router.push('/[events]/challenge', `/${events}/challenge`)
    }

    useEffect(() => {
        if (isPageReady) {
            setPreCaching(dataProvider.getGameStats())
        }
    }, [isPageReady])

    useEffect(() => {
        if (isImagesPreLoaded) {
            initPage()
        }
    }, [isImagesPreLoaded])

    // check if the page was reloaded and  fetchData
    useEffect(() => {
        if (isGlobalLoading) {
            setEventData(eventData.content)
            setEventName(events)
            dataProvider.setData(eventData.content)
            setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        }
        fetchData().then()
    }, [])

    // TODO : translation "pts"
    return (
        <EventLayout >
            {isLoading && isGlobalLoading
                ? null
                : <Box ref={layoutRef} className={'content'} >
                    <Box ref={layoutRef} className={'topZone'} >
                        <Fade in={!isLoading && !isGlobalLoading} timeout={1200}>
                            <Box className={classes.header}>
                                <Typography className={classes.HeaderTitle} align={'center'}>
                                    {translation.dashBoardHeadTitle}
                                </Typography>
                                <Typography className={classes.HeaderText} align={'center'}>
                                    {translation.dashBoardHeadText}
                                </Typography>
                            </Box>
                        </Fade>
                        <Fade in={!isLoading && !isGlobalLoading} timeout={1000}>
                            <ColorCard className={classes.card}>
                                <ColorCardContent className={classes.content}>
                                    <Box className={classes.cardHeader} style={{ backgroundColor: theme.palette.secondary.light }}>
                                        <Box className={classes.cardHeaderSide}>
                                            <Typography className={classes.cardHeaderLeftSideText}>
                                                <CheckIcon fontSize="small" className={classes.rateIcon} />
                                                {`${gameStats.successChallengesCount} ${getTranslations(gameStats.successChallengesCount, translation, 'good')}`}
                                            </Typography>
                                            <Typography className={classes.cardHeaderLeftSideText}>
                                                <CloseIcon fontSize="small" className={classes.rateIcon} />
                                                {`${gameStats.failedChallengesCount} ${getTranslations(gameStats.failedChallengesCount, translation, 'wrong')}`}
                                            </Typography>
                                        </Box>
                                        <Avatar className={classes.avatar} src={user.avatarURL} />
                                        <Box className={classes.cardHeaderSide}>
                                            <Typography className={classes.cardHeaderRightSideText}>
                                                {`${gameStats.currentScore} pts`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography className={classes.title}>
                                        {user.nickname}
                                    </Typography>
                                    <Box>
                                        <Typography className={classes.textRegularCenter}>
                                            {`${gameStats.totalChallengesCount} ${translation.dashBoardChallengesOfTheDay}`}
                                        </Typography>
                                        {availableChallenges
                                            ? <DashBoardChallengesProgress variant="determinate" progress={progress} />
                                            : <Box>
                                                <Typography className={classes.textRegularCenter}>
                                                    {`${translation.score} ${gameStats.currentScore}`}
                                                </Typography>
                                                <Typography className={classes.textRegularCenter}>
                                                    {`${translation.bestScore} ${gameStats.topScore}`}
                                                </Typography>
                                            </Box>
                                        }
                                    </Box>

                                </ColorCardContent>
                            </ColorCard>
                        </Fade>
                    </Box>
                    <Box ref={layoutRef} className={'bottomZone'} >
                        <Fade in={!isLoading && !isGlobalLoading} timeout={500}>
                            <Box className={classes.footer}>
                                {/* <ColorBorderButton variant="outlined" className={classes.button}> */}
                                {/*    {`${translation.dashBoardSharingButton}`} */}
                                {/* </ColorBorderButton> */}
                                <CustomDisabledButton color="primary" variant="contained" className={classes.button} onClick={startGame} disabled={!availableChallenges}>
                                    {`${translation.dashBoardChallengesButton}`}
                                </CustomDisabledButton>
                            </Box>
                        </Fade>
                    </Box>
                    <Box className={'backgroundGradientTopBottom'} />
                </Box>
            }
        </EventLayout>
    )
}
export default DashBoard

export async function getStaticPaths () {
    const paths = await getAllEvents()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const eventData = await getEventsData(params.events)
    return {
        props: {
            eventData
        }
    }
}
