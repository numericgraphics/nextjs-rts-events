import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

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
        minHeight: 200,
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
        paddingBottom: 12
    },
    textFieldContainer: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))
const ModalStates = Object.freeze({
    PHONE_NUMBER: 'phoneNumber',
    NUMBER_RECEIVE: 'numberReceive',
    LOADING: 'loading',
    ERROR: 'error'
})

const hasLoginModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = React.useState(false)
        const [loginState, setLoginState] = React.useState(ModalStates.PHONE_NUMBER)
        const [userData, setUserData] = useState({ phone: '', code: '' })

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
            handleOpen()
        }

        function onError (message) {
            setLoginState(ModalStates.ERROR)
            setUserData({ phone: '', code: '', error: message })
            setTimeout(() => {
                setLoginState(ModalStates.PHONE_NUMBER)
                setUserData({ phone: '', code: '', error: '' })
                handleClose()
            }, 5000)
        }

        async function handleSubmitPhoneNumber (event) {
            event.preventDefault()
            setUserData({ ...userData, error: '' })
            setLoginState(ModalStates.LOADING)

            const phone = userData.phone

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone })
                })

                if (response.status === 200) {
                    await Router.push('/dashBoard')
                    return
                }

                if (response.status === 302) {
                    setLoginState(ModalStates.NUMBER_RECEIVE)
                    return
                }

                if (response.status !== 200) {
                    onError("Nous n'arrivons pas a trouver votre telephone")
                }
            } catch (error) {
                console.error(error)
                setLoginState(ModalStates.ERROR)
                setUserData({ ...userData, error: error.message })
            }
        }

        async function handleSubmitNumberReceive (event) {
            event.preventDefault()
            setUserData({ ...userData, error: '' })
            const code = userData.code
            console.log('code', code)
            try {
                const response = await fetch('/api/number', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code })
                })

                console.log('response', response)
                if (response.status === 200) {
                    await Router.push('/dashBoard')
                    return
                }

                if (response.status !== 200) {
                    onError("le code n'est pas le bon")
                }
            } catch (error) {
                console.error(error)
                setUserData({ ...userData, error: error.message })
            }
        }

        function getLoginContent (state) {
            switch (state) {
            case ModalStates.NUMBER_RECEIVE:
                return <Box className={classes.modalContent}>
                    <Box className={classes.containerTitle}>
                        <Typography className={classes.title} variant="h6" align={'center'}>Veuillez compléter par le numéro reçu par sms.</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} noValidate autoComplete="off" onSubmit={handleSubmitNumberReceive}>
                        <TextField
                            className={classes.textField}
                            id="numberReceive"
                            variant="outlined"
                            type="number"
                            value={userData.code}
                            onChange={event =>
                                setUserData(
                                    Object.assign({}, userData, { code: event.target.value })
                                )
                            }/>

                        <Button variant="contained" className={classes.button} type="submit">
                            Envoyer
                        </Button>
                    </form>
                </Box>
            case ModalStates.LOADING:
                return <Box className={classes.modalContent}>
                    <CircularProgress />
                </Box>
            case ModalStates.PHONE_NUMBER:
                return <Box className={classes.modalContent}>
                    <Box className={classes.containerTitle}>
                        <Typography className={classes.title} variant="h6" align={'center'}>Afin de pouvoir jouer merci d’inscrire votre numéro de mobile</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} noValidate autoComplete="off" onSubmit={handleSubmitPhoneNumber}>
                        <TextField
                            className={classes.textField}
                            id="phoneNumber"
                            variant="outlined"
                            type="number"
                            value={userData.phone}
                            onChange={event =>
                                setUserData(
                                    Object.assign({}, userData, { phone: event.target.value })
                                )
                            }/>
                        <Button variant="contained" className={classes.button} type="submit" >
                            Envoyer
                        </Button>
                    </form>
                </Box>
            case ModalStates.ERROR:
                return <Box className={classes.modalContent}>
                    <Typography className={classes.title} variant="h6" align={'center'}>Erreur</Typography>
                    {userData.error && <p className="error">Error: {userData.error}</p>}
                </Box>
            }
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
                        {getLoginContent(loginState)}
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasLoginModal
