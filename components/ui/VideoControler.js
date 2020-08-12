import React, { forwardRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
// import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'

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

const displayPlay = { display: 'none' }

function VideoControler (props, ref) {
    const classes = useStyles()
    const [volume, setVolume] = useState(false)

    const toggleVolume = () => {
        volume === false ? setVolume(true) : setVolume(false)
    }

    return (
        <div className={classes.controlContainer} >
            <div className={classes.volumeBtn} onClick={() => toggleVolume() } >
                <VolumeUpIcon style={ !volume ? displayPlay : null } fontSize="small" className={classes.unmuteBtn} ref={props.refUnmute} /> <VolumeOffIcon style={ volume ? displayPlay : null } fontSize="small" className={classes.muteBtn} ref={props.refMute} />
            </div>
            <PlayCircleOutlineIcon fontSize="small" className={classes.playBtn}/>
        </div>
    )
}

export default forwardRef(VideoControler)
