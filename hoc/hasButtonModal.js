import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'

    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        color: 'white',
        margin: 10,
        width: '100vw',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'auto 100%',
        backgroundColor: 'black'
    },
    text: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '5vw',
        textAlign: 'center',
        lineHeight: '6vw',
        marginBottom: '10vw'
    },
    button: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginBottom: '10vw'
    },
    icon: {
        fontSize: '18vw',
        marginBottom: '10vw'
    },
    textButton: {
        textTransform: 'none',
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '4vw'
    },
    poster: {
        zIndex: 1,
        position: 'absolute',
        width: '100vw',
        minHeight: '100vh',
        top: 0,
        left: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundColor: 'black'
    }

}))

const hasButtonModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [status, setStatus] = useState(false)
        const [poster, setPoster] = useState('')
        const [secondaryStatus, setSecondaryStatus] = useState(false)

        const startChallenge = () => {
            setOpen(false)
            setStatus(true)
        }

        const mutedVideoPlayer = () => {
            setSecondaryStatus(true)
            startChallenge()
        }

        function openModal (image) {
            setPoster(image)
            setOpen(true)
            setStatus(false)
        }

        return (
            <Box>
                <WrappedComponent openModal={openModal} {...props} buttonModalCliked={status} setButtonModalCliked={setStatus} secondaryButtonClicked={secondaryStatus}/>
                <Modal
                    disableAutoFocus={true}
                    disableEnforceFocus
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                        style: { backgroundColor: 'none' }
                    }}
                    tabIndex={-1}
                >
                    <Fade in={open} timeout={1000}>
                        <Box className={classes.container} style={{ backgroundImage: `url(${poster})` }}>
                            <VolumeOffIcon className={classes.icon}/>
                            <Typography className={classes.text}>
                                Pour une meilleure expérience du jeux veuillez activer le son.
                            </Typography>
                            <Button
                                key={'continueGame'}
                                color="primary"
                                variant="contained"
                                className={classes.button}
                                onClick={startChallenge}
                                startIcon={<VolumeUpIcon style={{ fontSize: '7vw' }} />}>
                                activer le son
                            </Button>
                            <Button className={classes.textButton} onClick={mutedVideoPlayer}>
                                Ne pas activer le son
                            </Button>
                        </Box>
                    </Fade>

                </Modal>
            </Box>
        )
    }
}

export default hasButtonModal
