import React, { forwardRef, useEffect, useState } from 'react'
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
    button: {
        padding: 2,
        paddingRight: 8,
        paddingLeft: 8
    }
})

const iconFontSize = 33

function VideoControler (props, ref) {
    const classes = useStyles()
    const [isDisabled, setDisabled] = useState(false)
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

    useEffect(() => {
        console.log('useEffect', props.player.current.getState().player.readyState)
        setDisabled(false)
    //     if (props.player.current.getState().player.readyState > 2) {
    //         setDisabled(false)
    //     }
    }, [props.player.current.getState()])
    return (
        <Box className={classes.controlContainer} >
            <IconButton onClick={onPauseClick} color="primary" className={classes.button} disabled={isDisabled}>
                {pause ? <PauseCircleOutlineIcon style={{ fontSize: iconFontSize }} />
                    : <PlayCircleOutlineIcon style={{ fontSize: iconFontSize }} />}
            </IconButton>
            <IconButton onClick={onVolumeClick} color="primary" className={classes.button} disabled={isDisabled}>
                {mute ? <VolumeOffIcon style={{ fontSize: iconFontSize }} />
                    : <VolumeUpIcon style={{ fontSize: iconFontSize }} />}
            </IconButton>
        </Box>
    )
}

export default forwardRef(VideoControler)
