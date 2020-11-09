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
    containerImage: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%'
    },
    overImage: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%'
    }
}))

function LazyImage (props) {
    const stylesGlobal = useStylesGlobal()
    const imageRef = useRef()
    const classes = useStyles()

    return (
        <Box ref={imageRef} className={[props.className, classes.imageAnim, classes.containerImage].join(' ')}>
            {props.addblur &&
                <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage].join(' ')} />
            }
            {props.addcolor &&
                <Box className={[stylesGlobal.colorOverImage, classes.overImage].join(' ')} />
            }
        </Box>
    )
}

export default LazyImage
