import React, { useRef, useState } from 'react'
import useSwr from 'swr'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import config from '@arcgis/core/config.js'
import GoogleMapReact from 'google-map-react'
import { useStyles } from '../../styles/jsx/components/map/mainMap.style.js'
import Router, { useRouter } from 'next/router'
import useSupercluster from 'use-supercluster'
config.assetsPath = '/assets'

function MainMap (props) {
    const router = useRouter()
    const mapRef = useRef(null)
    const classes = useStyles()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(10)
    const { events } = router.query
    const fetcher = (...args) => fetch(...args).then(response => response.json())
    const Marker = ({ children }) => children

    const url = 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF6/GeoJSON/CAC2020'
    const { data, error } = useSwr(url, { fetcher })
    const points = data && !error ? data.features : []
    /* const points = crimes.map(crime => ({
        type: 'Feature',
        properties: { cluster: false, crimeId: crime.id, category: crime.category },
        geometry: {
            type: 'Point',
            coordinates: [
                parseFloat(crime.location.longitude),
                parseFloat(crime.location.latitude)
            ]
        }
    })) */

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 100, maxZoom: 1000 }
    })

    async function fetchData () {
        try {
            const bodyContent = { eventName: events }
            const response = await fetch('/api/fetchGeoJson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                const content = await response.json()
                // initGame(content)
                // getFinalLay(content)
            } else {
                await Router.push('/[events]', {
                    pathname: `/${events}`,
                    query: { modal: true }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const defaultProps = {
        center: {
            lat: 46.657505,
            lng: 7.099246
        },
        zoom: 9
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB-9foPM3YEbl15NVb54d12NUQxSFpbQRc' }}
                defaultCenter={defaultProps.center}
                mapId="16573f9694310885"
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    console.log(map)
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
                                    className={classes.clusterMarker}
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 20}px`,
                                        height: `${10 + (pointCount / points.length) * 20}px`
                                    }}
                                    onClick={() => {
                                        console.log(cluster)
                                        console.log(cluster.id)
                                        console.log(supercluster.getLeaves(cluster.id))
                                        /* if (cluster.properties.cluster === true) {
                                            console.log(cluster.type)
                                            console.log(supercluster.getLeaves(cluster.id))
                                        } else {
                                            console.log('isnt')
                                        }
                                        /* const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        )
                                        mapRef.current.setZoom(expansionZoom)
                                        mapRef.current.panTo({ lat: latitude, lng: longitude }) */
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        )
                    } else {
                        return (
                            <Marker
                                key={cluster.id}
                                lat={latitude}
                                lng={longitude}
                            >
                                <button className={classes.pointMarker} onClick={() => { console.log(cluster) }}>
                                </button>
                            </Marker>
                        )
                    }
                })}
            </GoogleMapReact>
        </div>
    )
}
export default MainMap
