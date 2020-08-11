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
        alignSelf: 'center'
    }
})

function Video (props, ref) {
    const classes = useStyles()

    return (
        <Player videoWidth="auto" videoHeight="100%" {...props} loop playsInline ref={ref} fluid={false} className={classes.video} >
            <BigPlayButton disabled={true} position="center" className={classes.playBtn}/>
            <ControlBar disableCompletely={true} />
        </Player>
    )
}

export default forwardRef(Video)
