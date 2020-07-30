import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import '../styles/global.css'
import '../styles/fadeIn.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'
import ScoreService from '../data/scoreServices'
import Progress from '../components/progress'
import Router from 'next/router'
import ThemeFactory from '../data/themeFactory'
import SplashScreen from '../components/splashScreen'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useImagesServices } from '../hooks/useImagesServices'

async function fetchGlobalEventData () {
    const response = await fetch('/api/fetchGlobal')
    return await response.json()
}

function MyApp ({ Component, pageProps }) {
    const [eventData, setEventData] = useState([])
    const [isGlobalLoading, setGlobalLoading] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [isStartAnimationEnded, setIsStartAnimationEnded] = useState(false)
    const [isEndedAnimationStart, setIsEndedAnimationStart] = useState(false)
    const isImagesPreLoaded = useImagesServices(eventData)
    const [error, setError] = useState(false)
    const [theme, setTheme] = useState()
    const store = { error, setError, isLoading, setLoading }

    function startedCallBack () {
        setIsStartAnimationEnded(true)
    }

    function endedCallBack () {
        setGlobalLoading(false)
    }

    // wait for preloading service and animated splashscreen
    useEffect(() => {
        if (isImagesPreLoaded && isStartAnimationEnded) {
            setIsEndedAnimationStart(true)
        }
    }, [isImagesPreLoaded, isStartAnimationEnded])

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

        try {
            // Fetch global game data
            fetchGlobalEventData().then((result) => {
                setEventData(result)
                DataProvider.setData(result)
                setTheme(ThemeFactory.createTheme(DataProvider.getTheme()))
            })
        } catch (error) {
            throw new Error(error.message)
        }

        // First load a stats event is sent
        try {
            // eslint-disable-next-line no-undef
            RTS.stats.send({ remp: { prefix: 'rtsEvents/WF' }, comscore: { prefix: 'rtsEvents/WF' } })
            console.log('_app first load - Stats sent !')
        } catch (e) {
            console.log('_app first load - Stats - ERROR', e)
        }

        // Route change listener for trigger loading state
        // Each page should trigger loading false after his initizialisation throught the store.setLoading
        // Each time a stats event is sent
        const handleRouteChange = (url) => {
            setLoading(true)
            try {
                /* eslint-disable */
                RTS.stats.options.initialized = false
                RTS.stats.send({ remp: { prefix: 'rtsEvents/WF' }, comscore: { prefix: 'rtsEvents/WF' } })
                /* eslint-enable */
                console.log('_app - Stats sent !')
            } catch (e) {
                console.log('_app - Stats - ERROR', e)
            }
        }
        Router.events.on('routeChangeStart', handleRouteChange)
    }, [])

    return (
        <UserContext.Provider value={{ dataProvider: DataProvider, data: eventData, scoreService: ScoreService, store }}>
            {(isLoading && !isGlobalLoading) && <Progress/> }
            {isGlobalLoading
                ? <SplashScreen startedCallBack={startedCallBack} endedCallBack={endedCallBack} animationState={isEndedAnimationStart}/>
                : <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            }
        </UserContext.Provider>
    )
}

export default MyApp
