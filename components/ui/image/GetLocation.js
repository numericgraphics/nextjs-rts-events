import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/invalidImage.style'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow/Grow'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

function GetLocation (props, ref) {
    const classes = useStyles()
    // TODO add uiElements for translation
    const { open, gotoDashBoard, translation, setLocation } = props
    const [onTransition, setTransition] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const LocationStates = Object.freeze({
        ERROR: 'error',
        GET_LOCATION: 'getLocation'
    })
    const [locationState, setLocationState] = useState(LocationStates.GET_LOCATION)

    function onExited () {
        gotoDashBoard()
    }

    function onCancel () {
        setTransition(false)
    }

    function onLocationError (error) {
        setLocationState(LocationStates.ERROR)
        setIsLoading(false)
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
        setIsLoading(true)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLocation(position)
            }, onLocationError)
            /* la géolocalisation est disponible */
        } else {
            console.log('Non disponible')
            /* la géolocalisation n'est pas disponible */
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
                >Pour accéder à ce défi, vous devez activer la localisation</Typography>
                <Button
                    key={'ok'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onGetLocation} >
            Continuer
                </Button>
            </React.Fragment>
        case LocationStates.ERROR:
            return <Typography
                variant="h3"
                className={'modal-title'}
                align={'center'}
            >Problème pour vous localisez</Typography>
        }
    }

    useEffect(() => {
        setTransition(open)
    }, [])

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
            {!isLoading
                ? <Box ref={ref}
                    className={classes.modalContent}
                    tabIndex={'-1'} >
                    {getModalContent(locationState)}
                    <Button
                        key={'cancel'}
                        className={['text2', classes.textButton].join(' ')}
                        onClick={onCancel} >
                        {translation.challengeQuestionImageCancel}
                    </Button>
                </Box>
                : <CircularProgress/>}
        </Grow>
    )
}
export default React.forwardRef(GetLocation)
