import React, { useContext, useEffect, useState } from 'react'
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
import UserContext from '../components/UserContext'

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
                            {isOldDevice
                                ? <Box className='centered-content color-White'>
                                    <VolumeOffIcon className={classes.icon}/>
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
                                : <Box className='centered-content color-White'>
                                    <VolumeOffIcon className={classes.icon}/>
                                    <Typography className={'H3Title'}>
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
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasButtonModal
