import { Player, ControlBar, BigPlayButton } from 'video-react'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    playBtn: {
        display: 'none',
        opacity: 0
    },
    video: {
        position: 'absolute',
        verticalAlign: 'center',
        width: '100vw',
        backgroundColor: 'white'

    },
    ContainerVideo: {
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden'
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
