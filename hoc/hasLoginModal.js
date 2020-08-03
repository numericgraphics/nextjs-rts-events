import React, { useContext, useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import UserContext from '../components/UserContext'
import LoginTextField from '../components/ui/LoginTextField'
import Button from '@material-ui/core/Button'
import ReactCodeInput from 'react-code-input'

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '90vw',
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: 30
    },
    containerTitle: {
        position: 'relative',
        paddingBottom: 12
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.25em',
        letterSpacing: '0em'
    },
    button: {
        position: 'relative',
        borderRadius: 30,
        alignSelf: 'center',
        fontSize: '1.25rem',
        padding: '6px 20px',
        marginTop: 30
    },
    root: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        }
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

const styles = {
    caseStyle: {
        width: '42px',
        height: '48px',
        margin: '4px',
        paddingLeft: '12px',
        fontFamily: 'srgssr-type-Bd',
        color: '#020202',
        fontSize: '1.125rem'
    }
}

const hasLoginModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [loginState, setLoginState] = useState(ModalStates.PHONE_NUMBER)
        const [userData, setUserData] = useState({ phone: '', code: '' })
        const { dataProvider, store } = useContext(UserContext)
        const { setLoading, eventName } = store
        const [translation, setTranslation] = useState([])
        const theme = useTheme()
        const [disabled, setDisabled] = useState(true)

        const handleOpen = () => {
            setOpen(true)
        }

        useEffect(() => {
            setTranslation(dataProvider.getTranslation())
        }, [])

        useEffect(() => {
            setDisabled(userData.phone.length === 0)
        }, [userData.phone])

        useEffect(() => {
            setDisabled(userData.code.length === 0)
        }, [userData.code])

        const handleClose = () => {
            setLoginState(ModalStates.PHONE_NUMBER)
            setUserData({ phone: '', code: '', error: '' })
            setOpen(false)
        }

        function OpenModal () {
            handleOpen()
        }

        function onError (message) {
            setLoginState(ModalStates.ERROR)
            setUserData({ phone: '', code: '', error: message })
            setTimeout(() => {
                handleClose()
            }, 5000)
        }

        function resetPlaceHolder() {
            setNum('0')
        }

        async function handleSubmitPhoneNumber (event) {
            event.preventDefault()
            setDisabled(true)
            setUserData({ ...userData, error: '' })
            setLoginState(ModalStates.LOADING)
            const phone = userData.phone

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, eventName })
                })

                if (response.status === 200) {
                    await Router.push('/[events]/dashBoard', `/${eventName}/dashBoard`)
                    return
                }

                if (response.status === 302) {
                    setLoginState(ModalStates.NUMBER_RECEIVE)
                    return
                }

                if (response.status !== 200) {
                    onError(translation.modalLoginPhoneErrorText)
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
            setLoginState(ModalStates.LOADING)
            const code = userData.code
            try {
                const response = await fetch('/api/number', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, eventName })
                })

                if (response.status === 200) {
                    const content = await response.json()
                    const { nickname, avatarURL } = content
                    dataProvider.setData({ user: { nickname, avatarURL } })
                    setLoading(true)
                    await Router.push('/[events]/dashBoard', `/${eventName}/dashBoard`)
                    return
                }

                if (response.status !== 200) {
                    onError(translation.modalLoginNumberErrorText)
                }
            } catch (error) {
                console.error(error)
                setUserData({ ...userData, error: error.message })
            }
        }
        // TODO :  add translation for envoyer
        // TODO :  add error message centered and with right design
        function getLoginContent (state) {
            switch (state) {
            case ModalStates.NUMBER_RECEIVE:
                return <Box className={classes.modalContent}>
                    <Box className={classes.containerTitle}>
                        <Typography className={classes.title} variant="h4" align={'center'}>{translation.modalLoginNumberText}</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} noValidate autoComplete="off" onSubmit={handleSubmitNumberReceive}>
                        <ReactCodeInput inputMode={'numeric'} type='number' fields={4} inputStyle={styles.caseStyle} className={classes.reactCodeInput} id="numberReceive" value={userData.code} onChange={(data) => {
                            setUserData(
                                Object.assign({}, userData, { code: data })
                            )
                        }
                        } name={'login'}/>
                        <Button color="primary" variant="contained" className={classes.button} type="submit" disabled={disabled}>
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
                        <Typography className={classes.title} variant="h4" align={'center'}>{translation.modalLoginPhoneText}</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} noValidate autoComplete="off" onSubmit={handleSubmitPhoneNumber}>
                        <LoginTextField id="phoneNumber" placeHolder={'0041791234567'} value={userData.phone} onChange={(data) => {
                            setUserData(
                                Object.assign({}, userData, { phone: data })
                            )
                        }
                        }/>
                        <Button color="primary" variant="contained" className={classes.button} type="submit" disabled={disabled} >
                            Envoyer
                        </Button>
                    </form>
                </Box>
            case ModalStates.ERROR:
                return <Box className={classes.modalContent}>
                    <Typography className={classes.title} variant="h4" align={'center'}>Erreur</Typography>
                    {userData.error && <p className="error">Error: {userData.error}</p>}
                </Box>
            }
        }

        return (
            <Box>
                <WrappedComponent openModal={OpenModal} isModalOpen={open} {...props} />
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                        style: {
                            backgroundColor: theme.palette.secondary.main,
                            opacity: '0.8'
                        }
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
