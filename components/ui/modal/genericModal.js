import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'

const GenericModal = (props) => {
    const { handleClose, hideBackdrop } = props
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className='containerModal'
            open={props.open}
            onClose={handleClose}
            closeAfterTransition
            hideBackdrop={hideBackdrop}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 1000
            }}
        >
            {props.children}
        </Modal>
    )
}

export default GenericModal
