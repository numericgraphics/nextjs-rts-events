import Box from '@material-ui/core/Box'
import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    imageAnim: {
        opacity: 0,
        WebkitAnimationName: 'fadeIn',
        WebkitAnimationDuration: '1s',
        WebkitAnimationTimingFunction: 'ease-in',
        WebkitAnimationDelay: 2,
        WebkitAnimationFillMode: 'forwards'
    }
})

function LazyImage (props) {
    const imageRef = useRef()
    const classes = useStyles()

    return (
        <Box ref={imageRef} {...props} className={classes.imageAnim}/>
    )
}

export default LazyImage
