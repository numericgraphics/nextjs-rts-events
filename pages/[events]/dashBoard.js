import React, { useContext, useEffect, useState } from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Router, { useRouter } from 'next/router'
import EventLayout from '../../components/ui/layout/eventLayout'
import Box from '@material-ui/core/Box'
import { ColorCard } from '../../components/ui/card/ColorCard'
import UserContext from '../../hooks/userContext'
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
import BackGroundDisplay from '../../components/ui/background/BackGroundDisplay'
import { useStylesGlobal } from '../../styles/jsx/global.style'
import { useStyles } from '../../styles/jsx/pages/dashBoard.style'
import AvatarEvent from '../../components/ui/avatar/avatarEvent'
import CardContent from '@material-ui/core/CardContent'
import DashBoardAdminToolBar from '../../components/ui/toolbar/DashBoardAdminToolBar'
import Slide from '@material-ui/core/Slide'
import GenericModal from '../../components/ui/modal/genericModal'
import EndgameInformations from '../../components/dashboard/endGameInformation'
import Profile from '../../components/dashboard/profile'

export const ModalStates = Object.freeze({
    GIFT: 'gift',
    END_GAME: 'endGame',
    PROFILE: 'profile',
    MESSAGE: 'message',
    WIN: 'win'
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
    const [open, setOpen] = useState(false)
    const [gift, setGift] = useState({ description: '', title: '', locked: true })
    const [modalState, setModalState] = useState(ModalStates.GIFT)

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

        // if (!availableChallenges) {
        //     setTimeout(() => {
        //         onOpenModal(ModalStates.END_GAME)
        //     }, 1000)
        // }
    }

    async function startGame () {
        await Router.push('/[events]/challenge', `/${events}/challenge`)
    }

    function closeModal () {
        setOpen(false)
    }

    // TODO check if getAvatars function return the current avatar url
    // if not add it to the list
    function getAvatars () {
        return dataProvider.getAvatars()
    }

    function getModalContent () {
        switch (modalState) {
        case ModalStates.GIFT:
            return <Gift gift={gift} handleClose={closeModal} open={open}/>
        case ModalStates.END_GAME:
            return <EndgameInformations uiElements={uiElements} handleClose={closeModal} open={open}/>
        case ModalStates.PROFILE:
            return <Profile handleClose={closeModal} open={open} avatars={getAvatars()} events={events} setUser={setUser}/>
        }
    }

    function onProfileClick () {
        onOpenModal(ModalStates.PROFILE)
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
        <React.Fragment>
            <EventLayout >
                {!(isLoading && isGlobalLoading) &&
            <Box className='content' >
                { user.isAdmin &&
                    <DashBoardAdminToolBar timeStampMode={timeStampMode} />
                }
                <Slide in={!isLoading} timeout={500} direction="down" mountOnEnter unmountOnExit>
                    <Box className='topZoneDashboard' >
                        <Box className={classes.header}>
                            <ButtonBase
                                onClick={onProfileClick}>
                                <AvatarEvent user={user.avatarURL} />
                            </ButtonBase>
                            <Typography variant="h2" className={[classes.nickname].join(' ')}>
                                {user.nickname}
                            </Typography>
                            <Typography
                                variant='subtitle1'
                                className={[classes.remainingTime].join(' ')}
                                align={'center'}
                                dangerouslySetInnerHTML={{ __html: translation.dashBoardHeadText }} />
                        </Box>
                        {availableChallenges &&
                            <Box className={classes.progressBarOverlay}>
                                <Typography variant='subtitle1' className={[classes.textRegularCenterOverlay].join(' ')}>
                                    {uiElements.progressBarMessageChunk}
                                </Typography>
                                <DashBoardChallengesProgress variant="determinate" progress={progress} />
                            </Box>
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
            </Box>
                }
            </EventLayout>
            <GenericModal handleClose={closeModal} open={open}>
                {getModalContent()}
            </GenericModal>
        </React.Fragment>
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
        },
        revalidate: 1
    }
}
