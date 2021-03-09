import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/getLocation.style'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow/Grow'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete'

function GetLocation (props, ref) {
    const classes = useStyles()
    // TODO add uiElements for translation
    const { open, gotoDashBoard, translation, setLocation } = props
    const [onTransition, setTransition] = useState(undefined)
    const [adresse, setAdresse] = useState(null)
    const [manualPosition, setManualPosition] = useState(null)
    const LocationStates = Object.freeze({
        LOADING: 'loading',
        GET_LOCATION: 'getLocation',
        AUTO_COMPLETE: 'autoComplete'
    })
    const [locationState, setLocationState] = useState(LocationStates.GET_LOCATION)

    function onExited () {
        gotoDashBoard()
    }

    function onCancel () {
        console.log('cancel clicked')
        setLocation(null)
        setLocationState(LocationStates.LOADING)
    }

    function manualPositionSend () {
        setLocationState(LocationStates.LOADING)
        const manualLocation = { coords: { latitude: manualPosition.lat, longitude: manualPosition.lon } }
        setLocation(manualLocation)
    }

    function onLocationError (error) {
        setLocationState(LocationStates.AUTO_COMPLETE)
        switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.')
            break
        case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.')
            break
        case error.TIMEOUT:
            console.log('The request to get user location timed out.')
            break
        case error.UNKNOWN_ERROR:
            console.log('An unknown error occurred.')
            break
        }
    }

    function onGetLocation () {
        setLocationState(LocationStates.LOADING)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLocation(position)
            }, onLocationError)
            /* la géolocalisation est disponible */
        } else {
            console.log('Non disponible')
            onCancel()
        }
    }

    function getModalContent (state) {
        switch (state) {
        case LocationStates.GET_LOCATION:
            return <React.Fragment>
                <Typography
                    variant="h3"
                    className={'modal-title'}
                    align={'center'}
                >{translation.challengeRecoGeoGetLocationTitle}</Typography>
                <Typography
                    variant="h4"
                    className={'modal-title'}
                    align={'center'}
                >{translation.challengeRecoGeoGetLocationSubtitle}</Typography>
                <Button
                    key={'ok'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onGetLocation} >
                    {translation.challengeRecoGeoGetLocationButtonValidation}
                </Button>
                <Button
                    key={'cancel'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onCancel} >
                    {translation.challengeRecoGeoGetLocationButtonCancel}
                </Button>
            </React.Fragment>
        case LocationStates.LOADING:
            return <CircularProgress/>
        case LocationStates.AUTO_COMPLETE:
            // TODO Ajouter restriction sur la clé d'API
            return <React.Fragment>
                <Box className={classes.autoComplete} >
                    <GooglePlacesAutocomplete
                        apiOptions={{ language: 'fr', region: 'ch' }}
                        autocompletionRequest={{
                            componentRestrictions: {
                                country: ['ch', 'fr']
                            }
                        }}
                        selectProps={{
                            DropdownIndicator: () => null,
                            isClearable: true,
                            blurInputOnSelect: true,
                            openMenuOnClick: false,
                            components: { DropdownIndicator: null },
                            // indicatorsContainer: () => null,
                            // DropdownIndicator: () => null,
                            noOptionsMessage: (value) => 'Pas doption',
                            placeholder: 'Votre adresse',
                            // apiKey: 'AIzaSyCqq7GNv66TpgfLkbIjuHVZXl-_sabL1_o',
                            adresse,
                            onLoadFailed: (error) => (
                                console.error('Could not inject Google script', error)
                            ),
                            onChange: setAdresse
                        }}
                    />
                </Box>
                <Button
                    key={'ok'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={manualPositionSend}
                    // eslint-disable-next-line no-unneeded-ternary
                    disabled={!adresse}
                >
                    {translation.challengeRecoGeoGetLocationButtonValidation}
                </Button>
                <Button
                    key={'cancel'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onCancel} >
                    {translation.challengeRecoGeoGetLocationButtonCancel}
                </Button>
            </React.Fragment>
        }
    }

    useEffect(() => {
        console.log('init')
        setLocation(false)
        setLocationState(LocationStates.GET_LOCATION)
        setTransition(open)
    }, [])

    function getCoordinate (results) {
        const location = results[0].geometry.location
        const manualLocation = { lat: location.lat(), lon: location.lng() }
        setManualPosition(manualLocation)
        console.log('Lat ', location.lat())
        console.log('Long ', location.lng())
    }

    useEffect(() => {
        if (adresse) {
            console.log(adresse)
            console.log(adresse.value.place_id)
            geocodeByPlaceId(adresse.value.place_id)
                .then(results => getCoordinate(results))
                .catch(error => console.error(error))
        }
    }, [adresse])
    return (
        <Grow
            in={onTransition}
            timeout={{
                appear: 1000,
                enter: 1000,
                exit: 500
            }}
            onExited={onExited}
        >
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                {getModalContent(locationState)}
            </Box>
        </Grow>
    )
}
export default React.forwardRef(GetLocation)
