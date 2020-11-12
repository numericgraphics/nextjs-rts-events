import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../hooks/userContext'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Router, { useRouter } from 'next/router'
import EventLayout from '../../components/eventLayout'
import Box from '@material-ui/core/Box'
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
import { useStylesGlobal } from '../../styles/global.style'
import AvatarEvent from '../../components/avatarEvent'
import CardContent from '@material-ui/core/CardContent'
// import { DatePicker } from '@material-ui/pickers'

const useStyles = makeStyles((theme = useTheme) => ({
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 2rem',
        textAlign: 'center',
        alignItems: 'center'
    },
    nickname: {
        textAlign: 'center',
        marginBottom: '0.5rem',
        color: theme.palette.primary.contrastText
    },
    rateIcon: {
        display: 'inline',
        width: '1rem',
        height: '1rem',
        marginRight: '0.2rem',
        color: '#FFF!important'
    },
    rateText: {
        alignSelf: 'left',
        textAlign: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF!important'
    },
    scoreChunkText: {
        alignSelf: 'flex-end',
        textAlign: 'center',
        width: '100%',
        color: theme.palette.primary.contrastText
    },
    textRegularCenter: {
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        marginBottom: '0.5rem'
    },
    textRegularCenterOverlay: {
        position: 'absolute',
        zIndex: 2,
        textAlign: 'center',
        color: theme.palette.primary.contrastText
    },
    progressBarOverlay: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '0.8rem',
        marginBottom: '0.8rem'
    },
    rateBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '0.8rem'
    },
    goodRateBox: {
        width: '50%',
        backgroundColor: '#00B445',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.2rem',
        borderBottomLeftRadius: '0.6rem',
        borderTopLeftRadius: '0.6rem'
    },
    badRateBox: {
        width: '50%',
        backgroundColor: '#FF0000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.2rem',
        borderBottomRightRadius: '0.6rem',
        borderTopRightRadius: '0.6rem'
    },
    colorCard: {
        marginBottom: '0.4rem',
        borderRadius: '0.5rem'
    },
    remainingTime: {
        color: theme.palette.primary.contrastText,
        marginBottom: '0.8rem'
    },
    cardContent: {
        margin: '0!important'
    },
    adminToolbar: {
        position: 'absolute',
        zIndex: 9999999999,
        top: 5,
        left: 5,
        backgroundColor: 'red',
        opacity: 0.8,
        padding: '2px 5px',
        boxShadow: '0px 0px 7px 2px #000000'
    }
}))

function DashBoard (props) {
    const stylesGlobal = useStylesGlobal()
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
    const { setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading, timeStampMode, setTimeStampMode } = store
    // const [selectedDate, handleDateChange] = useState(new Date());

    async function fetchData () {
        try {
            // const params = (new URL(document.location)).searchParams
            // const date = params.get('date') ? params.get('date') : null
            // const time = params.get('time') ? params.get('time') : null
            const bodyContent = (timeStampMode.enable) ? { eventName: events, date: timeStampMode.date, time: timeStampMode.time } : { eventName: events }
            const response = await fetch('/api/fetchGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                const content = await response.json()
                initGame(content)
            } else {
                setTimeStampMode({ enable: false })
                await Router.push('/[events]', {
                    pathname: `/${events}`,
                    query: { modal: true }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function resetGame () {
        try {
            alert('Will try to reset Game')
            const bodyContent = { eventName: events }
            const response = await fetch('/api/resetGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                alert('Game reseted')
            } else {
                alert('Could not reset game')
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
            dataProvider.setEventData(eventData.content)
            setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        } else {
            fetchData().then()
        }
    }, [isGlobalLoading])

    /* useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate]) */

    return (
        <EventLayout >
            {!(isLoading && isGlobalLoading) &&
            <Box className='content' >
                { user.isAdmin &&
                <React.Fragment>
                    <Box className={[classes.adminToolbar].join(' ')}>ADMIN <a href="#" onClick={resetGame} >reset game</a></Box>
                    {/* <DatePicker
                        disableFuture
                        openTo="year"
                        format="dd/MM/yyyy"
                        label="Date of birth"
                        views={['year', 'month', 'date']}
                        value={selectedDate}
                        onChange={handleDateChange}
                     /> */}
                </React.Fragment>
                }
                <Fade in={!isLoading} timeout={500}>
                    <Box className='topZoneDashboard' >
                        <Box className={classes.header}>
                            <AvatarEvent user={user.avatarURL} />
                            <Typography variant="h2" className={[classes.nickname].join(' ')}>
                                {user.nickname}
                            </Typography>
                            <Typography
                                variant='subtitle1'
                                className={[classes.remainingTime].join(' ')}
                                align={'center'}
                                dangerouslySetInnerHTML={{ __html: translation.dashBoardHeadText }} />
                        </Box>
                        {availableChallenges
                            ? <Box className={classes.progressBarOverlay}>
                                <Typography variant='subtitle1' className={[classes.textRegularCenterOverlay].join(' ')}>
                                    {uiElements.progressBarMessageChunk}
                                </Typography>
                                <DashBoardChallengesProgress variant="determinate" progress={progress} />
                            </Box>
                            : <React.Fragment>
                                <Typography variant='subtitle1' className={[classes.textRegularCenter].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: uiElements.noMoreChallengesChunk }}>
                                </Typography>
                                <Typography variant='subtitle1' className={[classes.textRegularCenter].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: uiElements.finalResultScoreChunk }} >
                                </Typography>
                            </React.Fragment>
                        }
                        {availableScores &&
                        <ColorCard className={classes.colorCard}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant='h1' className={[classes.scoreChunkText].join(' ')}>
                                    {uiElements.scoreChunk}
                                </Typography>
                            </CardContent>
                        </ColorCard>
                        }
                        {availableResults &&
                        <ColorCard className={classes.colorCard}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant='subtitle1' className={[classes.textRegularCenter].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: uiElements.sumChunk }} >
                                </Typography>
                                <Box className={classes.rateBox}>
                                    <Box className={classes.goodRateBox}>
                                        <CheckIcon fontSize="small" className={classes.rateIcon} />
                                        <Typography variant="subtitle2" className={[classes.rateText].join(' ')}>
                                            {uiElements.successChunk}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.badRateBox}>
                                        <CloseIcon fontSize="small" className={classes.rateIcon} />
                                        <Typography variant="subtitle2" className={[classes.rateText].join(' ')}>
                                            {uiElements.failChunk}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </ColorCard>
                        }
                        <ColorCard className={classes.colorCard}>
                            <CardContent className={classes.cardContent}>
                                <Box className={classes.giftContent}>
                                    {gifts && gifts.length === 1
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
                                </Box>
                            </CardContent>
                        </ColorCard>
                    </Box>
                </Fade>
                <Fade in={!isLoading} timeout={500}>
                    <Box className={[stylesGlobal.bottomZoneGradient, 'bottomZoneDashboard'].join(' ')} >
                        <CustomDisabledButton color="secondary" variant="contained" className={'button'} onClick={startGame} disabled={!availableChallenges}>
                            {`${translation.dashBoardChallengesButton}`}
                        </CustomDisabledButton>
                    </Box>
                </Fade>
                <LazyImage addcolor={1} addblur={1} className={'background'} style={{ backgroundImage: `url(${imageURL})` }} />
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
        },
        revalidate: 1
    }
}
