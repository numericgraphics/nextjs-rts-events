import React, { forwardRef } from 'react'
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
    const { videoSource, videoPoster, showVideo } = props

    return (
        <Fade in={showVideo} timeout={500}>
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
