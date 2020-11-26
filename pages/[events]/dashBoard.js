import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import UserContext from '../../hooks/userContext'
import Typography from '@material-ui/core/Typography'
import Router, { useRouter } from 'next/router'
import EventLayout from '../../components/ui/layout/eventLayout'
import Box from '@material-ui/core/Box'
import { ColorCard } from '../../components/ui/card/ColorCard'
import { CustomDisabledButton } from '../../components/ui/button/CustomDisabledButton'
import DashBoardChallengesProgress from '../../components/ui/progress/DashBoardChallengesProgress'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import GiftsBox from '../../components/gifts/giftsBox'
import giftsModal from '../../hoc/hasGiftsModal'
import { useImagesServices } from '../../hooks/useImagesServices'
import GiftResult from '../../components/gifts/giftResult'
import BackGroundDisplay from '../../components/ui/background/BackGroundDisplay'
import { useStylesGlobal } from '../../styles/jsx/global.style'
import { useStyles } from '../../styles/jsx/pages/dashBoard.style'
import AvatarEvent from '../../components/ui/avatar/avatarEvent'
import CardContent from '@material-ui/core/CardContent'
import DashBoardAdminToolBar from '../../components/ui/toolbar/DashBoardAdminToolBar'
import Slide from '@material-ui/core/Slide'

const PWAPrompt = dynamic(() => import('react-ios-pwa-prompt'), {
    ssr: false
})

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

    return (
        <EventLayout >
            {!(isLoading && isGlobalLoading) &&
            <Box className='content' >
                { user.isAdmin &&
                    <DashBoardAdminToolBar timeStampMode={timeStampMode} />
                }
                <Slide in={!isLoading} timeout={500} direction="down" mountOnEnter unmountOnExit>
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
                                <Typography variant='subtitle1' className={[classes.textRegularCenterBottom].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: uiElements.noMoreChallengesChunk }}>
                                </Typography>
                                <Typography variant='subtitle1' className={[classes.textRegularCenterBottom].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: uiElements.finalResultScoreChunk }} >
                                </Typography>
                            </React.Fragment>
                        }
                        {availableScores &&
                        <ColorCard>
                            <CardContent className={classes.cardContent}>
                                <Typography variant='h1' className={[classes.scoreChunkText].join(' ')}>
                                    {uiElements.scoreChunk}
                                </Typography>
                            </CardContent>
                        </ColorCard>
                        }
                        {availableResults &&
                        <ColorCard>
                            <CardContent className={classes.cardContent}>
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
                                <Typography variant='subtitle1' className={[classes.textRegularCenter].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: uiElements.challengesLeftChunk }} >
                                </Typography>
                            </CardContent>
                        </ColorCard>
                        }
                        <ColorCard>
                            <CardContent className={classes.cardContent}>
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
                            </CardContent>
                        </ColorCard>
                    </Box>
                </Slide>
                <Slide in={!isLoading} timeout={500} direction="up" mountOnEnter unmountOnExit>
                    <Box className={[stylesGlobal.bottomZoneGradient, 'bottomZoneDashboard'].join(' ')} >
                        <CustomDisabledButton color="secondary" variant="contained" className={'button'} onClick={startGame} disabled={!availableChallenges}>
                            {`${translation.dashBoardChallengesButton}`}
                        </CustomDisabledButton>
                    </Box>
                </Slide>
                <BackGroundDisplay addcolor={1} addblur={1} className={'background'} imageURL={imageURL} />
                <PWAPrompt
                    delay={2000}
                    copyTitle={`Ajouter ${events} sur votre page d'accueil`}
                    copyBody={'Ce site web dispose d\'une fonctionnalité d\'application. Ajoutez-la à votre écran d\'accueil pour l\'utiliser en plein écran et hors ligne'}
                    copyShareButtonLabel={'1) Appuyez sur le bouton "Partager" dans la barre de menu ci-dessous.'}
                    copyAddHomeButtonLabel={'2) Appuyez sur "Ajouter à l\'écran d\'accueil".'}
                    copyClosePrompt={'Annuler'}
                    timesToShow={20}
                    permanentlyHideOnDismiss={true}
                />
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
