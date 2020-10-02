import React, { forwardRef } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade/Fade'
import { Box } from '@material-ui/core'

function VideoPlayer (props, videoRef) {
    const theme = useTheme()
    const { videoSource, showVideo, blurVideo } = props

    return (
        <Box className='container'>
            <Fade in={showVideo} timeout={500}>
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
            </Fade>
            <Box className="backgroundGradientBottomAspectRatio"/>
            <Box className="backgroundVideoPlayer"/>
        </Box>
    )
}

export default forwardRef(VideoPlayer)
