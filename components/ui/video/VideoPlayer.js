import React, { forwardRef } from 'react'
import Fade from '@material-ui/core/Fade/Fade'
import { Box, useTheme } from '@material-ui/core'
import BackGroundDisplay from '../background/BackGroundDisplay'

function VideoPlayer (props, videoRef) {
    const theme = useTheme()
    const { videoSource, videoPoster, showVideo, blurVideo } = props

    function onEnter (e) {
        console.log('onEnter', e)
    }

    function onExited (e) {
        console.log('onExited', e)
    }

    return (
        <Box className={['container', 'z-index-media'].join(' ')}>
            <Fade in={showVideo} timeout={1000} style={{ transitionDelay: showVideo ? '500ms' : '500ms' }} onEnter={onEnter} onExited={onExited}>
                <Box>
                    <video
                        ref={videoRef}
                        preload={'auto'}
                        src={videoSource}
                        poster={videoPoster}
                        loop
                        playsInline
                        className='backgroundVideo'
                        autoPlay={false}
                        style={{ ...props.style, backgroundColor: theme.palette.primary.main, minHeight: '100vh', objectFit: 'cover' }}
                    >
                    </video>
                    <BackGroundDisplay addcolor={blurVideo} addblur={blurVideo} className={'backgroundGradientVideoPlayer'}/>
                    <Box className="backgroundVideoPlayer" style={{ background: theme.palette.primary.main }}/>
                </Box>
            </Fade>
        </Box>
    )
}

export default forwardRef(VideoPlayer)
