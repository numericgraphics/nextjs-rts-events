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
import SvgIcon from '@material-ui/core/SvgIcon'

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
        const [gift, setGift] = useState({ description: '', title: '' })
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
                marginBottom: gift.locked ? (lockHeight + boxHeight) - 1 : boxHeight - 1
            },
            lockContainer: {
                backgroundColor: theme.palette.secondary.main
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
                lockIconRef.current && gift.locked ? setLockHeight(lockIconRef.current.clientHeight) : null
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

        const setMGift = (gift) => {
            setGift(gift)
        }

        const handleClose = () => {
            // reset modal value setUserData({ phone: '', code: '', error: '' })
            setOpen(false)
        }

        function lockIcon (ref) {
            return (
                <SvgIcon viewBox="0 0 34 34" className={classes.lock} ref={ref}>
                    <svg style={{ fill: 'green' }} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20">
                        <g id="Icon_cadenas" transform="translate(-121.876 -31.844)">
                            <path id="cadena" d="M11.291,6.346h-.339L10.57,4.14A5.039,5.039,0,1,0,.642,5.88l.382,2.291h-.3A.933.933,0,0,0-.037,9.316h0l1.4,7.891a.933.933,0,0,0,1.1.764L13.03,16.1a.933.933,0,0,0,.764-1.1h0l-1.4-7.891a.933.933,0,0,0-1.1-.764ZM2.636,5.54A3.055,3.055,0,1,1,8.618,4.48h0L9,6.771,3.018,7.831ZM7.6,11.777l.424,2.376a.764.764,0,0,1-1.485.255l-.424-2.376A1.23,1.23,0,1,1,7.77,11.48Z" transform="translate(124.94 32.875)" fill="#fff"/>
                            <rect id="Rectangle_2163" data-name="Rectangle 2163" width="20" height="20" transform="translate(121.876 31.844)" fill="none" opacity="0.166"/>
                        </g>
                    </svg>
                </SvgIcon>
            )
        }

        return (
            <Box>
                <WrappedComponent setGift={setMGift} openModal={handleOpen} isModalOpen={open} {...props} />
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
                                {lockIcon(lockIconRef)}
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
