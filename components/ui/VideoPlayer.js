import React, { forwardRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade/Fade'

const useStyles = makeStyles({
    ContainerVideo: {
        justifyContent: 'flex-start'
    },
    video: {
        position: 'absolute',
        top: 0,
        width: '100vw',
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    playBtn: {
        display: 'none',
        opacity: 0
    }
})

function VideoPlayer (props, videoRef) {
    const classes = useStyles()
    const { videoSource, videoPoster } = props
    const [paused, setPaused] = useState(false)

    function videoPlayerState () {
        const videoPlayer = videoRef.current
        setPaused(!videoPlayer.paused)
    }

    useEffect(() => {
        const videoPlayer = videoRef.current
        if (!videoPlayer) return
        videoPlayer.addEventListener('pause', videoPlayerState)
        videoPlayer.addEventListener('play', videoPlayerState)
        setPaused(videoPlayer.paused)
    }, [])

    return (
        <Fade in={paused} timeout={500}>
            <video
                ref={videoRef}
                src={videoSource}
                loop
                playsInline
                poster={videoPoster}
                className={classes.video}
                autoPlay
            >
            </video>
        </Fade>
    )
}

export default forwardRef(VideoPlayer)
