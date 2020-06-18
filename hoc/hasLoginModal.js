import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '70vw',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.75)',
        padding: 15
    },
    containerTitle: {
        position: 'relative',
        paddingBottom: 12
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        lineHeight: '1em'
    },
    button: {
        position: 'relative',
        borderRadius: 20,
        alignSelf: 'center'
    },
    textField: {
        padding: 20
    }
}))

const hasLoginModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = React.useState(false)

        const handleOpen = () => {
            setOpen(true)
        }

        const handleClose = () => {
            setOpen(false)
        }
        // eslint-disable-next-line no-unused-vars
        async function handleVerify () {
            try {
                const response = await fetch('/api/verify')
                if (response.status === 200) {
                    console.log('openModal 200')
                } else {
                    console.log('openModal 303')
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }

        function OpenModal () {
            console.log('openModal')
            // handleVerify().then()
            handleOpen()
        }

        return (
            <Box>
                <WrappedComponent openModal={OpenModal} {...props} />
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.modalContent}>
                            <Box className={classes.containerTitle}>
                                <Typography className={classes.title} variant="h6" align={'center'}>Afin de pouvoir jouer merci d’inscrire votre numéro de mobile</Typography>
                            </Box>
                            <form className={classes.textField} noValidate autoComplete="off">
                                <TextField id="outlined-basic" variant="outlined" />
                            </form>
                            <Button variant="contained" className={classes.button}>
                                Envoyer
                            </Button>
                        </div>
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasLoginModal
