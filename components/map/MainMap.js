import React, { useRef, useState, useEffect } from 'react'
import useSwr from 'swr'
import GoogleMapReact from 'google-map-react'
import { useStyles } from '../../styles/jsx/components/map/mainMap.style.js'
import useSupercluster from 'use-supercluster'
import PointDetail from './PointsDetail'
import UserLocation from './markers/UserLocation'
import { medalIcon } from '../../data/icon'

function MainMap (props) {
    const mapRef = useRef(null)
    const classes = useStyles()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(10)
    const [pointList, setPointList] = useState(null)
    const [userLocation, setUserLocation] = useState(null)
    const fetcher = (...args) => fetch(...args).then(response => response.json())
    const Marker = ({ children }) => children

    const url = 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF6/GeoJSON/RECOGEO1'
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
        if (userLocation) {
            const newBounds = mapRef.current.getBounds().extend(userLocation)
            mapRef.current.fitBounds(newBounds)
        }
    }, [userLocation])

    useEffect(() => {
        if (boundCenter) {
            mapRef.current.fitBounds(boundCenter)
            // console.log(mapRef.current.getBounds().extend())
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

    function closeDetail () {
        setPointList(null)
    }

    function onClickCluster (clusterId) {
        closeDetail()
        setPointList(supercluster.getLeaves(clusterId, Infinity))
    }

    function getUserLocation () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                setUserLocation(pos)
                // mapRef.current.setCenter(pos)
            }, () => alert('Votre localisation ne peut pas être déterminé'))
            /* la géolocalisation est disponible */
        } else {
            alert('Votre localisation ne peut pas être déterminé')
        }
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB-9foPM3YEbl15NVb54d12NUQxSFpbQRc' }}
                defaultCenter={defaultProps.center}
                mapId="16573f9694310885"
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                options={createMapOptions}
                onGoogleApiLoaded={({ map }) => {
                    console.log(map)
                    mapRef.current = map
                    const locationButton = document.createElement('button')
                    locationButton.textContent = '📍'
                    locationButton.classList.add(classes.localisationBtn)
                    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locationButton)
                    locationButton.addEventListener('click', getUserLocation)
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
                {userLocation && <UserLocation
                    lat={userLocation.lat}
                    lng={userLocation.lng}
                />}
            </GoogleMapReact>
            {pointList && <PointDetail pointList={pointList} setPointList={setPointList} />}
        </div>
    )
}
export default MainMap
