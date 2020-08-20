import { Player, ControlBar, BigPlayButton } from 'video-react'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    playBtn: {
        display: 'none',
        opacity: 0
    },
    video: {
        display: 'flex',
        alignSelf: 'center',
        left: '50%',
        minHeight: '100%',
        minWidth: '100%',
        position: 'absolute',
        transform: 'translate(-50%)'
    },
    ContainerVideo: {
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        width: '100%'
    }
})

function Video (props, ref) {
    const classes = useStyles()

    return (
        <div className={classes.ContainerVideo}>
            <Player videoWidth="auto" videoHeight="100%" {...props} loop playsInline ref={ref} fluid={true} className={classes.video} >
                <BigPlayButton disabled={true} position="center" className={classes.playBtn}/>
                <ControlBar disableCompletely={true} />
            </Player>
        </div>
    )
}

export default forwardRef(Video)
