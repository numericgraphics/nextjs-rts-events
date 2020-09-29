import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import UserContext from '../components/UserContext'
import { getAllEvents, getEventsData } from '../lib/events'
import ThemeFactory from '../data/themeFactory'
import EventLayout from '../components/eventLayout'
import StartPage from '../components/startPage/startPage'

function Events (props) {
    const { eventData, router } = props
    const { content, events } = eventData
    const [isPageReady, setPageReady] = useState(false)
    const { dataProvider, store } = useContext(UserContext)
    const { setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading } = store

    async function handleVerify () {
        try {
            const response = await fetch(`api/verify/${events}`)
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
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
        dataProvider.setData(content)
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
            {isLoading
                ? null
                : <StartPage/>
            }
        </EventLayout>
    )
}

export default withRouter(Events)

export async function getStaticPaths () {
    const paths = await getAllEvents()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    console.log('log', params.events)
    const eventData = await getEventsData(params.events)
    return {
        props: {
            eventData
        }
    }
}
