import Box from '@material-ui/core/Box'
import React, { useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useStylesGlobal } from '../../styles/global.style'

const useStyles = makeStyles((theme = useTheme) => ({
    imageAnim: {
        opacity: 0,
        WebkitAnimationName: 'fadeIn',
        WebkitAnimationDuration: '1s',
        WebkitAnimationTimingFunction: 'ease-in',
        WebkitAnimationDelay: 2,
        WebkitAnimationFillMode: 'forwards'
    },
    overImage: {
        height: '100%'
    }
}))

function LazyImage (props) {
    const stylesGlobal = useStylesGlobal()
    const imageRef = useRef()
    const classes = useStyles()

    return (
        <Box ref={imageRef} {...props} className={[props.className, classes.imageAnim].join(' ')}>
            <Box className={[stylesGlobal.overImage, classes.overImage].join(' ')} />
        </Box>
    )
}

export default LazyImage
