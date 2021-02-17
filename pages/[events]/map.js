import React, { useContext, useEffect } from 'react'
import UserContext from '../../hooks/userContext'
import { useRouter } from 'next/router'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import Box from '@material-ui/core/Box'
// import MainMap from '../../components/map/MainMap'
import EventLayout from '../../components/ui/layout/eventLayout'
import dynamic from 'next/dynamic'
const MainMap = dynamic(() => import('../../components/map/MainMap'), {
    ssr: false
})

function Map (props) {
    const router = useRouter()
    const { store, dataProvider } = useContext(UserContext)
    const { setTheme, setLoading, setEventName, setEventData, isGlobalLoading } = store
    const { events } = router.query
    const { eventData } = props

    useEffect(() => {
        if (isGlobalLoading) {
            setLoading(false)
            setEventData(eventData.content)
            setEventName(events)
            dataProvider.setEventData(eventData.content)
            setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        } else {
            console.log('else')
        }
    }, [isGlobalLoading])

    return (
        <React.Fragment>
            <EventLayout>
                <Box className='content' >
                    <MainMap/>
                </Box>
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
