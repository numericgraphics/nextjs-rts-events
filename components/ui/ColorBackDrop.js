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

export default function ColorBackDrop () {
    const classes = useStyles()
    const stylesGlobal = useStylesGlobal()
    return (
        <Box className={['container'].join(' ')} >
            <Box className='content' >

                <Box className={[stylesGlobal.backdropFilterOverImage, classes.overImage, 'containerModal'].join(' ')}/>
                <Box className={[stylesGlobal.colorOverImage, classes.overImage, 'containerModal'].join(' ')}/>
            </Box>
        </Box>
    )
}
