import React, { forwardRef } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade/Fade'

function VideoPlayer (props, videoRef) {
    const theme = useTheme()
    const { videoSource, videoPoster, showVideo, blurVideo } = props

    return (
        <Fade in={showVideo} timeout={500}>
            <video
                ref={videoRef}
                preload={'auto'}
                src={videoSource}
                loop
                playsInline
                poster={videoPoster}
                className='backgroundVideo'
                autoPlay
                style={{ ...props.style, backgroundColor: theme.palette.background.default, filter: blurVideo ? 'blur(4px)' : 'none' }}
            >
            </video>
        </Fade>
    )
}

export default forwardRef(VideoPlayer)
