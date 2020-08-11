import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    playBtn: {
        position: 'absolute'
    },
    muteBtn: {
        position: 'absolute',
        left: '50%'
    }
})

function VideoControler () {
    const classes = useStyles()
    return (
        <div>
            <Button className={classes.playBtn} style={{ zIndex: '10' }} onClick={() => { }}>Play</Button>
            <Button className={classes.muteBtn} style={{ zIndex: '10' }} onClick={() => { }}>Unmute</Button>
        </div>
    )
}

export default VideoControler
