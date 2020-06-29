import React, { useEffect, useState } from 'react'
import '../styles/global.css'
import 'typeface-roboto'
import UserContext from '../components/UserContext'
import DataProvider from '../data/dataProvider'
import Progress from '../components/progress'

async function fetchGlobalEventData () {
    const response = await fetch('/api/fetchGlobal')
    return await response.json()
}

function MyApp ({ Component, pageProps }) {
    const [eventData, setEventData] = useState([])
    const [isLoading, setLoading] = useState(true)
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
            fetchGlobalEventData().then((result) => {
                setEventData(result)
                DataProvider.setData(result)
                setLoading(false)
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }, [])

    return (
        <UserContext.Provider value={{ dataProvider: DataProvider, data: eventData }}>
            {isLoading
                ? <Progress/>
                : <Component {...pageProps} />
            }
        </UserContext.Provider>
    )
}

export default MyApp
