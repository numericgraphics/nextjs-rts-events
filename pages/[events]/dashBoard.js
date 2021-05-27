import React, { createRef, useContext, useEffect, useState } from 'react'
import { isSafari, isMobile, isIOS } from 'react-device-detect'
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
import Gift from '../../components/gifts/gift'
import { useImagesServices } from '../../hooks/useImagesServices'
import GiftResult from '../../components/gifts/giftResult'
import CommunityDashboardWidget from '../../components/community/communityDashboardWidget'
import BackGroundDisplay from '../../components/ui/background/BackGroundDisplay'
import { useStylesGlobal } from '../../styles/jsx/global.style'
import { useStyles } from '../../styles/jsx/pages/dashBoard.style'
import AvatarEvent from '../../components/ui/avatar/avatarEvent'
import CardContent from '@material-ui/core/CardContent'
import DashBoardAdminToolBar from '../../components/ui/toolbar/DashBoardAdminToolBar'
import Slide from '@material-ui/core/Slide'
import HasTypeFormModal from '../../hoc/hasTypeFormModal'
import GenericModal from '../../components/ui/modal/genericModal'
import EndgameInformation from '../../components/dashboard/endGameInformation'
import DesktopReco from '../../components/dashboard/desktopReco'
import Profile from '../../components/dashboard/profile'
import ButtonBase from '@material-ui/core/ButtonBase'
import MapModal from '../../components/map/MapModal'
import DailyPromoModal from '../../components/dashboard/DailyPromoModal'

const PWAPrompt = dynamic(() => import('react-ios-pwa-prompt'), {
    ssr: false
})

export const ModalStates = Object.freeze({
    GIFT: 'gift',
    END_GAME: 'endGame',
    PROFILE: 'profile',
    MESSAGE: 'message',
    DESKTOP_RECO: 'desktopReco',
    WIN: 'win',
    MAP: 'map',
    DAILYPROMO: 'dailypromo'
})

