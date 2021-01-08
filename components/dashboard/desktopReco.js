import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/modal/endGameInformation.style'
import Grow from '@material-ui/core/Grow'
import ButtonCloseModal from '../ui/modal/buttonCloseModal'

function DesktopReco (props, ref) {
    const classes = useStyles()
    const { open, handleClose } = props
    const [onTransition, setTransition] = useState(undefined)

    function onExited () {
        handleClose()
    }

    function transitionClose () {
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
                <ButtonCloseModal handleClose={transitionClose} className={classes.buttonClose}/>
                <Typography variant="h3" className={'modal-title'} align={'center'}>
                    Défi disponible uniquement sur Mobile ! Scan le code qr pour y jouer !
                </Typography>
            </Box>
        </Grow>
    )
}

export default React.forwardRef(DesktopReco)
