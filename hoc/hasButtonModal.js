import React, { useContext, useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import { useHeight } from '../hooks/useHeight'
import UserContext from '../components/UserContext'
import ThemeFactory from '../data/themeFactory'

const useStyles = makeStyles((theme = useTheme) => ({
    icon: {
        fontSize: '6rem',
        marginBottom: '10vw'
    },
    text: {
        color: theme.palette.secondary.main
    },
    textButton: {
        textTransform: 'none',
        color: theme.palette.secondary.main
    },
    overImage: {
        height: '100%',
        backgroundColor: theme.palette.secondary.contrastText,
        opacity: '0.9'
    }
}))

const hasButtonModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const { dataProvider, store } = useContext(UserContext)
        const { deviceDetection } = store
        const height = useHeight()
        const [translation, setTranslation] = useState([])
        const [open, setOpen] = useState(false)
        const [status, setStatus] = useState(false)
        const [poster, setPoster] = useState('')
        const [secondaryStatus, setSecondaryStatus] = useState(false)
        const [isOldDevice, setOldDevice] = useState(false)

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

        useEffect(() => {
            setTranslation(dataProvider.getTranslation())
        }, [])

        useEffect(() => {
            if (deviceDetection.isIos) {
                setOldDevice(deviceDetection.iosVersion < 13)
            }
        }, [deviceDetection])

        return (
            <Box>
                <WrappedComponent openModal={openModal} {...props} buttonModalCliked={status} setButtonModalCliked={setStatus} secondaryButtonClicked={secondaryStatus} />
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
                        <Box className={['backgroundModal', 'bg-top-cover'].join(' ')}
                            style={{ backgroundImage: `url(${poster})`, height: height }}>
                            <Box className={[classes.overImage, 'containerModal'].join(' ')}>
                                {isOldDevice
                                    ? <Box className={[classes.text, 'centered-content'].join(' ')}>
                                        <VolumeOffIcon className={classes.icon} />
                                        <Typography className={['regular-1-25', 'bottom-2-rem'].join(' ')}>
                                            {translation.challengeVideoTextStartMuted}
                                        </Typography>
                                        <Button
                                            key={'continueGame'}
                                            color="primary"
                                            variant="contained"
                                            className={['bottomButton', 'bottom-2-rem'].join(' ')}
                                            onClick={mutedVideoPlayer}
                                            startIcon={<VolumeUpIcon style={{ fontSize: '7vw' }} />}>
                                            {translation.challengeVideoButtonStartMuted}
                                        </Button>
                                    </Box>
                                    : <Box className={[classes.text, 'centered-content'].join(' ')}>
                                        <VolumeOffIcon className={classes.icon} />
                                        <Typography className={['regular-1-25', 'bottom-2-rem'].join(' ')}>
                                            {translation.challengeVideoTextUnMute}
                                        </Typography>
                                        <Button
                                            key={'continueGame'}
                                            color="primary"
                                            variant="contained"
                                            className={['bottomButton', 'bottom-2-rem'].join(' ')}
                                            onClick={startChallenge}
                                            startIcon={<VolumeUpIcon style={{ fontSize: '7vw' }} />}>
                                            {translation.challengeVideoButtonUnMute}
                                        </Button>
                                        <Button className={['regular-1-25 ', classes.textButton].join(' ')} onClick={mutedVideoPlayer}>
                                            {translation.challengeVideoButtonMute}
                                        </Button>
                                    </Box>}
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasButtonModal
