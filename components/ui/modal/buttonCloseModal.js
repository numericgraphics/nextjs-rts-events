import React from 'react'
import { closeIcon } from '../../../data/icon'
import IconButton from '@material-ui/core/IconButton'
import { useStyles } from '../../../styles/jsx/components/modal/buttonCloseModal.style'

const ButtonCloseModal = (props) => {
    const { handleClose } = props
    const classes = useStyles()

    return (
        <IconButton
            onClick={handleClose}
            color="secondary"
            className={[props.className, classes.closeBtn].join(' ')}
        >
            { closeIcon() }
        </IconButton>
    )
}

export default ButtonCloseModal
