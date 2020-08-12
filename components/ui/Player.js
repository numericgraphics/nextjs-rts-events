import { Player, ControlBar, BigPlayButton } from 'video-react'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VideoControler from './VideoControler'

const useStyles = makeStyles({
    playBtn: {
        display: 'none',
        opacity: 0
    },
    video: {
        display: 'flex',
        alignSelf: 'center'
    },
    ContainerVideo: {
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'column'
    }
})

function Video (props, ref) {
    const classes = useStyles()

    return (
        <div className={classes.ContainerVideo}>
            <VideoControler refUnmute={props.refUnmute} refMute={props.refMute} />
            <Player videoWidth="auto" videoHeight="100%" {...props} loop playsInline ref={ref} fluid={false} className={classes.video} >
                <BigPlayButton disabled={true} position="center" className={classes.playBtn}/>
                <ControlBar disableCompletely={true} />
            </Player>
        </div>
    )
}

export default forwardRef(Video)
