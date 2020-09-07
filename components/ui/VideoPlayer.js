import React, { forwardRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade/Fade'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    ContainerVideo: {
        justifyContent: 'flex-start'
    },
    video: {
        position: 'absolute',
        top: 0,
        width: '100vw',
        overflow: 'hidden'
    },
    playBtn: {
        display: 'none',
        opacity: 0
    },
    poster: {
        zIndex: 1,
        position: 'absolute',
        width: '100vw',
        minHeight: '100vh',
        top: 0,
        left: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundColor: 'black'
    }
})

function VideoPlayer (props, videoRef) {
    const classes = useStyles()
    const theme = useTheme()
    const { videoSource, videoPoster, showVideo, blurVideo, videoHasPlayed } = props

    return (
        <Fade in={showVideo} timeout={500}>
            <Box>
                {!videoHasPlayed && <Box className={classes.poster} style={{ backgroundImage: `url(${videoPoster})` }} />}
                <video
                    ref={videoRef}
                    preload={'auto'}
                    src={videoSource}
                    loop
                    playsInline
                    poster={videoPoster}
                    className={classes.video}
                    autoPlay
                    style={{ backgroundColor: theme.palette.background, filter: blurVideo ? 'blur(4px)' : 'none' }}
                >
                </video>
            </Box>
        </Fade>
    )
}

export default forwardRef(VideoPlayer)
