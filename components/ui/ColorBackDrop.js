import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import { useStylesGlobal } from '../../styles/global.style'

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

    function click () {
        if (typeof (props.backgroundClick) === 'function') {
            props.backgroundClick()
        }
    }

    return (
        <Box className={[classes.overImage].join(' ')}>
            <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage, 'containerModal'].join(' ')} />
            <Box onClick={ () => { click() } } className={[stylesGlobal.colorOverImage, classes.overImage, 'containerModal'].join(' ')} />
        </Box>
    )
}
