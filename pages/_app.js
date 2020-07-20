import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import '../styles/global.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'
import ScoreService from '../data/scoreServices'
import Progress from '../components/progress'
import Router from 'next/router'

function MyApp ({ Component, pageProps }) {
    const [isGlobalLoading, setGlobalLoading] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [eventName, setEventName] = useState('/')
    const [theme, setTheme] = useState({})
    const store = { error, setError, isLoading, setLoading, setTheme, eventName, setEventName }

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

        setGlobalLoading(false)

        // Route change listener for trigger loading state
        // Each page should trigger loading false after his initizialisation throught the store.setLoading
        const handleRouteChange = (url) => {
            console.log('handleRouteChange', url)
            setLoading(true)
        }
        Router.events.on('routeChangeStart', handleRouteChange)
    }, [])

    return (
        <UserContext.Provider value={{ dataProvider: DataProvider, scoreService: ScoreService, store }}>
            {isLoading
                ? <Progress/>
                : null
            }
            {isGlobalLoading
                ? <Progress/>
                : <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            }
        </UserContext.Provider>
    )
}

export default MyApp
