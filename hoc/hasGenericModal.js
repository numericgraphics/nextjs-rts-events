import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'

const hasGenericModal = (WrappedComponent, ModalComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const [open, setOpen] = useState(false)

        const handleOpen = () => {
            setOpen(true)
        }

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <Box>
                <WrappedComponent openModal={handleOpen} isModalOpen={open} {...props} />
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
                    <ModalComponent/>
                </Modal>
            </Box>
        )
    }
}

export default hasGenericModal
