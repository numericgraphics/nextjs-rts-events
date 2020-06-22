import React, { useEffect, useState } from 'react'
import '../styles/global.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'

function MyApp ({ Component, pageProps }) {
    const [eventData, setEventData] = useState([])
    useEffect(() => {
        console.log('MyApp - useEffect init')
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
    }, [])

    useEffect(() => {
        if (pageProps.eventData) {
            setEventData(pageProps.eventData)
            DataProvider.setData(pageProps.eventData)
        }
    }, [pageProps])

    return (
        <UserContext.Provider value={{ dataProvider: DataProvider, data: eventData }}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}

// MyApp.getInitialProps = async (appContext) => {
//     const appProps = await App.getInitialProps(appContext)
//     return { ...appProps }
// }

export default MyApp
