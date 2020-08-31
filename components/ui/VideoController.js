import React, { Fragment, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import UserContext from '../UserContext'
import { storeInLocalStorage, UserStates, getDataFromLocalStorage } from '../../data/tools'

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

function VideoController (props) {
    const classes = useStyles()
    const { store } = useContext(UserContext)
    const { eventName } = store
    const videoPlayer = store.videoController.player.current
    const [mute, setMute] = useState(store.videoController.player.current.muted)
    const [controls] = useState(props.controls)
    const [pause, setPause] = useState(store.videoController.player.paused)

    function setLocalStorageValue (key, value) {
        storeInLocalStorage(`${eventName}-storage`, { [key]: value })
    }

    function play () {
        store.videoController.setVideoPlayed(true)
    }

    function onVolumeClick () {
        videoPlayer.muted = !videoPlayer.muted
        setMute(videoPlayer.muted)
        setLocalStorageValue(UserStates.USER_ACTION_VIDEO_MUTED, videoPlayer.muted)
    }

    function onPauseClick () {
        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
        setPause(videoPlayer.paused)
    }

    useEffect(() => {
        if (!videoPlayer) return
        const mutedFormLocalStorage = getDataFromLocalStorage(`${eventName}-storage`, UserStates.USER_ACTION_VIDEO_MUTED)
        videoPlayer.muted = mutedFormLocalStorage !== null ? mutedFormLocalStorage : false
        setMute(videoPlayer.muted)
        videoPlayer.addEventListener('play', play)
        return () => {
            videoPlayer.removeEventListener('play', play)
        }
    }, [])

    useEffect(() => {
        if (store.videoController.videoHasPlayed) {
            storeInLocalStorage(`${eventName}-storage`, { [UserStates.USER_ACTION_CLICKED_VIDEO]: true })
        }
    }, [store.videoController.videoHasPlayed])

    return (
        <Fragment>
            {controls
                ? <Box className={classes.controlContainer} >
                    <IconButton onClick={onPauseClick} color="primary" className={classes.button}>
                        {pause ? <PlayCircleOutlineIcon style={{ fontSize: iconFontSize }} />
                            : <PauseCircleOutlineIcon style={{ fontSize: iconFontSize }} />}
                    </IconButton>
                    <IconButton onClick={onVolumeClick} color="primary" className={classes.button}>
                        {mute ? <VolumeOffIcon style={{ fontSize: iconFontSize }} />
                            : <VolumeUpIcon style={{ fontSize: iconFontSize }} />}
                    </IconButton>
                </Box>
                : null}
        </Fragment>
    )
}

export default VideoController
