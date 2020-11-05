import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { useStylesGlobal } from '../../styles/global.style'
import Backdrop from '@material-ui/core/Backdrop'

const useStyles = makeStyles((theme) => ({
    overImage: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%'
    }
}))

export default function ColorBackDrop (props) {
    const classes = useStyles()
    const stylesGlobal = useStylesGlobal()

    return (
        <Backdrop open={props.open} onClick={props.onClose} className={classes.overImage}>
            <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage, 'containerModal'].join(' ')} />
            <Box className={[stylesGlobal.colorOverImage, classes.overImage, 'containerModal'].join(' ')} />
        </Backdrop>
    )
}
