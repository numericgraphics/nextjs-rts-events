import React, { useRef, useState, useEffect } from 'react'
import useSwr from 'swr'
import GoogleMapReact from 'google-map-react'
import { useStyles } from '../../styles/jsx/components/map/mainMap.style.js'
import useSupercluster from 'use-supercluster'
import PointDetail from './PointsDetail'
import { Typography } from '@material-ui/core'

function MainMap (props) {
    const mapRef = useRef(null)
    const classes = useStyles()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(10)
    const [pointList, setPointList] = useState(null)
    const fetcher = (...args) => fetch(...args).then(response => response.json())
    const Marker = ({ children }) => children

    const url = 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF6/GeoJSON/CAC2020'
    const { data, error } = useSwr(url, { fetcher })
    const points = data && !error ? data.features : []
    const boundCenter = data && !error ? data.properties.bound : false
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
    console.log(boundCenter)
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 100, maxZoom: 30 }
    })

    useEffect(() => {
        console.log(mapRef)
        if (boundCenter) {
            mapRef.current.fitBounds(boundCenter)
            console.log('set bounds')
        }
    }, [boundCenter])

    const defaultProps = {
        center: {
            lat: 46.657505,
            lng: 7.099246
        },
        zoom: 9
    }

    function closeDetail () {
        setPointList(null)
    }

    function onClickCluster (clusterId) {
        closeDetail()
        setPointList(supercluster.getLeaves(clusterId, Infinity))
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
                                        onClickCluster(cluster.id)
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
            {pointList && <PointDetail pointList={pointList} setPointList={setPointList} />}
            <Typography onClick={() => { mapRef.current.fitBounds(boundCenter); console.log(mapRef.current.getZoom()) }}>Test</Typography>
        </div>
    )
}
export default MainMap
