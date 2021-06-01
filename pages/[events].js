import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import UserContext from '../hooks/userContext'
import { getAllEvents, getEventsData } from '../lib/events'
import ThemeFactory from '../data/themeFactory'
import EventLayout from '../components/ui/layout/eventLayout'
import StartPage from '../components/startPage/startPage'
import Head from 'next/head'

function Events (props) {
    const { eventData, router } = props
    const { content, events } = eventData
    const [isPageReady, setPageReady] = useState(false)
    const { dataProvider, store } = useContext(UserContext)
    const { locale, setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading } = store

    async function handleVerify () {
        try {
            const response = await fetch(`api/verify/${events}?locale=${locale}`)
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setEventData(content)
                await router.push('/[events]/dashBoard', `/${events}/dashBoard`)
            } else {
                setPageReady(true)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    useEffect(() => {
        setEventData(content)
        setEventName(events)
        dataProvider.setEventData(content)
        setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        handleVerify().then()
    }, [])

    useEffect(() => {
        if (!isGlobalLoading && isPageReady) {
            setLoading(false)
        }
    }, [isGlobalLoading, isPageReady])
    return (
        <EventLayout>
            <Head>
                <meta property="og:url" content="https://www.facebook.com/" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Defi de la comm" />
                <meta property="og:description" content="Participe avec moi au défi !" />
                <meta property="og:image" content="https://www.rts.ch/2020/04/23/22/12/11271345.image/16x9/scale/width/650" />
            </Head>
            {isLoading
                ? null
                : <StartPage/>
            }
        </EventLayout>
    )
}

export default withRouter(Events)

export async function getStaticPaths ({ locales }) {
    const eventPaths = await getAllEvents()

    const paths = []
    eventPaths.forEach((path) => {
        locales.forEach((locale) => {
            paths.push({ ...path, locale })
        })
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params, locale }) {
    const eventData = await getEventsData(params.events, locale)
    return {
        props: {
            eventData,
            locale
        },
        revalidate: 1
    }
}
