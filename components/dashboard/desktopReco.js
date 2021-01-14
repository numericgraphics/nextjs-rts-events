import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/modal/desktopReco.style'
import Grow from '@material-ui/core/Grow'
import ButtonCloseModal from '../ui/modal/buttonCloseModal'
import QRCode from 'qrcode.react'
import { useRouter } from 'next/router'

function DesktopReco (props, ref) {
    const classes = useStyles()
    const { open, handleClose } = props
    const [onTransition, setTransition] = useState(undefined)
    const router = useRouter()
    const { events } = router.query
    const baseURL = window.location.origin
    const url = baseURL + '/' + events

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
                <Typography variant="subtitle1" className={'modal-title'} align={'center'}>
                    Défi disponible uniquement sur Mobile ! Scan le code qr pour y jouer !
                </Typography>
                <Box className={classes.QRBox}>
                    <QRCode value={url} />
                </Box>
            </Box>
        </Grow>
    )
}

export default React.forwardRef(DesktopReco)
