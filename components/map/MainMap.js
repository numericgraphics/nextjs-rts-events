import React, { useRef, useState, useEffect } from 'react'
import useSwr from 'swr'
import GoogleMapReact from 'google-map-react'
import { useStyles } from '../../styles/jsx/components/map/mainMap.style.js'
import useSupercluster from 'use-supercluster'
import PointDetail from './PointsDetail'
import UserLocation from './markers/UserLocation'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import AvatarEvent from '../../components/ui/avatar/avatarEvent'
import Avatar from '@material-ui/core/Avatar'

function MainMap (props) {
    const mapRef = useRef(null)
    const classes = useStyles()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(10)
    const [pointList, setPointList] = useState(null)
    const [userLocation, setUserLocation] = useState(null)
    const [imgList, setImgList] = useState(null)
    const fetcher = (...args) => fetch(...args).then(response => response.json())
    const Marker = ({ children }) => children
    const [activeClusterId, setActiveClusterId] = useState(0)
    const onLoad = () => console.log('loaded')
    const [loadedItem, setLoadedItem] = useState([])

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
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 100, maxZoom: 30 }
    })

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

    useEffect(() => {
        if (userLocation) {
            console.log(mapRef.current.getDiv())
            const userLocationArray = [userLocation.lng, userLocation.lat]
            const points2 = points.map((point) => {
                point.distance = distanceBetweenCoordinates(point.geometry.coordinates, userLocationArray)
                // console.log(distanceBetweenCoordinates(point.geometry.coordinates, userLocationArray))
                return point
            })
            console.log(points2.sort((a, b) => a.distance - b.distance))
            var bounds = new google.maps.LatLngBounds(userLocation)
            points2[0] && bounds.extend({ lat: points2[0].geometry.coordinates[1], lng: points2[0].geometry.coordinates[0] })
            points2[1] && bounds.extend({ lat: points2[1].geometry.coordinates[1], lng: points2[1].geometry.coordinates[0] })
            points2[2] && bounds.extend({ lat: points2[2].geometry.coordinates[1], lng: points2[2].geometry.coordinates[0] })
            console.log(bounds)
            mapRef.current.fitBounds(bounds)
            /* const newBounds = mapRef.current.getBounds().extend(userLocation)
            mapRef.current.fitBounds(newBounds) */
        }
    }, [userLocation])

    useEffect(() => {
        if (boundCenter && mapRef.current) {
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
        setImgList(false)
    }

    function onClickCluster (cluster) {
        /* const clusterLocation = cluster.geometry.coordinates
        closeDetail()
        const points2 = points.map((point) => {
            point.distance = distanceBetweenCoordinates(point.geometry.coordinates, clusterLocation)
            // console.log(distanceBetweenCoordinates(point.geometry.coordinates, userLocationArray))
            return point
        })
        console.log('miaou')
        points2.sort((a, b) => a.distance - b.distance)

        setPointList(points2) */
        const pos = {
            lat: cluster.geometry.coordinates[1],
            lng: cluster.geometry.coordinates[0]
        }
        mapRef.current.setCenter(pos)
        setActiveClusterId(cluster.id)
        setPointList(supercluster.getLeaves(cluster.id, Infinity))
    }

    function onClickPoint (cluster) {
        const pos = {
            lat: cluster.geometry.coordinates[1],
            lng: cluster.geometry.coordinates[0]
        }
        mapRef.current.setCenter(pos)
        closeDetail()
        setActiveClusterId(cluster.geometry.coordinates)
        setPointList([cluster])
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

    function onClickImage (point) {
        console.log(point)
        // mapRef.current.setCenter({ lat: point.geometry.coordinates[1], lng: point.geometry.coordinates[0] })
        return null
    }

    const handleDragStart = (e) => e.preventDefault()
    useEffect(() => {
        if (pointList) {
            var imageArray = []
            pointList.map((point, index) => {
                imageArray.push(
                    <Box className={classes.slideContainer}>
                        <Box className={classes.slideHeader}>
                            <Avatar className={classes.avatar} src={point.properties.avatarURL} />
                            <Typography className={classes.headerText}>
                                {point.properties.nickname}
                            </Typography>
                        </Box>
                        <LazyLoadImage className={classes.slideImage} src={point.properties.imageURL} onLoad={() => console.log('is loaded')} onDragStart={handleDragStart} onClick={() => onClickImage(point)} />
                    </Box>
                )
            })
            setImgList(imageArray)
        }
    }, [pointList])

    useEffect(() => {
        console.log(imgList)
    }, [imgList])

    const responsive = {
        0: { items: 1 },
        568: { items: 3 },
        1024: { items: 5 }
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
                    /* const locationButton = document.createElement('button')
                    locationButton.textContent = '📍'
                    locationButton.classList.add(classes.localisationBtn)
                    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locationButton)
                    locationButton.addEventListener('click', getUserLocation) */

                    /* const locationDiv = document.getElementById('medalIcon')
                    locationDiv.classList.add(classes.localisationBtn)
                    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locationDiv)
                    locationDiv.addEventListener('click', getUserLocation) */
                    const locationButton = document.createElement('img')
                    locationButton.src = '/icon_focusmap.svg'
                    locationButton.classList.add(classes.localisationBtn)
                    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locationButton)
                    locationButton.addEventListener('click', getUserLocation)

                    map.addListener('zoom_changed', () => {
                        closeDetail()
                    })

                    map.addListener('center_changed', () => {
                        closeDetail()
                    })
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
                                    className={activeClusterId === cluster.id ? [classes.clusterMarker, classes.activeCluster].join(' ') : classes.clusterMarker}
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 20}px`,
                                        height: `${10 + (pointCount / points.length) * 20}px`
                                    }}
                                    onClick={() => {
                                        // setActiveClusterId(cluster.id)
                                        // onClickCluster(cluster)
                                        /* if (cluster.properties.cluster === true) {
                                            console.log(cluster.type)
                                            console.log(supercluster.getLeaves(cluster.id))
                                        } else {
                                            console.log('isnt')
                                        } */
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            16
                                        )
                                        mapRef.current.setZoom(expansionZoom)
                                        mapRef.current.panTo({ lat: latitude, lng: longitude })
                                        console.log(mapRef.current.getZoom())
                                        if (mapRef.current.getZoom() === 16) {
                                            onClickCluster(cluster)
                                        }
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
                                <button className={(activeClusterId[0] === cluster.geometry.coordinates[0] && activeClusterId[1] === cluster.geometry.coordinates[1]) ? [classes.pointMarker, classes.activeCluster].join(' ') : classes.pointMarker} onClick={() => { onClickPoint(cluster) }}>
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
            {imgList && <AliceCarousel
                className={classes.carouselContainer}
                mouseTracking
                items={imgList}
                onSlideChange={(e) => console.log(e)}
                responsive={responsive}
                disableDotsControls={true}
            />}
        </div>
    )
}
export default MainMap
