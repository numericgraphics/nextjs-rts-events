import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import GameCountDown from '../components/gameCountDown'

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

const hasCountDownModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = React.useState(false)

        const handleOpen = () => {
            setOpen(true)
        }

        const handleClose = () => {
            setOpen(false)
        }

        function OpenModal () {
            handleOpen()
        }

        return (
            <Box>
                <WrappedComponent openModal={OpenModal} {...props} />
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
                        <GameCountDown finishedCallBack={handleClose}/>
                    </Fade>
                </Modal>
            </Box>
        )
    }
}

export default hasCountDownModal
