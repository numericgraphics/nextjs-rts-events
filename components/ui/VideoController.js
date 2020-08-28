import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import UserContext from '../UserContext'

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

function VideoController () {
    const classes = useStyles()
    const { store } = useContext(UserContext)
    const videoPlayer = store.videoController.player.current
    const [mute, setMute] = useState(store.videoController.player.current.muted)
    const [pause, setPause] = useState(store.videoController.player.paused)

    function play () {
        store.videoController.setVideoPlayed(true)
    }

    function onVolumeClick () {
        store.videoController.player.current.muted = !store.videoController.player.current.muted
        setMute(store.videoController.player.current.muted)
    }

    function onPauseClick () {
        store.videoController.player.current.paused ? store.videoController.player.current.play() : store.videoController.player.current.pause()
        setPause(store.videoController.player.current.paused)
    }

    useEffect(() => {
        if (!videoPlayer) return
        videoPlayer.addEventListener('play', play)
    }, [])

    return (
        <Box className={classes.controlContainer} >
            <IconButton onClick={onPauseClick} color="primary" className={classes.button}>
                {pause ? <PlayCircleOutlineIcon style={{ fontSize: iconFontSize }} />
                    : <PauseCircleOutlineIcon style={{ fontSize: iconFontSize }} />}
            </IconButton>
            <IconButton onClick={onVolumeClick} color="primary" className={classes.button}>
                {mute ? <VolumeOffIcon style={{ fontSize: iconFontSize }} />
                    : <VolumeUpIcon style={{ fontSize: iconFontSize }} />}
            </IconButton>
        </Box>
    )
}

export default forwardRef(VideoController)
