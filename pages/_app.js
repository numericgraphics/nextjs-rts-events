import React, { useEffect } from 'react'
import App from 'next/app'
import '../styles/global.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'

function MyApp ({ Component, pageProps }) {
    useEffect(() => {
        console.log('MyApp - useEffect init')
    }, [])

    useEffect(() => {
        if (pageProps.eventData) {
            DataProvider.setData(pageProps.eventData)
        }
    }, [pageProps])

    return (
        <UserContext.Provider value={{ dataProvider: DataProvider }}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
}

export default MyApp
