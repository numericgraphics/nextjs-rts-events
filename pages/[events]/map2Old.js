import React, { useContext, useEffect, useState, useRef } from 'react'
import UserContext from '../../hooks/userContext'
import { useRouter } from 'next/router'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import Box from '@material-ui/core/Box'
// import MainMap from '../../components/map/MainMap'
import EventLayout from '../../components/ui/layout/eventLayout'
import dynamic from 'next/dynamic'
import useSwr from 'swr'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'
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
        }
    }, [isGlobalLoading])

    const fetcher = (...args) => fetch(...args).then(response => response.json())

    const Marker = ({ children }) => children

    const mapRef = useRef()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(10)

    const url = 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF6/GeoJSON/CAC2020'
    const { data, error } = useSwr(url, { fetcher })
    const crimes = data && !error ? data.features.slice(0, 2000) : []
    console.log(crimes)
    /* const points = crimes.map(crime => ({
        type: 'Feature',
        properties: { cluster: false, crimeId: '33', category: 'miaou' },
        geometry: {
            type: 'Point',
            coordinates: crime.geometry.coordinates
        }
    })) */
    const points = crimes

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    })

    return (
        <React.Fragment>
            <EventLayout>
                <Box className='content' >
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                            defaultCenter={{ lat: 46.00, lng: 6.00 }}
                            defaultZoom={10}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map }) => {
                                mapRef.current = map
                            }}
                            onChange={({ zoom, bounds }) => {
                                setZoom(zoom)
                                setBounds([
                                    bounds.nw.lng,
                                    bounds.se.lat,
                                    bounds.se.lng,
                                    bounds.nw.lat
                                ])
                            }}
                        >
                            {clusters.map(cluster => {
                                const [longitude, latitude] = cluster.geometry.coordinates
                                const {
                                    cluster: isCluster,
                                    point_count: pointCount
                                } = cluster.properties

                                if (isCluster) {
                                    return (
                                        <Marker
                                            key={`cluster-${cluster.id}`}
                                            lat={latitude}
                                            lng={longitude}
                                        >
                                            <div
                                                className="cluster-marker"
                                                style={{
                                                    width: `${10 + (pointCount / points.length) * 20}px`,
                                                    height: `${10 + (pointCount / points.length) * 20}px`
                                                }}
                                                onClick={() => {
                                                    const expansionZoom = Math.min(
                                                        supercluster.getClusterExpansionZoom(cluster.id),
                                                        20
                                                    )
                                                    mapRef.current.setZoom(expansionZoom)
                                                    mapRef.current.panTo({ lat: latitude, lng: longitude })
                                                }}
                                            >
                                                {pointCount}
                                            </div>
                                        </Marker>
                                    )
                                }

                                return (
                                    <Marker
                                        key={`crime-${cluster.properties.crimeId}`}
                                        lat={latitude}
                                        lng={longitude}
                                    >
                                        <button className="crime-marker">
                                            Miaou
                                        </button>
                                    </Marker>
                                )
                            })}
                        </GoogleMapReact>
                    </div>
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
