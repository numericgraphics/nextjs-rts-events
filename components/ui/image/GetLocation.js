import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/getLocation.style'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow/Grow'
import { CommunityIcon } from '../../../data/icon'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete'
import { CustomDisabledButton } from '../button/CustomDisabledButton'
import { useTheme } from '@material-ui/core/styles'

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
    const theme = useTheme()

    function onExited () {
        gotoDashBoard()
    }

    function onCancel () {
        setLocation(null)
        setLocationState(LocationStates.LOADING)
    }

    function manualPositionSend () {
        setLocationState(LocationStates.LOADING)
        const manualLocation = { coords: { latitude: manualPosition.lat, longitude: manualPosition.lon } }
        setLocation(manualLocation)
    }

    function handledFieldClear () {
        setAdresse('')
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
            setLocationState(LocationStates.AUTO_COMPLETE)
        }
    }

    const customStyles = {
        clearIndicator: (provided, state) => ({
            ...provided,
            color: theme.palette.secondary.main
        }),
        control: base => ({
            ...base,
            height: 50,
            minHeight: 50,
            fontSize: '1.4rem'
        })
    }

    function getModalContent (state) {
        switch (state) {
        case LocationStates.GET_LOCATION:
            return <React.Fragment>
                {CommunityIcon({ className: classes.icon })}
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
                    color="secondary"
                    variant="contained"
                    className={['button', classes.button].join(' ')}
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
                {CommunityIcon({ className: classes.icon })}
                <Typography
                    variant="h3"
                    className={'modal-title'}
                    align={'center'}
                    color='textPrimary'
                >{translation.challengeRecoAutoCompleteTitle}</Typography>
                <Typography
                    variant="h4"
                    className={'modal-title'}
                    align={'center'}
                    color='textPrimary'
                >{translation.challengeRecoAutoCompleteSubtitle}</Typography>
                <Box className={classes.autoComplete} >
                    <GooglePlacesAutocomplete
                        apiOptions={{ language: 'fr', region: 'ch' }}
                        autocompletionRequest={{
                            componentRestrictions: {
                                country: ['ch']
                            }
                        }}
                        selectProps={{
                            onFocus: handledFieldClear,
                            DropdownIndicator: () => null,
                            isClearable: true,
                            blurInputOnSelect: true,
                            openMenuOnClick: false,
                            styles: customStyles,
                            components: { DropdownIndicator: null },
                            noOptionsMessage: (value) => translation.challengeRecoAutoCompleteNoResults,
                            loadingMessage: (value) => translation.challengeRecoAutoCompleteLoading,
                            placeholder: translation.challengeRecoAutoCompletePlaceholder,
                            value: adresse,
                            onLoadFailed: (error) => (
                                console.error('Could not inject Google script', error)
                            ),
                            onChange: setAdresse,
                            theme: (themeComp) => ({
                                ...themeComp,
                                borderRadius: 0,
                                colors: {
                                    ...themeComp.colors,
                                    primary: theme.palette.secondary.main
                                }
                            })
                        }}
                    />
                </Box>
                <CustomDisabledButton
                    key={'ok'}
                    color="secondary"
                    variant="contained"
                    className={['button', classes.button].join(' ')}
                    onClick={manualPositionSend}
                    // eslint-disable-next-line no-unneeded-ternary
                    disabled={!adresse}
                >
                    {translation.challengeRecoAutoCompleteStart}
                </CustomDisabledButton>
                <Button
                    key={'cancel'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onCancel} >
                    {translation.challengeRecoAutoCompleteCancel}
                </Button>
            </React.Fragment>
        }
    }

    useEffect(() => {
        setLocation(false)
        setLocationState(LocationStates.GET_LOCATION)
        setTransition(open)
    }, [])

    function getCoordinate (results) {
        const location = results[0].geometry.location
        const manualLocation = { lat: location.lat(), lon: location.lng() }
        setManualPosition(manualLocation)
    }

    useEffect(() => {
        if (adresse) {
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
            {getModalContent(locationState)}
        </Grow>
    )
}
export default React.forwardRef(GetLocation)
