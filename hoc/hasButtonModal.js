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
import { useHeight } from '../hooks/useHeight'

const useStyles = makeStyles(() => ({
    icon: {
        fontSize: '6rem',
        marginBottom: '10vw'
    },
    textButton: {
        textTransform: 'none',
        color: 'white'
    }

}))

const hasButtonModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const height = useHeight()
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
                    className='containerModal'
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
                        <Box className={['backgroundModal', 'containerModal', 'bg-top-cover'].join(' ')}
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${poster})`, height: height }}>
                            <Box className='centered-content color-White'>
                                <VolumeOffIcon className={classes.icon}/>
                                <Typography className={['regular-1-25', 'bottom-2-rem'].join(' ')}>
                                    Pour une meilleure expérience du jeux veuillez activer le son.
                                </Typography>
                                <Button
                                    key={'continueGame'}
                                    color="primary"
                                    variant="contained"
                                    className={['bottomButton', 'bottom-2-rem'].join(' ')}
                                    onClick={startChallenge}
                                    startIcon={<VolumeUpIcon style={{ fontSize: '7vw' }} />}>
                                    activer le son
                                </Button>
                                <Button className={['regular-1-25 ', classes.textButton].join(' ')} onClick={mutedVideoPlayer}>
                                    Ne pas activer le son
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasButtonModal
