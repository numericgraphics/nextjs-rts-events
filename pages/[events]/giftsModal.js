import React, { useState, useEffect, useRef, createRef } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import LazyImage from '../../components/ui/LazyImage'
import { useHeight } from '../../hooks/useHeight'
import CancelIcon from '@material-ui/icons/Cancel'
import { useTheme } from '@material-ui/core/styles'
import { lockIcon } from '../../components/gifts/icon'

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
    lock: {
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '10vw',
        height: '10vw',
        fill: 'red',
        zIndex: 4
    },
    lockContainer: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    svgIco: {
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px'
    },
    containerText: {
        position: 'fixed',
        paddingBottom: '5vh',
        bottom: '0',
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '100%',
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
        height: '20vh',
        flexGrow: 1,
        zIndex: 2,
        bottom: 0
    }
}))

const hasLoginModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const height = useHeight()
        const [gift, setGift] = useState({ description: '', title: '', locked: true })
        const [imageURL, setImageURL] = useState()
        const theme = useTheme()
        const boxTextRef = useRef()
        const [lockHeight, setLockHeight] = useState(0)
        const lockIconRef = createRef()
        const [boxHeight, setBoxHeight] = useState(0)

        const styles = {
            containerImage: {
                position: 'absolute',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'auto 100%',
                width: '100vw',
                backgroundColor: 'white'
            },
            gradient: {
                background: `linear-gradient(to top, ${theme.palette.secondary.main} 10%,${theme.palette.secondary.main + '00'} 100%)`,
                marginBottom: gift.locked ? (lockHeight + boxHeight) - 6 : boxHeight - 1
            },
            lockContainer: {
                backgroundColor: theme.palette.secondary.main,
                zIndex: 3
            }
        }

        useEffect(() => {
            setImageURL(gift.imageURL)
        }, [gift.imageURL])

        useEffect(() => {
            function handleResize () {
            // eslint-disable-next-line no-unused-expressions
                boxTextRef.current ? setBoxHeight(boxTextRef.current.clientHeight) : null
                // eslint-disable-next-line no-unused-expressions
                lockIconRef.current ? setLockHeight(lockIconRef.current.clientHeight) : null
            }
            // eslint-disable-next-line no-unused-expressions
            window.addEventListener('resize', handleResize)
        }, [boxTextRef.current])

        useEffect(() => {
            if (boxTextRef.current) {
                setBoxHeight(boxTextRef.current.clientHeight)
                if (gift.locked && lockIconRef.current) {
                    setLockHeight(lockIconRef.current.clientHeight)
                }
            }
        })

        const handleOpen = () => {
            setOpen(true)
        }

        const handleClose = () => {
            // reset modal value setUserData({ phone: '', code: '', error: '' })
            setOpen(false)
        }

        return (
            <Box>
                <WrappedComponent setGift={setGift} openModal={handleOpen} isModalOpen={open} {...props} />
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
                        <Box className={classes.modalContent}>
                            {gift.locked ? <Box className={classes.lockContainer} style={{ ...styles.lockContainer, bottom: boxHeight - 1 }}>
                                {lockIcon({ ref: lockIconRef, className: classes.lock })}
                            </Box> : null }
                            <Box className={classes.containerText} ref={ boxTextRef } style={{ backgroundColor: theme.palette.secondary.main }}>
                                <Typography className={classes.title} variant="h4" align={'center'}>{gift.title}</Typography>
                                <Typography className={classes.description} variant="h4" align={'center'}>{gift.locked ? gift.lockedMessage : gift.description}</Typography>
                            </Box>
                            <Box className={classes.gradient} style={{ ...styles.gradient }} />
                            <LazyImage style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})`, minHeight: height }}/>
                            <CancelIcon className={classes.closeIcon} onClick={handleClose} />
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasLoginModal
