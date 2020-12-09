import React, { useState, useEffect, useRef, createRef } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import { lockIcon, closeIcon } from '../data/icon'
import IconButton from '@material-ui/core/IconButton'
import { useHeight } from '../hooks/useHeight'
import { useStyles } from '../styles/jsx/components/modal/hasGiftsModal.style'

const hasGiftModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [gift, setGift] = useState({ description: '', title: '', locked: true })
        const height = useHeight()
        const boxTextRef = useRef()
        const lockIconRef = createRef()
        const [boxHeight, setBoxHeight] = useState(0)

        // function handleResize () {
        //     setBoxHeight(boxTextRef.current ? boxTextRef.current.clientHeight : null)
        // }
        //
        // useEffect(() => {
        //     window.addEventListener('resize', handleResize)
        //     return () => {
        //         window.removeEventListener('resize', handleResize)
        //     }
        // }, [handleResize])
        //
        // useEffect(() => {
        //     if (open) {
        //         setTimeout(handleResize, 10)
        //     }
        // }, [open])

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
                        timeout: 1000
                    }}
                >
                    <Slide direction="up" in={open} timeout={500} mountOnEnter unmountOnExit>
                        <Box className={['backgroundModal', 'containerModal', 'bg-top-cover'].join(' ')}
                            style={{ backgroundImage: `url(${gift.imageURL})`, height: height }}>
                        </Box>
                    </Slide>
                </Modal>
            </Box>
        )
    }
}

export default hasGiftModal