function DashBoard (props) {
    const stylesGlobal = useStylesGlobal()
    const router = useRouter()
    const { eventData } = props
    const { events } = router.query
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [dailyPromo, setDailyPromo] = useState(null)
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
    const { locale, setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading, timeStampMode, setTimeStampMode } = store
    const [gameStats, setGameStats] = useState()
    const [open, setOpen] = useState(false)
    const [gift, setGift] = useState({ description: '', title: '', locked: true })
    const [modalState, setModalState] = useState(ModalStates.GIFT)
    const [openFeedback, setOpenFeedback] = useState(false)
    const modalGiftRef = createRef()
    const modalEndGameRef = createRef()
    const modalMapRef = createRef()
    const modalProfilRef = createRef()
    let timeout

    function shareClick () {
        if (navigator.share) {
            console.log(navigator)
            navigator.share({
                title: 'web.dev',
                text: 'Check out web.dev.',
                url: 'https://web.dev/'
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error))
        } else {
            console.log('cant share')
        }
    }

    async function fetchData () {
        try {
            const bodyContent = { eventName: events, locale, ...(timeStampMode.enable && { date: timeStampMode.date, time: timeStampMode.time }) }
            const response = await fetch('/api/fetchGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                const content = await response.json()
                console.log(content)
                content.dailyElements && setDailyPromo(content.dailyElements)
                content.dailyElements && onOpenModal(ModalStates.DAILYPROMO)
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

    function onOpenModal (state) {
        setModalState(state)
        setOpen(true)
    }

    // initialize the all game, with user information, score,
    // result and start precaching service by sended gameStats with next imageChallengeUrl
    function initGame (content) {
        dataProvider.setData(content)
        gameStatsService.init(dataProvider)
        uiElementsService.init(dataProvider)
        setPreCaching([dataProvider.getGameStats(), dataProvider.getGifts()])
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
        setGameStats(dataProvider.getGameStats())
        setLoading(false)
    }

    async function startGame () {
        await Router.push('/[events]/challenge', `/${events}/challenge`)
    }

    function onProfileClick () {
        onOpenModal(ModalStates.PROFILE)
    }

    function closeModal () {
        setOpen(false)
    }

    function onClickFeedback () {
        closeModal()
        setOpenFeedback(!openFeedback)
    }

    function getModalContent () {
        switch (modalState) {
        case ModalStates.GIFT:
            return <Gift
                ref={modalGiftRef}
                gift={gift}
                handleClose={closeModal}
                open={open}
            />
        case ModalStates.END_GAME:
            return <EndgameInformation
                ref={modalEndGameRef}
                uiElements={uiElements}
                translation={translation}
                handleClose={closeModal}
                handleOpenTypeForm={onClickFeedback}
                open={open}
                gameStats={gameStats}
            />
        case ModalStates.PROFILE:
            return <Profile
                ref={modalProfilRef}
                handleClose={closeModal}
                open={open}
            />
        case ModalStates.DESKTOP_RECO:
            return <DesktopReco
                handleClose={closeModal}
                open={open}
            />
        case ModalStates.MAP:
            return <MapModal
                defi={gameStats.currentRecoComID}
                ref={modalMapRef}
                handleClose={closeModal}
                open={open}/>
        case ModalStates.DAILYPROMO:
            return <DailyPromoModal
                dailyPromo={dailyPromo}
                ref={modalMapRef}
                handleClose={closeModal}
                open={open}/>
        }
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    /*
     Photo challenge can be available in mobile devices.
      we need to check : availableChallengesCount,
      availableChallenges state (dataprovider) deliver available challenge by platform,
     */
    useEffect(() => {
        if (!availableChallenges) {
            timeout = setTimeout(() => {
                gameStats.availableChallengesCount > 0 ? onOpenModal(ModalStates.DESKTOP_RECO) : onOpenModal(ModalStates.END_GAME)
            }, 1000)
        }
    }, [availableChallenges])

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
        <React.Fragment>
            { openFeedback && <HasTypeFormModal
                gameStats={gameStats}
                setOpenFeedback={setOpenFeedback}/> }
            <EventLayout >
                {!(isLoading && isGlobalLoading) &&
            <Box className='content' >
                { user.isAdmin &&
                    <DashBoardAdminToolBar timeStampMode={timeStampMode} />
                }
                <Slide
                    in={!isLoading}
                    timeout={500}
                    direction="down"
                    mountOnEnter
                    unmountOnExit
                >
                    <Box className='topZoneDashboard' >
                        <Box className={classes.header}>
                            <ButtonBase
                                className={classes.avatarButton}
                                onClick={onProfileClick}>
                                <AvatarEvent user={user.avatarURL} />
                            </ButtonBase>
                            <ButtonBase
                                onClick={onProfileClick}
                            >
                                <Typography
                                    variant="h2"
                                    className={[classes.nickname].join(' ')}>
                                    {user.nickname}
                                </Typography>
                            </ButtonBase>
                            <Typography
                                variant='subtitle1'
                                className={[classes.remainingTime].join(' ')}
                                align={'center'}
                                dangerouslySetInnerHTML={{ __html: translation.dashBoardHeadText }} />
                        </Box>
                        {availableChallenges &&
                            <Box className={classes.progressBarOverlay}>
                                <Typography
                                    variant='subtitle1'
                                    className={[classes.textRegularCenterOverlay].join(' ')}>
                                    {uiElements.progressBarMessageChunk}
                                </Typography>
                                <DashBoardChallengesProgress
                                    variant="determinate"
                                    progress={progress} />
                            </Box>
                        }
                        {availableScores &&
                        <ColorCard>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    variant='h1'
                                    className={[classes.scoreChunkText].join(' ')}>
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
                                        <CheckIcon
                                            fontSize="small"
                                            className={classes.rateIcon}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            className={[classes.rateText].join(' ')}>
                                            {uiElements.successChunk}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.badRateBox}>
                                        <CloseIcon
                                            fontSize="small"
                                            className={classes.rateIcon}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            className={[classes.rateText].join(' ')}>
                                            {uiElements.failChunk}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography
                                    variant='subtitle1'
                                    className={[classes.textRegularCenter].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: uiElements.challengesLeftChunk }} />
                            </CardContent>
                        </ColorCard>
                        }
                        <ColorCard>
                            <CardContent className={classes.cardContent}>
                                {gifts && gifts.length === 1
                                    ? <GiftResult
                                        translation={translation.challengeResultGiftText}
                                        gift={gifts}
                                        onClick={() => onOpenModal(ModalStates.GIFT)}
                                        setGift={setGift} />
                                    : <GiftsBox
                                        gifts={gifts}
                                        translation={translation.dashBoardGiftTitle}
                                        onClick={() => onOpenModal(ModalStates.GIFT)}
                                        setGift={setGift} />
                                }
                            </CardContent>
                        </ColorCard>
                        { gameStats && gameStats.hasCurrentRecoCom &&
                            <ColorCard>
                                <CardContent className={classes.cardContent}>
                                    <CommunityDashboardWidget
                                        onClick={() => onOpenModal(ModalStates.MAP)}
                                        textContent={uiElements.recoComMessageChunk}
                                    />
                                </CardContent>
                            </ColorCard>
                        }
                    </Box>
                </Slide>
                <Slide
                    in={!isLoading}
                    timeout={500}
                    direction="up"
                    mountOnEnter
                    unmountOnExit
                >
                    <Box className={[stylesGlobal.bottomZoneGradient, 'bottomZoneDashboard'].join(' ')} >
                        <CustomDisabledButton
                            color="secondary"
                            variant="contained"
                            className={'button'}
                            onClick={startGame}
                            disabled={!availableChallenges}
                        >
                            {`${translation.dashBoardChallengesButton}`}
                        </CustomDisabledButton>
                        <CustomDisabledButton
                            color="secondary"
                            variant="contained"
                            className={'button'}
                            onClick={shareClick}
                            disabled={false}
                        >
                            partager
                        </CustomDisabledButton>
                    </Box>
                </Slide>
                <BackGroundDisplay
                    addColor={1}
                    addBlur={1}
                    className={'background'}
                    imageURL={imageURL}
                />
                {(isSafari && isMobile && isIOS) && <PWAPrompt
                    delay={2000}
                    copyTitle={translation.dashboardCopyTitle}
                    copyBody={translation.dashboardCopyBody}
                    copyShareButtonLabel={translation.dashboardCopyShareButtonLabel}
                    copyAddHomeButtonLabel={translation.dashboardCopyAddHomeButtonLabel}
                    copyClosePrompt={translation.dashboardCopyClosePrompt}
                    timesToShow={30}
                    permanentlyHideOnDismiss={true}
                />}
            </Box>
                }
            </EventLayout>
            <GenericModal
                handleClose={closeModal}
                open={open}
                hideBackdrop={false}
            >
                {getModalContent()}
            </GenericModal>
        </React.Fragment>
    )
}
export default DashBoard

export async function getStaticPaths ({ locales }) {
    const eventPaths = await getAllEvents()

    const paths = []
    eventPaths.forEach((path) => {
        locales.forEach((locale) => {
            paths.push({ ...path, locale })
        })
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params, locale }) {
    const eventData = await getEventsData(params.events, locale)
    return {
        props: {
            eventData,
            locale
        },
        revalidate: 1
    }
}
