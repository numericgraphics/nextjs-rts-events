import React, { forwardRef } from 'react'
import Fade from '@material-ui/core/Fade/Fade'
import { Box } from '@material-ui/core'

function VideoPlayer (props, videoRef) {
    const { videoSource, showVideo, blurVideo } = props

    return (
        <Box className={['container', 'z-index-media'].join(' ')}>
            <Fade in={showVideo} timeout={500}>
                <React.Fragment>
                    <video
                        ref={videoRef}
                        preload={'auto'}
                        src={videoSource}
                        loop
                        playsInline
                        className='backgroundVideo'
                        autoPlay
                        style={{ ...props.style, backgroundColor: 'black', filter: blurVideo ? 'blur(4px)' : 'none' }}
                    >
                    </video>
                    <Box className="backgroundGradientBottomAspectRatio"/>
                    <Box className="backgroundVideoPlayer"/>
                </React.Fragment>
            </Fade>
        </Box>
    )
}

export default forwardRef(VideoPlayer)
