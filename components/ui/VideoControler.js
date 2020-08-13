import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'

const useStyles = makeStyles({
    controlContainer: {
        position: 'absolute',
        zIndex: '10',
        display: 'flex',
        flexDirection: 'row',
        right: '15px',
        top: '46px'
    },
    playBtn: {
        zIndex: '10'
    },
    volumeBtn: {
        zIndex: '10'
    }
})

const hide = { display: 'none' }
function VideoControler (props, ref) {
    const classes = useStyles()
    return (
        <div className={classes.controlContainer} style={props.endChallenge ? hide : null } >
            <div className={classes.volumeBtn} >
                <VolumeUpIcon fontSize="large" style={ props.mute ? hide : null } className={classes.unmuteBtn} ref={props.refUnmute} /> <VolumeOffIcon style={ !props.mute ? hide : null } fontSize="large" className={classes.muteBtn} ref={props.refMute} />
            </div>
            <PauseCircleOutlineIcon fontSize="large" style={ !props.curPlaying ? hide : null } className={classes.pauseBtn} ref={props.refPause} /> <PlayCircleOutlineIcon style={ props.curPlaying ? hide : null } fontSize="large" className={classes.playBtn} ref={props.refPlay}/>
        </div>
    )
}

export default forwardRef(VideoControler)
