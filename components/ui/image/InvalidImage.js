import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/invalidImage.style'
import Typography from '@material-ui/core/Typography'
import { ColorBorderButton } from '../button/ColorBorderButton'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow/Grow'

function InvalidImage (props, ref) {
    const classes = useStyles()
    const { open, reSnap, gotoDashBoard } = props
    const [onTransition, setTransition] = useState(undefined)
    const [onRetry, setRetry] = useState(false)

    function onExited () {
        onRetry ? reSnap() : gotoDashBoard()
    }

    function onTryAgain () {
        setRetry(true)
        setTransition(false)
    }

    function onCancel () {
        setTransition(false)
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
                    dangerouslySetInnerHTML={{ __html: 'Votre photo n est pas valide. Voulez vous recommencer ?' }}
                />
                <Button
                    key={'resnap'}
                    color="secondary"
                    variant="contained"
                    className={'button'}
                    onClick={onTryAgain} >
                    Reprendre
                </Button>
                <ColorBorderButton
                    key={'cancel'}
                    variant="outlined"
                    className={'buttonAlt'}
                    onClick={onCancel} >
                    Annuler
                </ColorBorderButton>
            </Box>
        </Grow>
    )
}
export default React.forwardRef(InvalidImage)
