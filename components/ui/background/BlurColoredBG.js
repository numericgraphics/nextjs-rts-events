import Box from '@material-ui/core/Box'
import React, { useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useStylesGlobal } from '../../../styles/jsx/global.style'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles((theme = useTheme) => ({
    overImage: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%'
    }
}))

function BlurColoredBG (props) {
    const stylesGlobal = useStylesGlobal()
    const ref = useRef()
    const classes = useStyles()

    return (
        <Box ref={ref} className={props.className}>
            <Fade in={props.addblur} timeout={{
                appear: 1000,
                enter: 100,
                exit: 100
            }}>
                <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage].join(' ')} />
            </Fade>
            <Fade in={props.addcolor} timeout={{
                appear: 1000,
                enter: 100,
                exit: 100
            }}>
                <Box className={[stylesGlobal.colorOverImage, classes.overImage].join(' ')} />
            </Fade>
        </Box>
    )
}

export default BlurColoredBG
