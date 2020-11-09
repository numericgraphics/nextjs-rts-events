import React, { forwardRef } from 'react'
import Fade from '@material-ui/core/Fade/Fade'
import { Box, useTheme } from '@material-ui/core'
import BlurColoredBG from './BlurColoredBG'

function VideoPlayer (props, videoRef) {
    const theme = useTheme()
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
                        autoPlay={false}
                        style={{ ...props.style, backgroundColor: theme.palette.primary.main }}
                    >
                    </video>
                    <BlurColoredBG addcolor={blurVideo} addblur={blurVideo} className={'backgroundGradientVideoPlayer'}/>
                    <Box className="backgroundVideoPlayer" style={{ background: theme.palette.primary.main }}/>
                </React.Fragment>
            </Fade>
        </Box>
    )
}

export default forwardRef(VideoPlayer)
