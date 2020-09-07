import React, { useState, useEffect, useRef, createRef } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import LazyImage from '../../components/ui/LazyImage'
import { useHeight } from '../../hooks/useHeight'
import { useTheme } from '@material-ui/core/styles'
import { lockIcon, closeIcon } from '../../components/gifts/icon'
import IconButton from '@material-ui/core/IconButton'

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
    closeBtn: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '10vw',
        height: '10vw',
        zIndex: 4
    },
    lock: {
        minHeight: '68px',
        minWidth: '68px',
        maxHeight: '116px',
        maxWidth: '116px',
        width: '20vw',
        height: '20vw',
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
        fontSize: '1.75em',
        letterSpacing: '0em'
    },
    description: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25em',
        letterSpacing: '0em'
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

    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '20vh',
        flexGrow: 1,
        zIndex: 2,
        bottom: 0
    },
    closeIcon: {
        position: 'absolute',
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '10vw',
        height: '10vw'
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
                marginBottom: boxHeight - 1
            },
            lockContainer: {
                zIndex: 3,
                fill: theme.palette.secondary.contrastText
            },
            closeBtn: {
                backgroundColor: theme.palette.primary.main,
                stroke: theme.palette.primary.contrastText
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
            }
            // eslint-disable-next-line no-unused-expressions
            window.addEventListener('resize', handleResize)
        }, [boxTextRef.current])

        useEffect(() => {
            if (boxTextRef.current) {
                setBoxHeight(boxTextRef.current.clientHeight)
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
                    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                        <Box className={classes.modalContent}>
                            {gift.locked ? <Box className={classes.lockContainer} style={{ ...styles.lockContainer, bottom: boxHeight - 1 }}>
                                {lockIcon({ ref: lockIconRef, className: classes.lock })}
                            </Box> : null }
                            <Box className={classes.containerText} ref={ boxTextRef } style={{ backgroundColor: theme.palette.secondary.main }}>
                                <Typography className={classes.title} variant="h4" align={'center'}>{gift.title}</Typography>
                                <Typography className={classes.description} variant="h4" align={'center'}>{gift.locked ? gift.lockedMessage : gift.message}</Typography>
                            </Box>
                            <Box className={classes.gradient} style={{ ...styles.gradient }} />
                            <LazyImage style={{ ...styles.containerImage, backgroundImage: `url(${imageURL})`, minHeight: height }}/>
                            <IconButton onClick={handleClose} color="primary" className={classes.closeBtn} style={{ ...styles.closeBtn }}>
                                { closeIcon({ className: classes.closeIcon }) }
                            </IconButton>
                        </Box>
                    </Slide>
                </Modal>
            </Box>
        )
    }
}

export default hasLoginModal
