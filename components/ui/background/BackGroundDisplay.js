import Box from '@material-ui/core/Box'
import React, { useEffect, useRef, useState } from 'react'
import { useStylesGlobal } from '../../../styles/jsx/global.style'
import Fade from '@material-ui/core/Fade/Fade'
import { useStyles } from '../../../styles/jsx/components/background/backGroundDisplay.style'

function BackGroundDisplay (props) {
    const [display, setDisplay] = useState(false)
    const stylesGlobal = useStylesGlobal()
    const ref = useRef()
    const classes = useStyles()
    const timeOutValue = 500

    useEffect(() => {
        setDisplay(true)
        return () => {
            setDisplay(false)
        }
    }, [])

    return (
        <Fade in={display} timeout={timeOutValue}>
            <Box ref={ref}
                className={[props.className, props.imageURL && classes.containerImage].join(' ')}
                style={{ backgroundImage: props.imageURL ? `url(${props.imageURL})` : 'none' }}>
                <Fade in={!!props.addblur}>
                    <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage].join(' ')} />
                </Fade>
                <Fade in={!!props.addcolor}>
                    <Box className={[stylesGlobal.colorOverImage, classes.overImage].join(' ')} />
                </Fade>
            </Box>
        </Fade>
    )
}

export default BackGroundDisplay
