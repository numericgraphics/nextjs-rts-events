import React, { useState, useEffect, useRef, createRef } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
import { lockIcon, closeIcon } from '../data/icon'
import IconButton from '@material-ui/core/IconButton'
import { useHeight } from '../hooks/useHeight'
import { hexToRgbA } from '../data/tools'

const useStyles = makeStyles((theme = useTheme()) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
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
        position: 'relative',
        paddingBottom: '7vh',
        paddingLeft: '20px',
        paddingRight: '20px',
        flexGrow: 0,
        border: 'solid',
        borderColor: theme.palette.secondary.main
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.75em',
        letterSpacing: '0em',
        paddingBottom: '15px'
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
    gradient: {
        flexGrow: 3,
        width: '100vw'
    },
    closeIcon: {
        position: 'absolute',
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '10vw',
        height: '10vw'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        position: 'absolute'
    }
}))

const hasGiftModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [gift, setGift] = useState({ description: '', title: '', locked: true })
        const theme = useTheme()
        const height = useHeight()
        const boxTextRef = useRef()
        const lockIconRef = createRef()
        const [boxHeight, setBoxHeight] = useState(0)

        function handleResize () {
            setBoxHeight(boxTextRef.current ? boxTextRef.current.clientHeight : null)
        }

        useEffect(() => {
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }, [handleResize])

        useEffect(() => {
            if (open) {
                setTimeout(handleResize, 10)
            }
        }, [open])

        const handleOpen = () => {
            setOpen(true)
        }

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <Box>
                <WrappedComponent setGift={setGift} openModal={handleOpen} isModalOpen={open} {...props} />
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className='containerModal'
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Slide direction="up" in={open} timeout={500} mountOnEnter unmountOnExit>
                        <Box className={['backgroundModal', 'containerModal', 'bg-top-cover'].join(' ')}
                            style={{ backgroundImage: `url(${gift.imageURL})`, height: height }}>
                            <Box className={classes.footer} style={{ height: height }}>
                                <Box className={classes.gradient} style={{ background: `linear-gradient(${hexToRgbA(theme.palette.secondary.main, 0)} 0%, ${hexToRgbA(theme.palette.secondary.main, 0)} 80%,${theme.palette.secondary.main} 100%)` }} />
                                <Box className={classes.containerText} ref={ boxTextRef } style={{ backgroundColor: theme.palette.secondary.main }}>
                                    <Typography className={classes.title} align={'center'}>{gift.title}</Typography>
                                    <Typography className={classes.description} align={'center'}>{gift.locked ? gift.lockedMessage : gift.message}</Typography>
                                </Box>
                                {gift.locked ? <Box className={classes.lockContainer} style={{ zIndex: 3, fill: theme.palette.secondary.contrastText, bottom: boxHeight - 1 }}>
                                    {lockIcon({ ref: lockIconRef, className: classes.lock })}
                                </Box> : null }
                            </Box>
                            <IconButton onClick={handleClose} color="primary" className={classes.closeBtn} style={{ backgroundColor: theme.palette.primary.main, stroke: theme.palette.primary.contrastText }}>
                                { closeIcon({ className: classes.closeIcon }) }
                            </IconButton>
                        </Box>
                    </Slide>
                </Modal>
            </Box>
        )
    }
}

export default hasGiftModal
