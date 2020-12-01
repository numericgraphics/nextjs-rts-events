import Box from '@material-ui/core/Box'
import React, { useEffect, useState } from 'react'
import { useStylesGlobal } from '../../../styles/jsx/global.style'
import Fade from '@material-ui/core/Fade/Fade'
import { useStyles } from '../../../styles/jsx/components/background/backGroundDisplay.style'
import KenBurnsImage from './KenBurnsImage'

function BackGroundDisplay (props) {
    const [display, setDisplay] = useState(false)
    const stylesGlobal = useStylesGlobal()
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
            <KenBurnsImage imageURL={props.imageURL} animated={props.animated} className={props.className} >
                <Fade in={!!props.addblur}>
                    <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage].join(' ')} />
                </Fade>
                <Fade in={!!props.addcolor}>
                    <Box className={[stylesGlobal.colorOverImage, classes.overImage].join(' ')} />
                </Fade>
            </KenBurnsImage>
        </Fade>
    )
}

export default BackGroundDisplay
