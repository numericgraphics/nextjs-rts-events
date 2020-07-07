import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'

    },
    containerProgress: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'none'
    },
    textProgress: {
        color: 'white',
        fontFamily: 'srgssr-type-Bd',
        fontSize: '6rem'
    },
    bottomCircle: {
        color: 'white'
    },
    topCircle: {
        position: 'absolute',
        left: 0
    }
}))

const hasCountDownModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [progress, setProgress] = useState(0)

        const handleOpen = () => {
            setOpen(true)
        }

        const handleClose = () => {
            setOpen(false)
        }

        function startTimer () {
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? stopTimer() : prevProgress + 3))
            }, 100)
            function stopTimer () {
                setProgress(100)
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
                <WrappedComponent openModal={openModal} startTimer={startTimer} {...props} />
                <Modal
                    disableAutoFocus={true}
                    disableEnforceFocus
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                        style: { backgroundColor: 'gray' }
                    }}
                    tabIndex={-1}
                >
                    <Fade in={open}>
                        <Box className={classes.containerProgress} >
                            <Box position="relative" display="inline-flex">
                                <CircularProgress className={classes.bottomCircle} variant="static" size={300} thickness={0.5} value={100} />
                                <CircularProgress className={classes.topCircle} variant="static" size={300} thickness={0.5} value={progress} />
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
                                    <Typography className={classes.textProgress}>{displayCountDownText()}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasCountDownModal
