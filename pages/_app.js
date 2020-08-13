import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import '../styles/global.css'
import '../styles/fadeIn.css'
import 'react-phone-input-2/lib/style.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'
import GameStatsService from '../data/gameStats'
import Progress from '../components/progress'
import { useRouter } from 'next/router'
import SplashScreen from '../components/splashScreen'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useImagesServices } from '../hooks/useImagesServices'
import ThemeFactory from '../data/themeFactory'

function MyApp ({ Component, pageProps }) {
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
    const store = { error, setError, isLoading, isGlobalLoading, setLoading, setTheme, eventName, setEventName, setEventData }
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
        if (isImagesPreLoaded && isStartAnimationEnded) {
            setIsEndedAnimationStart(true)
        }
    }, [isImagesPreLoaded, isStartAnimationEnded])

    // Each page should trigger loading false after his initizialisation throught the store.setLoading
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
        <UserContext.Provider value={{ dataProvider: DataProvider, gameStatsService: GameStatsService, store }}>
            {(isLoading && !isGlobalLoading) && <Progress/> }
            {isGlobalLoading && <SplashScreen startedCallBack={startedCallBack} endedCallBack={endedCallBack} animationState={isEndedAnimationStart}/>}
            { <ThemeProvider theme={ theme }>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>}
        </UserContext.Provider>
    )
}

export default MyApp
