import Box from '@material-ui/core/Box'
import React, { useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useStylesGlobal } from '../../styles/global.style'

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
            {props.addblur &&
                <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage].join(' ')} />
            }
            {props.addcolor &&
                <Box className={[stylesGlobal.colorOverImage, classes.overImage].join(' ')} />
            }
        </Box>
    )
}

export default BlurColoredBG
