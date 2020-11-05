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
import UserContext from '../hooks/userContext'
import { useStylesGlobal } from '../styles/global.style'
import LazyImage from '../components/ui/LazyImage'

const useStyles = makeStyles((theme = useTheme) => ({
    icon: {
        fontSize: '6rem',
        marginBottom: '10vw'
    },
    text: {
        color: theme.palette.secondary.main,
        position: 'absolute'
    },
    textButton: {
        textTransform: 'none',
        color: theme.palette.secondary.main
    },
    overImage: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        height: '100%',
        width: '100%'
    }
}))

const hasButtonModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const stylesGlobal = useStylesGlobal()
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
                    <Box className={['backgroundModal', 'containerModal', 'bg-top-cover'].join(' ')}>
                        {/* TODO: utiliser LazyImage plutôt que les trois box */}
                        <Box className={[classes.backgroundImage].join(' ')}
                            style={{
                                backgroundImage: `url(${poster})`,
                                height: height
                            }}/>
                        <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage, 'containerModal'].join(' ')}/>
                        <Box className={[stylesGlobal.colorOverImage, classes.overImage, 'containerModal'].join(' ')}/>
                        {isOldDevice
                            ? <Box className={[classes.text, 'centered-content'].join(' ')}>
                                <VolumeOffIcon className={classes.icon} />
                                <Typography className={'H3Title'}>
                                    {translation.challengeVideoTextStartMuted}
                                </Typography>
                                <Button
                                    key={'continueGame'}
                                    color="primary"
                                    variant="contained"
                                    className={'button'}
                                    onClick={mutedVideoPlayer}
                                    startIcon={<VolumeUpIcon style={{ fontSize: '7vw' }} />}>
                                    {translation.challengeVideoButtonStartMuted}
                                </Button>
                            </Box>
                            : <Box className={[classes.text, 'centered-content'].join(' ')}>
                                <VolumeOffIcon className={classes.icon} />
                                <Typography variant="h3">
                                    {translation.challengeVideoTextUnMute}
                                </Typography>
                                <Button
                                    key={'continueGame'}
                                    color="primary"
                                    variant="contained"
                                    className={'button'}
                                    onClick={startChallenge}
                                    startIcon={<VolumeUpIcon style={{ fontSize: '7vw' }} />}>
                                    {translation.challengeVideoButtonUnMute}
                                </Button>
                                <Button className={['text2', classes.textButton].join(' ')} onClick={mutedVideoPlayer}>
                                    {translation.challengeVideoButtonMute}
                                </Button>
                            </Box>}

                    </Box>
                </Modal>
            </Box>
        )
    }
}

export default hasButtonModal
