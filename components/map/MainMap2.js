import React, { useRef, useState, useEffect } from 'react'
import useSwr from 'swr'
import GoogleMapReact from 'google-map-react'
import { useStyles } from '../../styles/jsx/components/map/mainMap.style.js'
import useSupercluster from 'use-supercluster'
import 'react-alice-carousel/lib/alice-carousel.css'

function MainMap (props) {
    const fetcher = (...args) => fetch(...args).then(response => response.json())

    const Marker = ({ children }) => children

    const mapRef = useRef()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(10)
    const classes = useStyles()

    const url = 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF6/GeoJSON/CAC2020'
    const { data, error } = useSwr(url, { fetcher })
    const points = data && !error ? data.features.slice(0, 2000) : []

    function toRadian (deg) {
        const pi = Math.PI
        return deg * pi / 180
    }

    function distanceBetweenCoordinates (coords1, coords2) {
        const R = 6371000
        const λ1 = toRadian(coords1[0])
        const λ2 = toRadian(coords2[0])
        const φ1 = toRadian(coords1[1])
        const φ2 = toRadian(coords2[1])
        const x = (λ2 - λ1) * Math.cos((φ1 + φ2) / 2)
        const y = (φ2 - φ1)
        const d = Math.sqrt(x * x + y * y) * R
        // console.log(d)
        return d
    }

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    })

    const createMapOptions = function (maps) {
        return {
            /* panControl: false,
          mapTypeControl: false,
          scrollwheel: false, */
            fullscreenControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            }
            // mapId: "16573f9694310885"
        }
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                options={createMapOptions}
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
                        console.log('cluster', cluster.id)
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
                    } else {
                        console.log('point', cluster.geometry.coordinates[0] + '-' + cluster.geometry.coordinates[1])
                        return (
                            <Marker
                                key={cluster.geometry.coordinates[0] + '-' + cluster.geometry.coordinates[1]}
                                lat={latitude}
                                lng={longitude}
                            >
                                <button className={classes.pointMarker}>
                                    <img style={{ width: '20px' }} src="/custody.svg" alt="crime doesn't pay" />
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
