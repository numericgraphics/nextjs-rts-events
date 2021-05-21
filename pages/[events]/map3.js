import React, { useContext, useEffect, useState, useRef } from 'react'
import UserContext from '../../hooks/userContext'
import { useRouter } from 'next/router'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import Box from '@material-ui/core/Box'
// import MainMap from '../../components/map/MainMap'
import EventLayout from '../../components/ui/layout/eventLayout'
import dynamic from 'next/dynamic'
import MainMap2 from '../../components/map/MainMap2'
import useSwr from 'swr'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'

const fetcher = (...args) => fetch(...args).then(response => response.json())

const Marker = ({ children }) => children

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

    const mapRef = useRef()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(10)

    const url =
    'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10'
    const { data, error } = useSwr(url, { fetcher })
    const crimes = data && !error ? data.slice(0, 2000) : []
    const points = crimes.map(crime => ({
        type: 'Feature',
        properties: { cluster: false, crimeId: crime.id, category: crime.category },
        geometry: {
            type: 'Point',
            coordinates: [
                parseFloat(crime.location.longitude),
                parseFloat(crime.location.latitude)
            ]
        }
    }))

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
                            defaultCenter={{ lat: 52.6376, lng: -1.135171 }}
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
                                            <img src="/custody.svg" alt="crime doesn't pay" />
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
