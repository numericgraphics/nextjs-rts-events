import React, { useEffect } from 'react'
import App from 'next/app'
import '../styles/global.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'
import Router from 'next/router'

function MyApp ({ Component, pageProps }) {
    async function handleVerify () {
        try {
            const response = await fetch('/api/verify')
            if (response.status === 200) {
                Router.push('/dashBoard')
            } else {
                Router.push('/startPage')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
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

        // verify cookie and manage result for redirection
        handleVerify().then()
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
