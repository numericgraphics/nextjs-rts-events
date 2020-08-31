import React from 'react'
// import React, { useContext, useEffect, useState } from 'react'
import { getAllEvents } from '../../lib/events'
// import UserContext from '../../components/UserContext'
// import Router, { useRouter } from 'next/router'
// // import ThemeFactory from '../../data/themeFactory'

function GiftsTest (props) {
    // const { eventData } = props
    // const router = useRouter()
    // const { events } = router.query
    // const { dataProvider, gameStatsService, store } = useContext(UserContext)
    // // const { setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading } = store
    //
    // async function fetchData () {
    //     try {
    //         const response = await fetch('/api/fetchGame', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ eventName: events })
    //         })
    //         if (response.status === 200) {
    //             const content = await response.json()
    //             dataProvider.setData(content)
    //             gameStatsService.init(dataProvider)
    //             // initPage()
    //         } else {
    //             await Router.push('/[events]', {
    //                 pathname: `/${events}`,
    //                 query: { modal: true }
    //             })
    //         }
    //     } catch (error) {
    //         throw new Error(error.message)
    //     }
    // }
    //
    // useEffect(() => {
    //     if (isGlobalLoading) {
    //         setEventData(eventData.content)
    //         setEventName(events)
    //         dataProvider.setData(eventData.content)
    //     }
    //     fetchData().then()
    // }, [])

    return (
        <div>
            test
        </div>
    )
}

export default GiftsTest

export async function getStaticPaths () {
    const paths = await getAllEvents()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const events = params.events
    return {
        props: {
            eventData: { events }
        }
    }
}
