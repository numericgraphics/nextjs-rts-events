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
        flexDirection: 'row'
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

    /* const toggleVolume = () => {
        volume === false ? setVolume(true) : setVolume(false)
    } */
    console.log(props.curPlaying)
    return (
        <div className={classes.controlContainer} >
            <div className={classes.volumeBtn} >
                <VolumeUpIcon style={ props.mute ? hide : null } fontSize="small" className={classes.unmuteBtn} ref={props.refUnmute} /> <VolumeOffIcon style={ !props.mute ? hide : null } fontSize="small" className={classes.muteBtn} ref={props.refMute} />
            </div>
            <PauseCircleOutlineIcon style={ !props.curPlaying ? hide : null } fontSize="small" className={classes.pauseBtn} ref={props.refPause} /> <PlayCircleOutlineIcon style={ props.curPlaying ? hide : null } fontSize="small" className={classes.playBtn} ref={props.refPlay}/>
        </div>
    )
}

export default forwardRef(VideoControler)
