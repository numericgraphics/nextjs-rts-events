import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import '../styles/global.css'
import '../styles/fadeIn.css'
import '../styles/shake.css'
import 'react-phone-input-2/lib/bootstrap.css'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'
import GameStatsService from '../data/gameStats'
import UiElementsServices from '../data/uiElements'
import { useRouter } from 'next/router'
import SplashScreen from '../components/splashScreen'
import { useImagesServices } from '../hooks/useImagesServices'
import ThemeFactory from '../data/themeFactory'
import Progress from '../components/progress'
import VideoPlayer from '../components/ui/VideoPlayer'
import useDeviceDetect from '../hooks/useDeviceDetect'

function MyApp ({ Component, pageProps }) {
    const deviceDetection = useDeviceDetect()
    const [eventData, setEventData] = useState([])
    const [isGlobalLoading, setGlobalLoading] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [isStartAnimationEnded, setIsStartAnimationEnded] = useState(false)
    const [isEndedAnimationStart, setIsEndedAnimationStart] = useState(false)
    const [routeChange, setRouteChange] = useState(false)
    const isImagesPreLoaded = useImagesServices(eventData)
    const [error, setError] = useState(false)
    const [eventName, setEventName] = useState('')
    const [theme, setTheme] = useState(ThemeFactory.getDefaultTheme())
    const player = useRef()
    /* eslint-disable */
    const [videoSource, setVideoSource] = useState('')
    const [videoPoster, setVideoPoster] = useState('')
    const [videoVisible, setVideoVisible] = useState(false)
    const [videoAutoPlay, setVideoAutoPlay] = useState(true)
    const [videoHasPlayed, setVideoPlayed] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    const [blurVideo, setBlurVideo] = useState(false)
    /* eslint-enable */
    const videoController = { player, setVideoVisible, setVideoSource, setVideoPoster, setVideoAutoPlay, videoHasPlayed, setVideoPlayed, showVideo, setShowVideo, setBlurVideo }
    const store = { error, setError, isLoading, isGlobalLoading, setLoading, setTheme, eventName, setEventName, setEventData, videoController, deviceDetection }
    const router = useRouter()

    function startedCallBack () {
        setIsStartAnimationEnded(true)
    }

    function endedCallBack () {
        setGlobalLoading(false)
    }

    function sendStats (needToBeInitialized, shortName) {
        try {
            /* eslint-disable */
            if (RTS === undefined ) {
                return
            }
            if (needToBeInitialized) {
                RTS.stats.options.initialized = false
            }
            RTS.stats.send({
                remp: {
                    prefix: `rtschallenge`
                },
                comscore: {
                    prefix: `rtschallenge`
                },
                tc: {
                    navigation_environment:`preprod`,
                    prefix:``,
                    content_category_1:`rtschallenge`,
                    content_category_2:`${shortName}`,
                    navigation_app_sitename:`www.rts.ch`,
                    navigation_level_0:``
                }
            })
            /* eslint-enable */
        } catch (e) {
            console.log('_app - Stats - ERROR', e)
        }
    }

    // First load a stats event is sent if GlobalLoading is true
    useEffect(() => {
        if (isGlobalLoading && eventName.length > 0) {
            sendStats(false, eventName)
        }
    }, [eventName])

    // wait for preloading service and animated splashscreen
    useEffect(() => {
        if (isImagesPreLoaded.ready && isStartAnimationEnded) {
            setIsEndedAnimationStart(true)
        }
    }, [isImagesPreLoaded, isStartAnimationEnded])

    // Each page should trigger loading false after his initialisation through the store.setLoading
    useEffect(() => {
        if (routeChange) {
            setLoading(true)
            sendStats(true, eventName)
            setRouteChange(false)
        }
    }, [routeChange])

    useEffect(() => {
        // REMOVE SERVER SIDE INJECTED CSS
        // source : https://github.com/mui-org/material-ui/tree/next/examples/nextjs
        try {
            const jssStyles = document.querySelector('#jss-server-side')
            if (jssStyles) {
                jssStyles.parentElement.removeChild(jssStyles)
            }
        } catch (error) {
            throw new Error(error.message)
        }

        // Route change listener for trigger loading state
        const handleRouteChange = (url) => {
            setRouteChange(true)
        }
        router.events.on('routeChangeStart', handleRouteChange)
    }, [])

    return (
        <UserContext.Provider value={{ dataProvider: DataProvider, gameStatsService: GameStatsService, uiElementsService: UiElementsServices, store }}>
            {(isLoading && !isGlobalLoading) && <Progress/> }
            {isGlobalLoading && <SplashScreen startedCallBack={startedCallBack} endedCallBack={endedCallBack} animationState={isEndedAnimationStart}/> }
            { <ThemeProvider theme={ theme }>
                <CssBaseline />
                <Component {...pageProps} />
                <VideoPlayer
                    ref={player}
                    videoSource={videoSource}
                    videoPoster={videoPoster}
                    autoPlay={videoAutoPlay}
                    showVideo={showVideo}
                    blurVideo={blurVideo}
                    style={{ visibility: videoVisible ? 'visible' : 'hidden' }}
                />
            </ThemeProvider> }
        </UserContext.Provider>
    )
}

export default MyApp
