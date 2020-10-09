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
import LazyImage from '../../components/ui/LazyImage'
// import { ImportantDevices } from '@material-ui/icons'

const useStyles = makeStyles((theme = useTheme) => ({
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0px 30px',
        maxHeight: 200,
        textAlign: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10,
        color: theme.palette.secondary.contrastText
    },
    avatar: {
        width: '6rem',
        height: '6rem',
        marginBottom: 10,
        zIndex: 2
    },
    rateIcon: {
        display: 'inline',
        width: '1rem',
        height: '1rem',
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardHeaderRightSideText: {
        alignSelf: 'flex-end',
        lineHeight: '1.5rem',
        textAlign: 'center',
        width: '100%',
        color: theme.palette.secondary.contrastText
    },
    textRegularCenter: {
        textAlign: 'center',
        color: theme.palette.secondary.contrastText
    },
    textRegularCenterOverlay: {
        position: 'absolute',
        zIndex: 2,
        textAlign: 'center',
        color: theme.palette.secondary.contrastText
    },
    progressBarOverlay: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerScore: {
        height: 30,
        width: '100%'
    },
    scoreCardContent: {

    },
    rateBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    goodRateBox: {
        width: '50%',
        backgroundColor: '#00B445',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badRateBox: {
        width: '50%',
        backgroundColor: '#FF0000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    colorCard: {
        marginBottom: 5
    },
    bottomBtnDashboard: {
        position: 'fixed',
        bottom: 20
    },
    backgroundBlur: {
        background: theme.palette.secondary.main + '9e',
        backdropFilter: 'blur(4px)',
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: '-1'
    },
    remainingTime: {
        color: theme.palette.secondary.contrastText
    }
}))
const styles = {
    containerImage: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%'
    }
}

function DashBoard (props) {
    const router = useRouter()
    const { eventData } = props
    const { events } = router.query
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [availableChallenges, setAvailableChallenges] = useState(true)
    const [translation, setTranslation] = useState([])
    const [uiElements, setUiElements] = useState({})
    const [progress, setProgress] = useState(0)
    const [gifts, setGifts] = useState()
    const [preCaching, setPreCaching] = useState([])
    const isImagesPreLoaded = useImagesServices(preCaching)
    const [isPageReady, setPageReady] = useState(false)
    const [imageURL, setImageURL] = useState()
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
        setUiElements(uiElementsService.getUiElements())
        setTranslation(dataProvider.getTranslation())
        setGifts(dataProvider.getGifts())
        setUser(dataProvider.getUser())
        setAvailableChallenges(dataProvider.hasAvailableChallenges())
        setImageURL(ThemeFactory.getBackgroundImageURL())
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

    return (
        <EventLayout >
            {isLoading && isGlobalLoading
                ? null
                : <Box className='content' >
                    <Box className='topZone' >
                        <Fade in={!isLoading && !isGlobalLoading} timeout={1200}>
                            <React.Fragment>
                                <Box className={classes.header}>
                                    <Avatar className={classes.avatar} src={user.avatarURL}/>
                                    <Typography className={[classes.title, 'bold-1-75'].join(' ')}>
                                        {user.nickname}
                                    </Typography>
                                    <Typography
                                        className={[classes.remainingTime, 'regular-1', 'lineSpacing-1-2'].join(' ')}
                                        align={'center'}
                                        dangerouslySetInnerHTML={{ __html: translation.dashBoardHeadText }}/>
                                </Box>
                                {availableChallenges
                                    ? <Box className={classes.progressBarOverlay}>
                                        <Typography className={[classes.textRegularCenterOverlay, 'regular-1-125'].join(' ')}>
                                            {uiElements.progressBarMessageChunk}
                                        </Typography>
                                        <DashBoardChallengesProgress variant="determinate" progress={progress} />
                                    </Box>
                                    : <React.Fragment>
                                        <Typography className={[classes.textRegularCenter, 'regular-1-1'].join(' ')}
                                            dangerouslySetInnerHTML={{ __html: uiElements.noMoreChallengesChunk }}>
                                        </Typography>
                                        <Typography className={[classes.textRegularCenter, 'regular-1-1'].join(' ')}
                                            dangerouslySetInnerHTML={{ __html: uiElements.finalResultScoreChunk }} >
                                        </Typography>
                                    </React.Fragment>
                                }
                                <ColorCard className={classes.colorCard}>
                                    <ColorCardContent className={classes.scoreCardContent}>
                                        <Typography className={[classes.cardHeaderRightSideText, 'bold-2-5'].join(' ')}>
                                            {uiElements.scoreChunk}
                                        </Typography>
                                    </ColorCardContent>
                                </ColorCard>
                                <ColorCard className={classes.colorCard}>
                                    <ColorCardContent className={classes.rateCardContent}>
                                        <Typography className={[classes.textRegularCenter, 'regular-1-50'].join(' ')}
                                            dangerouslySetInnerHTML={{ __html: uiElements.sumChunk }} >
                                        </Typography>
                                        <Box className={classes.rateBox}>
                                            <Box className={classes.goodRateBox}>
                                                <CheckIcon fontSize="small" className={classes.rateIcon}/>
                                                <Typography className={classes.cardHeaderLeftSideText}>
                                                    {uiElements.successChunk}
                                                </Typography>
                                            </Box>
                                            <Box className={classes.badRateBox}>
                                                <CloseIcon fontSize="small" className={classes.rateIcon}/>
                                                <Typography className={classes.cardHeaderLeftSideText}>
                                                    {uiElements.failChunk}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </ColorCardContent>
                                </ColorCard>
                            </React.Fragment>
                        </Fade>
                        <Fade in={!isLoading && !isGlobalLoading} timeout={1000}>
                            <ColorCard>
                                <ColorCardContent className='cardContent'>
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
                    <Box className={'bottomZoneDashboard'} >
                        <Fade in={!isLoading && !isGlobalLoading} timeout={500}>
                            {/* <ColorBorderButton variant="outlined" className={classes.button}> */}
                            {/*    {`${translation.dashBoardSharingButton}`} */}
                            {/* </ColorBorderButton> */}
                            <CustomDisabledButton color="primary" variant="contained" className={[classes.bottomBtnDashboard, 'bottomButton', 'bottom-1-rem'].join(' ')} onClick={startGame} disabled={!availableChallenges}>
                                {`${translation.dashBoardChallengesButton}`}
                            </CustomDisabledButton>
                        </Fade>
                    </Box>
                    {(!isLoading && !isGlobalLoading) && <Box className={classes.backgroundBlur} />}
                    <LazyImage className='background' style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})` }}/>
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
