import React from 'react'
import App from 'next/app'
import '../styles/global.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'

function MyApp ({ Component, pageProps }) {
    return (
        <UserContext.Provider value={{ dataEvent: pageProps.data }}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}

// RUN ALL GETINITIALPROPS IN PAGE
MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
}

export default MyApp
