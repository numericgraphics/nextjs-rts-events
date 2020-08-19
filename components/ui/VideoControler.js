import React, { forwardRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
    controlContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10
    },
    playBtn: {
        zIndex: '10'
    },
    volumeBtn: {
        zIndex: '10'
    }
})

function VideoControler (props, ref) {
    const classes = useStyles()
    const [mute, setMute] = useState(props.player.current.muted)
    const [pause, setPause] = useState(props.player.current.getState().player.paused)

    function onVolumeClick () {
        props.player.current.muted = !props.player.current.muted
        setMute(props.player.current.muted)
    }

    function onPauseClick () {
        props.player.current.getState().player.paused ? props.player.current.play() : props.player.current.pause()
        setPause(props.player.current.getState().player.paused)
    }
    return (
        <Box className={classes.controlContainer} >
            <IconButton onClick={onVolumeClick}>
                {mute ? <VolumeOffIcon color="primary" fontSize="large" />
                    : <VolumeUpIcon color="primary" fontSize="large" />}
            </IconButton>
            <IconButton onClick={onPauseClick}>
                {pause ? <PauseCircleOutlineIcon color="primary" fontSize="large"/>
                    : <PlayCircleOutlineIcon color="primary" fontSize="large" />}
            </IconButton>
        </Box>
    )
}

export default forwardRef(VideoControler)
