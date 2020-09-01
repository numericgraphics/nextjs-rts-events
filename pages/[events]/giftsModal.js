import React, { useContext, useEffect, useState, useRef } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import UserContext from '../../components/UserContext'
import Button from '@material-ui/core/Button'
import LazyImage from '../../components/ui/LazyImage'
import { useHeight } from '../../hooks/useHeight'

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
        minHeight: '100vh',
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
        fontSize: '1.5em',
        letterSpacing: '0em'
    },
    subtitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.25em',
        letterSpacing: '0em'
    },
    button: {
        position: 'relative',
        borderRadius: 30,
        alignSelf: 'center',
        fontSize: '1rem',
        padding: '6px 20px',
        marginTop: 30
    },
    root: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        }
    },
    textFieldContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'

    }
}))
const styles = {
    caseStyle: {
        width: '42px',
        height: '48px',
        margin: '4px',
        fontFamily: 'srgssr-type-Bd',
        color: '#020202',
        fontSize: '1.125rem'
    },
    textField: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.125rem',
        color: '#020202',
        border: 'none',
        width: '100%',
        backgroundColor: 'white'
    }
}
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
        const [open, setOpen] = useState(false)
        const [loginState, setLoginState] = useState(ModalStates.PHONE_NUMBER)
        const [userData, setUserData] = useState({ phone: '', code: '' })
        const { dataProvider, store } = useContext(UserContext)
        const { setLoading, eventName } = store
        const [translation, setTranslation] = useState([])
        const theme = useTheme()
        const [disabled, setDisabled] = useState(true)
        const [code, setCode] = useState()
        const smsSubmit = useRef()
        const height = useHeight()
        const [gift, setGift] = useState()

        const handleOpen = () => {
            setOpen(true)
        }

        const setMGift = (gift) => {
            setGift(gift)
        }

        useEffect(() => {
            setTranslation(dataProvider.getTranslation())
        }, [])

        const handleClose = () => {
            setLoginState(ModalStates.PHONE_NUMBER)
            // reset modal value setUserData({ phone: '', code: '', error: '' })
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
        // TODO :  add translation for envoyer
        // TODO :  add error message centered and with right design
        function getLoginContent (state) {
            switch (state) {
            case ModalStates.LOADING:
                return <Box className={classes.modalContent}>
                    <CircularProgress color="secondary"/>
                </Box>
            case ModalStates.PHONE_NUMBER:
                return <Box className={classes.modalContent}>
                    <LazyImage style={{ ...styles.containerImage, backgroundColor: 'black', minHeight: height, filter: 'blur(4px)' }}/>
                    <Box className={classes.containerTitle}>
                        <Typography className={classes.title} variant="h4" align={'center'}>Une montre luxueuse de la FeVi.</Typography>
                        <Typography className={classes.subtitle} variant="h4" align={'center'}>A partir de 2000 points gagné, participer au tirage au sort</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} noValidate autoComplete="off" >
                        <Button ref={smsSubmit} color="primary" variant="contained" className={classes.button} type="submit" disabled={disabled} >
                            Participer au tirage
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
                <WrappedComponent setGift={setMGift} openModal={OpenModal} isModalOpen={open} {...props} />
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
