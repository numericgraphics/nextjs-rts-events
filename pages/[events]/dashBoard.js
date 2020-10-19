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
    nickname: {
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
        marginRight: '0.2rem'
    },
    rateText: {
        alignSelf: 'left',
        textAlign: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreChunkText: {
        alignSelf: 'flex-end',
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
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    rateBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
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
    remainingTime: {
        color: theme.palette.secondary.contrastText
    },
    backgroudGradientTopBottom: {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, ' + theme.palette.secondary.dark + ' 100%)!important',
        zIndex: -1
    },
    cardContent: {
        margin: '0px!important',
        padding: '10px!important'
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
    const [availableScores, setAvailableScores] = useState(false)
    const [availableResults, setAvailableResults] = useState(false)
    const [translation, setTranslation] = useState([])
    const [uiElements, setUiElements] = useState({})
    const [progress, setProgress] = useState(0)
    const [gifts, setGifts] = useState()
    const [preCaching, setPreCaching] = useState([])
    const isImagesPreLoaded = useImagesServices(preCaching)
    const [imageURL, setImageURL] = useState()
    const { dataProvider, gameStatsService, uiElementsService, store } = useContext(UserContext)
    const { setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading } = store

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventName: events })
            })
            if (response.status === 200) {
                const content = await response.json()
                initGame(content)
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

    // initialize the all game, with user information, score,
    // result and start precaching service by sended gameStats with next imageChallengeUrl
    function initGame (content) {
        dataProvider.setData(content)
        gameStatsService.init(dataProvider)
        uiElementsService.init(dataProvider)
        setPreCaching(dataProvider.getGameStats())
    }

    function initPage () {
        setProgress(gameStatsService.getProgress())
        setUiElements(uiElementsService.getUiElements())
        setTranslation(dataProvider.getTranslation())
        setGifts(dataProvider.getGifts())
        setUser(dataProvider.getUser())
        setAvailableChallenges(dataProvider.hasAvailableChallenges())
        setAvailableScores(dataProvider.getGameStats().currentScore > 0)
        setAvailableResults(dataProvider.getGameStats().uiSumCount > 0)
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

    // after fetching, useImagesServices is running and initialize.
    useEffect(() => {
        if (isImagesPreLoaded.ready) {
            initPage()
        }
    }, [isImagesPreLoaded])

    // check if the page was reloaded and fetchData
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
            {!(isLoading && isGlobalLoading) &&
                <Box className='content' >
                    <Box className='topZoneDashboard' >
                        <Fade in={!isLoading} timeout={500}>
                            <Box>
                                <Box className={classes.header}>
                                    <Avatar className={classes.avatar} src={user.avatarURL}/>
                                    <Typography className={[classes.nickname, 'bold-1-75'].join(' ')}>
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
                                {availableScores &&
                                    <ColorCard className={classes.colorCard}>
                                        <ColorCardContent className={classes.cardContent}>
                                            <Typography className={[classes.scoreChunkText, 'bold-2-5'].join(' ')}>
                                                {uiElements.scoreChunk}
                                            </Typography>
                                        </ColorCardContent>
                                    </ColorCard>
                                }
                                {availableResults &&
                                    <ColorCard className={classes.colorCard}>
                                        <ColorCardContent className={classes.cardContent}>
                                            <Typography className={[classes.textRegularCenter, 'regular-1-50'].join(' ')}
                                                dangerouslySetInnerHTML={{ __html: uiElements.sumChunk }} >
                                            </Typography>
                                            <Box className={classes.rateBox}>
                                                <Box className={classes.goodRateBox}>
                                                    <CheckIcon fontSize="small" className={classes.rateIcon}/>
                                                    <Typography className={classes.rateText}>
                                                        {uiElements.successChunk}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.badRateBox}>
                                                    <CloseIcon fontSize="small" className={classes.rateIcon}/>
                                                    <Typography className={classes.rateText}>
                                                        {uiElements.failChunk}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </ColorCardContent>
                                    </ColorCard>
                                }
                                <ColorCard>
                                    <ColorCardContent className={classes.cardContent}>
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
                            </Box>
                        </Fade>
                    </Box>
                    <Box className={'bottomZoneDashboard'} >
                        <Fade in={!isLoading} timeout={500}>
                            <CustomDisabledButton color="primary" variant="contained" className={['bottomButton', 'bottom-1-rem'].join(' ')} onClick={startGame} disabled={!availableChallenges}>
                                {`${translation.dashBoardChallengesButton}`}
                            </CustomDisabledButton>
                        </Fade>
                    </Box>
                    {!isLoading && <Box className={'backgroundGradientTopBottom'} />}
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
