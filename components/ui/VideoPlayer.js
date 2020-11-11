import React, { forwardRef, useEffect, useState } from 'react'
import Fade from '@material-ui/core/Fade/Fade'
import { Box, useTheme } from '@material-ui/core'
import BlurColoredBG from './BlurColoredBG'

function VideoPlayer (props, videoRef) {
    const theme = useTheme()
    const { videoSource, videoPoster, showVideo } = props
    const [isPaused, setPaused] = useState(true)

    useEffect(() => {
        setPaused(videoRef.current !== undefined ? (!!videoRef.current.paused) : true)
    })

    return (
        <Box className={['container', 'z-index-media'].join(' ')}>
            <Fade in={showVideo} timeout={500}>
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
                        style={{ ...props.style, backgroundColor: theme.palette.primary.main }}
                    >
                    </video>
                    <BlurColoredBG addcolor={isPaused} addblur={isPaused} className={'backgroundGradientVideoPlayer'}/>
                    <Box className="backgroundVideoPlayer" style={{ background: theme.palette.primary.main }}/>
                </Box>
            </Fade>
        </Box>
    )
}

export default forwardRef(VideoPlayer)
