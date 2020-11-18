import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import { useStyles } from '../styles/jsx/components/modal/hasCountDownModal.style'

const hasCountDownModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [progress, setProgress] = useState(0)
        const [status, setStatus] = useState(false)

        const handleOpen = () => {
            setStatus(false)
            setProgress(0)
            setOpen(true)
        }

        const handleClose = () => {
            setOpen(false)
        }

        function startCountDown () {
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? stopTimer() : prevProgress + 3))
            }, 100)
            function stopTimer () {
                setProgress(100)
                setStatus(true)
                handleClose()
                clearInterval(timer)
            }
        }

        function displayCountDownText () {
            if (Math.round(progress) >= 0 && Math.round(progress) < 30) {
                return '3'
            } else if (Math.round(progress) > 30 && Math.round(progress) < 60) {
                return '2'
            } else if (Math.round(progress) > 60 && Math.round(progress) < 90) {
                return '1'
                // eslint-disable-next-line no-mixed-operators
            } else if (Math.round(progress) > 90 || progress === undefined) {
                return 'GO!'
            }
        }

        function openModal () {
            handleOpen()
        }

        return (
            <Box>
                <WrappedComponent openCountDownModal={openModal} startCountDown={startCountDown} {...props} status={status} />
                <Modal
                    disableAutoFocus={true}
                    disableEnforceFocus
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={[classes.modal, 'containerModal'].join(' ')}
                    open={open}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 500,
                        style: { backgroundColor: 'none!important' }
                    }}
                    tabIndex={-1}
                >
                    <Box className={classes.containerProgress} >
                        <Fade in={open} timeout={1000}>
                            <Box position="relative" display="inline-flex">
                                <CircularProgress className={classes.bottomCircle} variant="static" size={300} thickness={0.5} value={100} />
                                <CircularProgress className={classes.topCircle} color={'secondary'} variant="static" size={300} thickness={0.5} value={progress} />
                                <Box
                                    top={0}
                                    left={0}
                                    bottom={0}
                                    right={0}
                                    position="absolute"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography className={classes.textProgress} style={{ color: 'white' }}>{displayCountDownText()}</Typography>
                                </Box>
                            </Box>
                        </Fade>
                    </Box>
                </Modal>
            </Box>
        )
    }
}

export default hasCountDownModal
