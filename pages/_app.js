import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import '../styles/css/global.css'
import '../styles/css/fadeIn.css'
import '../styles/css/avatarSelected.css'
import '../styles/css/growFadeOut.css'
import '../styles/css/shake.css'
import '../styles/css/kenBurns.css'
import 'react-phone-input-2/lib/bootstrap.css'
import UserContext from '../hooks/userContext'
import DataProvider from '../data/dataProvider'
import GameStatsService from '../data/gameStats'
import UiElementsServices from '../data/uiElements'
import { useRouter } from 'next/router'
import SplashScreen from '../components/ui/splashscreen/splashScreen'
import { useImagesServices } from '../hooks/useImagesServices'
import ThemeFactory from '../data/themeFactory'
import Progress from '../components/ui/progress/progress'
import VideoPlayer from '../components/ui/video/VideoPlayer'
import useDeviceDetect from '../hooks/useDeviceDetect'
import useNetwork from '../hooks/useNetwork'
import useAppVisibility from '../hooks/useAppVisivility'
import Head from 'next/head'

function MyApp ({ Component, pageProps }) {
    const netWorkStatus = useNetwork()
    const router = useRouter()
    const { defaultLocale, locale, isFallback, query } = router
    const appVisibilityStatus = useAppVisibility()
    const deviceDetection = useDeviceDetect()
    const [eventData, setEventData] = useState([])
    const [isGlobalLoading, setGlobalLoading] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [isStartAnimationEnded, setIsStartAnimationEnded] = useState(false)
    const [isEndedAnimationStart, setIsEndedAnimationStart] = useState(false)
    const [isEndedAnimationEnded, setIsEndedAnimationEnded] = useState(false)
    const [routeChange, setRouteChange] = useState(false)
    const isImagesPreLoaded = useImagesServices(eventData)
    const [error, setError] = useState(false)
    const [eventName, setEventName] = useState('')
    const [theme, setTheme] = useState(ThemeFactory.getDefaultTheme())
    const [timeStampMode, setTimeStampMode] = useState({ enable: false, date: '', time: '', initialized: false })
    const [isRouterReady, setRouterReady] = useState(false)
    const player = useRef()
    /* eslint-disable */
    const [videoSource, setVideoSource] = useState('')
    const [videoPoster, setVideoPoster] = useState('')
    const [videoVisible, setVideoVisible] = useState(false)
    const [videoHasPlayed, setVideoPlayed] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    const [blurVideo, setBlurVideo] = useState(true)
    /* eslint-enable */
    const videoController = { player, setVideoVisible, setVideoSource, setVideoPoster, videoHasPlayed, setVideoPlayed, showVideo, setShowVideo, setBlurVideo }
    const store = { locale, error, setError, isLoading, isGlobalLoading, setLoading, setTheme, eventName, setEventName, setEventData, videoController, deviceDetection, timeStampMode, setTimeStampMode }

    function startedCallBack () {
        setIsStartAnimationEnded(true)
    }

    function endedCallBack () {
        setGlobalLoading(false)
        setIsEndedAnimationEnded(true)
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

    useEffect(() => {
        console.log('isFallback', isFallback)
        console.log('isFallback - locale', locale)
        console.log('isFallback - defaultLocale', defaultLocale)
        console.log('isFallback - query', query)
    }, [isFallback])

    useEffect(() => {
        if (isEndedAnimationEnded && isRouterReady) {
            setGlobalLoading(false)
        }
    }, [isEndedAnimationEnded, isRouterReady])

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
        console.log('NETWORK STATUS --> ', netWorkStatus)
    }, [netWorkStatus])

    useEffect(() => {
        console.log('APP VISIBILITY STATUS --> ', appVisibilityStatus)
    }, [appVisibilityStatus])

    useEffect(() => {
        console.log('APP TIMESTAMP STATUS --> ', timeStampMode)
    }, [timeStampMode])

    useEffect(() => {
        if (!timeStampMode.initialized) {
            // const { time, date } = router.query
            const params = (new URL(document.location)).searchParams
            const time = params.get('time') ? params.get('time') : ''
            const date = params.get('date')
            if (date) {
                setTimeStampMode({ enable: !!date, date, time, initialized: true })
            }
            setRouterReady(true)
        }
    }, [timeStampMode.initialized, router])

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

        return () => {
            router.events.remove('routeChangeStart', handleRouteChange)
        }
    }, [])

    console.log(videoVisible)
    return (
        <UserContext.Provider value={{ dataProvider: DataProvider, gameStatsService: GameStatsService, uiElementsService: UiElementsServices, store }}>
            { (isLoading && !isGlobalLoading && pageProps.statusCode !== 404) && <Progress/> }
            {(isGlobalLoading && pageProps.statusCode !== 404) && <SplashScreen startedCallBack={startedCallBack} endedCallBack={endedCallBack} animationState={isEndedAnimationStart}/>}
            <Head>
                <title>RTS - Events</title>
                < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
                <meta
                    name="description"
                    content={'RTS - Events'}
                />
            </Head>
            { <ThemeProvider theme={ theme }>
                <CssBaseline />
                <Component {...pageProps} />
                <VideoPlayer
                    ref={player}
                    videoSource={videoSource}
                    videoPoster={videoPoster}
                    showVideo={showVideo}
                    blurVideo={blurVideo}
                    style={{ visibility: videoVisible ? 'visible' : 'hidden' }}
                />
            </ThemeProvider> }
        </UserContext.Provider>
    )
}

export default MyApp
