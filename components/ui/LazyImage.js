import Box from '@material-ui/core/Box'
import React, { useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme = useTheme) => ({
    imageAnim: {
        opacity: 0,
        WebkitAnimationName: 'fadeIn',
        WebkitAnimationDuration: '1s',
        WebkitAnimationTimingFunction: 'ease-in',
        WebkitAnimationDelay: 2,
        WebkitAnimationFillMode: 'forwards'
    },
    colorOverImage: {
        height: '100%',
        backgroundColor: theme.palette.secondary.contrastText,
        opacity: 0.8
    }
}))

function LazyImage (props) {
    const imageRef = useRef()
    const classes = useStyles()

    return (
        <Box ref={imageRef} {...props} className={[props.className, classes.imageAnim].join(' ')}>
            <Box className={[classes.colorOverImage].join(' ')} />
        </Box>
    )
}

export default LazyImage
