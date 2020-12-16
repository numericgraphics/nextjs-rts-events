import React /* , { useEffect, useRef, useState } */ from 'react'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade/Fade'
import hasCountDownModal from '../../hoc/hasCountDownModal'
import ImageCapture from '../ui/image/imageCamera'

function Question (props) {
    return (
        <Box className='content' >
            <Slide in={true} timeout={500} direction="down" >
                <Box>
                    <ImageCapture/>
                </Box>
            </Slide>
            <Fade in={true} timeout={600}>
                <Box className='backgroundGradientTop' />
            </Fade>
        </Box>
    )
}

export default hasCountDownModal(Question)
