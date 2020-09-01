import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import LazyImage from '../../components/ui/LazyImage'
import { useHeight } from '../../hooks/useHeight'
import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: 30
    },
    closeIcon: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '10vw',
        height: '10vw',
        color: 'red',
        zIndex: 4
    },
    containerText: {
        position: 'fixed',
        paddingBottom: '10vh',
        bottom: '0',
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '100%',
        backgroundColor: 'blue',
        zIndex: 3
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5em',
        letterSpacing: '0em'
    },
    description: {
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

    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        zIndex: 3,
        background: 'linear-gradient(to top, rgba(0, 0, 255, 1) 10%,rgba(0,0,0,0) 35%)'
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
    },
    containerImage: {
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        width: '100vw',
        backgroundColor: 'white'
    }
}
const ModalStates = Object.freeze({
    GIFTS_BOX: 'phoneNumber',
    NUMBER_RECEIVE: 'numberReceive',
    LOADING: 'loading',
    ERROR: 'error'
})

const hasLoginModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [loginState, setLoginState] = useState(ModalStates.GIFTS_BOX)
        const height = useHeight()
        const [gift, setGift] = useState({ description: '', title: '' })
        const [imageURL, setImageURL] = useState()

        useEffect(() => {
            setImageURL(gift.imageURL)
        }, [gift.imageURL])

        const handleOpen = () => {
            setOpen(true)
        }

        const setMGift = (gift) => {
            setGift(gift)
        }

        const handleClose = () => {
            setLoginState(ModalStates.GIFTS_BOX)
            // reset modal value setUserData({ phone: '', code: '', error: '' })
            setOpen(false)
        }

        function OpenModal () {
            handleOpen()
        }

        /* function onError (message) {
            setLoginState(ModalStates.ERROR)
            setTimeout(() => {
                handleClose()
            }, 5000)
        } */
        // TODO :  add translation for envoyer
        // TODO :  add error message centered and with right design
        console.log(gift)
        function getLoginContent (state) {
            switch (state) {
            case ModalStates.LOADING:
                return <Box className={classes.modalContent}>
                    <CircularProgress color="secondary"/>
                </Box>
            case ModalStates.GIFTS_BOX:
                return <Box className={classes.modalContent}>
                    <Box className={classes.gradient} />
                    <LazyImage style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})`, minHeight: height }}/>
                    <CancelIcon className={classes.closeIcon} onClick={handleClose} />
                    <Box className={classes.containerText}>
                        <Typography className={classes.title} variant="h4" align={'center'}>{gift.title}</Typography>
                        <Typography className={classes.description} variant="h4" align={'center'}>{gift.locked ? gift.lockedMessage : gift.description}</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} noValidate autoComplete="off" >
                    </form>
                </Box>
            case ModalStates.ERROR:
                return <Box className={classes.modalContent}>
                    <Typography className={classes.title} variant="h4" align={'center'}>Erreur</Typography>
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
