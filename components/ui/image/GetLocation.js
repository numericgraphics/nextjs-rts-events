import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/invalidImage.style'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow/Grow'

function GetLocation (props, ref) {
    const classes = useStyles()
    // TODO add uiElements for translation
    const { open, gotoDashBoard, translation, setLocation } = props
    const [onTransition, setTransition] = useState(undefined)

    function onExited () {
        gotoDashBoard()
    }

    function onCancel () {
        setTransition(false)
    }

    function onGetLocation () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLocation(position)
            })
            /* la géolocalisation est disponible */
        } else {
            console.log('Non disponible')
            /* la géolocalisation n'est pas disponible */
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
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                <Typography
                    variant="h3"
                    className={'modal-title'}
                    align={'center'}
                >Pour accéder à se défi, vous devez activer la localisation</Typography>
                <Button
                    key={'ok'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onGetLocation} >
                    Continuer
                </Button>
                <Button
                    key={'cancel'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onCancel} >
                    {translation.challengeQuestionImageCancel}
                </Button>
            </Box>
        </Grow>
    )
}
export default React.forwardRef(GetLocation)
