import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'

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
        margin: 10
    },
    title: {

        fontFamily: 'srgssr-type-Bd',
        textAlign: 'center',
        fontSize: '2rem'
    },
    text: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem',
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 30
    },
    button: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
    }
}))

const hasButtonModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [status, setStatus] = useState(false)

        const startChallenge = () => {
            setOpen(false)
            setStatus(true)
        }

        function openModal () {
            setOpen(true)
            setStatus(false)
        }

        return (
            <Box>
                <WrappedComponent openModal={openModal} {...props} status={status} setStatus={setStatus} />
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
                        <Box className={classes.container} >
                            <Typography className={classes.title}>
                                    Challenge video
                            </Typography>
                            <Typography className={classes.text}>
                                    Clicquez ci-dessous pour commencer le defis
                            </Typography>
                            <Button key={'continueGame'} color="primary" variant="contained" className={classes.button} onClick={startChallenge}>
                                    Commencer
                            </Button>
                        </Box>
                    </Fade>

                </Modal>
            </Box>
        )
    }
}

export default hasButtonModal
