import React, { useContext, useEffect } from 'react'
import UserContext from '../../hooks/userContext'
import { useRouter } from 'next/router'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import EventLayout from '../../components/ui/layout/eventLayout'
import Div100vh from 'react-div-100vh'
import MainMap from '../../components/map/MainMap'
const queryString = require('query-string')

function Map (props) {
    const router = useRouter()
    const { store, dataProvider } = useContext(UserContext)
    const { setTheme, setLoading, setEventName, setEventData, isGlobalLoading } = store
    const { events } = router.query
    const { eventData } = props
    const defi = (typeof window !== 'undefined') && queryString.parse(location.search).defi

    useEffect(() => {
        if (isGlobalLoading) {
            setLoading(false)
            setEventData(eventData.content)
            setEventName(events)
            dataProvider.setEventData(eventData.content)
            setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        } else {
            setLoading(false)
        }
    }, [isGlobalLoading])

    return (
        <React.Fragment>
            <EventLayout>
                <Div100vh className='content'>
                    <MainMap defi={defi} />
                </Div100vh>
            </EventLayout>
        </React.Fragment>
    )
}
export default Map
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
