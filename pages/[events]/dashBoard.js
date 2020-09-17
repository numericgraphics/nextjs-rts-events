import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../../components/UserContext'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Router, { useRouter } from 'next/router'
import EventLayout from '../../components/eventLayout'
import Box from '@material-ui/core/Box'
import { ColorCardContent } from '../../components/ui/ColorCardContent'
import { ColorCard } from '../../components/ui/ColorCard'
import { CustomDisabledButton } from '../../components/ui/CustomDisabledButton'
import DashBoardChallengesProgress from '../../components/DashBoardChallengesProgress'
import Fade from '@material-ui/core/Fade/Fade'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import GiftsBox from '../../components/gifts/giftsBox'
import giftsModal from '../../hoc/hasGiftsModal'
import { useImagesServices } from '../../hooks/useImagesServices'
import GiftResult from '../../components/gifts/giftResult'

const useStyles = makeStyles({
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '10px 30px',
        maxHeight: 200,
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10
    },
    avatar: {
        width: '6rem',
        height: '6rem',
        zIndex: 2
    },
    rateIcon: {
        display: 'inline',
        width: '3vw',
        height: '3vw',
        minHeight: '15px',
        minWidth: '15px',
        maxHeight: '25px',
        maxWidth: '25px',
        marginRight: '0.1rem'
    },
    cardAvatarHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardAvatarHeaderData: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    cardAvatarHeaderBG: {
        position: 'absolute',
        width: '100%',
        height: '4rem',
        borderRadius: '10px',
        zIndex: 1
    },
    cardFooter: {
        width: '100%'
    },
    cardHeaderSide: {
        flex: 1,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardHeaderLeftSideText: {
        alignSelf: 'left',
        textAlign: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    cardHeaderRightSideText: {
        alignSelf: 'flex-end'
    },
    textRegularCenter: {
        textAlign: 'center'
    },
    textRegularCenterOverlay: {
        position: 'absolute',
        zIndex: 2,
        textAlign: 'center'
    },
    progressBarOverlay: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function DashBoard (props) {
    const router = useRouter()
    const { eventData } = props
    const { events } = router.query
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [availableChallenges, setAvailableChallenges] = useState(true)
    const [translation, setTranslation] = useState([])
    const [gameStats, setGameStats] = useState({})
    const [uiElements, setUiElements] = useState({})
    const [progress, setProgress] = useState(0)
    const [gifts, setGifts] = useState()
    const [preCaching, setPreCaching] = useState([])
    const isImagesPreLoaded = useImagesServices(preCaching)
    const [isPageReady, setPageReady] = useState(false)
    const { dataProvider, gameStatsService, uiElementsService, store } = useContext(UserContext)
    const { setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading } = store
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
                uiElementsService.init(dataProvider)
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
        setUiElements(uiElementsService.getUiElements())
        setTranslation(dataProvider.getTranslation())
        setGifts(dataProvider.getGifts())
        setUser(dataProvider.getUser())
        setAvailableChallenges(dataProvider.hasAvailableChallenges())
        setLoading(false)
    }

    async function startGame () {
        await Router.push('/[events]/challenge', `/${events}/challenge`)
    }

    function onStart () {
        props.openModal()
    }

    function setGift (gift) {
        props.setGift(gift)
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
                : <Box className='content' >
                    <Box className='topZone' >
                        <Fade in={!isLoading && !isGlobalLoading} timeout={1200}>
                            <Box className={classes.header}>
                                <Typography className={['bold-1-25', 'color-White', 'lineSpacing-1-2', 'bottom-0-5-rem'].join(' ')} align={'center'}>
                                    {translation.dashBoardHeadTitle}
                                </Typography>
                                <Typography className={['regular-1', 'color-White'].join(' ')} align={'center'}>
                                    {translation.dashBoardHeadText}
                                </Typography>
                            </Box>
                        </Fade>
                        <Fade in={!isLoading && !isGlobalLoading} timeout={1000}>
                            <ColorCard>
                                <ColorCardContent className='cardContent'>
                                    <Box className={classes.cardAvatarHeader} >
                                        <Box className={[classes.cardAvatarHeaderData, 'bottom-1-rem'].join(' ')} >
                                            <Box className={classes.cardHeaderSide}>
                                                <Typography className={[classes.cardHeaderLeftSideText, 'regular-0-825'].join(' ')}>
                                                    <CheckIcon className={classes.rateIcon} />
                                                    {uiElements.successChunk}
                                                </Typography>
                                                <Typography className={[classes.cardHeaderLeftSideText, 'regular-0-825'].join(' ')}>
                                                    <CloseIcon className={classes.rateIcon} />
                                                    {uiElements.failChunk}
                                                </Typography>
                                            </Box>
                                            <Avatar className={classes.avatar} src={user.avatarURL}/>
                                            <Box className={classes.cardAvatarHeaderBG} style={{ backgroundColor: theme.palette.secondary.light }}/>
                                            <Box className={classes.cardHeaderSide}>
                                                <Typography className={[classes.cardHeaderRightSideText, 'bold-1-5'].join(' ')}>
                                                    {uiElements.scoreChunk}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography className={[classes.title, 'bold-1-75'].join(' ')}>
                                        {user.nickname}
                                    </Typography>
                                    <Box className={classes.cardFooter}>
                                        {availableChallenges
                                            ? <Box className={classes.progressBarOverlay}>
                                                <Typography className={[classes.textRegularCenterOverlay, 'regular-1-125'].join(' ')}>
                                                    {uiElements.progressBarMessageChunk}
                                                </Typography>
                                                <DashBoardChallengesProgress variant="determinate" progress={progress} />
                                            </Box>
                                            : <React.Fragment>
                                                <Typography className={[classes.textRegularCenter, 'regular-1-1'].join(' ')}>
                                                    {`${gameStats.totalChallengesCount} ${translation.dashBoardChallengesOfTheDay}`}
                                                </Typography>
                                                <Typography className={[classes.textRegularCenter, 'regular-1-1'].join(' ')}>
                                                    {`${translation.score} ${gameStats.currentScore}`}
                                                </Typography>
                                                <Typography className={[classes.textRegularCenter, 'regular-1-1'].join(' ')}>
                                                    {`${translation.bestScore} ${gameStats.topScore}`}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    </Box>
                                    { gifts && gifts.length === 1
                                        ? <GiftResult
                                            translation={translation.challengeResultGiftText}
                                            gift={gifts}
                                            onClick={onStart}
                                            setGift={setGift} />
                                        : <GiftsBox
                                            gifts={gifts}
                                            translation={translation.dashBoardGiftTitle}
                                            onClick={onStart}
                                            setGift={setGift} />
                                    }
                                </ColorCardContent>
                            </ColorCard>
                        </Fade>
                    </Box>
                    <Box className={'bottomZone'} >
                        <Fade in={!isLoading && !isGlobalLoading} timeout={500}>
                            {/* <ColorBorderButton variant="outlined" className={classes.button}> */}
                            {/*    {`${translation.dashBoardSharingButton}`} */}
                            {/* </ColorBorderButton> */}
                            <CustomDisabledButton color="primary" variant="contained" className={['bottomButton', 'bottom-1-rem'].join(' ')} onClick={startGame} disabled={!availableChallenges}>
                                {`${translation.dashBoardChallengesButton}`}
                            </CustomDisabledButton>
                        </Fade>
                    </Box>
                    {(!isLoading && !isGlobalLoading) && <Box className={'backgroundGradientTopBottom'} />}
                </Box>
            }
        </EventLayout>
    )
}
export default giftsModal(DashBoard)

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
