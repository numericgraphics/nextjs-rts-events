import React, { useEffect, useState } from 'react'
import '../styles/global.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'

// TODO - Check Scratches _app.jsx to get data and fetch without cors issue

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

export default MyApp
