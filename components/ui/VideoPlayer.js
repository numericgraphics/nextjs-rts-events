import React, { forwardRef } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade/Fade'
import { Box } from '@material-ui/core'

function VideoPlayer (props, videoRef) {
    const theme = useTheme()
    const { videoSource, showVideo, blurVideo } = props

    return (
        <Fade in={showVideo} timeout={500}>
            <Box className='container'>
                <video
                    ref={videoRef}
                    preload={'auto'}
                    src={videoSource}
                    loop
                    playsInline
                    className='backgroundVideo'
                    autoPlay
                    style={{ ...props.style, backgroundColor: theme.palette.background.default, filter: blurVideo ? 'blur(4px)' : 'none' }}
                >
                </video>
                <Box className="backgroundGradientBottomAspectRatio"/>
            </Box>
        </Fade>
    )
}

export default forwardRef(VideoPlayer)
