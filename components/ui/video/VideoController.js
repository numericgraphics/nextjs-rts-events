import React, { Fragment, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import UserContext from '../../../hooks/userContext'
import { storeInLocalStorage, UserStates, getDataFromLocalStorage } from '../../../data/tools'

const iconFontSize = 33
const useStyles = makeStyles({
    controlContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        paddingLeft: 12,
        width: iconFontSize,
        height: iconFontSize,
        marginLeft: 2
    }
})

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

    function handlePlay () {
        if (store.videoController.videoHasPlayed === false) {
            store.videoController.setVideoPlayed(true)
        }
        store.videoController.setBlurVideo(false)
    }

    function handlePaused () {
        store.videoController.setBlurVideo(true)
        // FIX for ios sleeping mode : video is set to paused when the app is in sleeping mode
        setPause(true)
    }

    function handleError (e) {
        // TODO error handling
        console.log('VideoController - ERROR - error', e)
    }

    function handelVolumechange () {
        setLocalStorageValue(UserStates.USER_ACTION_VIDEO_MUTED, videoPlayer.muted)
        setMute(videoPlayer.muted)
    }

    function onVolumeClick () {
        videoPlayer.muted = !videoPlayer.muted
    }

    function onPauseClick () {
        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
        setPause(videoPlayer.paused)
    }

    useEffect(() => {
        if (!videoPlayer) return
        videoPlayer.addEventListener('volumechange', handelVolumechange)
        videoPlayer.addEventListener('error', handleError)
        videoPlayer.addEventListener('play', handlePlay)
        videoPlayer.addEventListener('pause', handlePaused)

        const mutedFormLocalStorage = getDataFromLocalStorage(`${eventName}-storage`, UserStates.USER_ACTION_VIDEO_MUTED)
        videoPlayer.muted = mutedFormLocalStorage !== null ? mutedFormLocalStorage : false
        setMute(videoPlayer.muted)

        return () => {
            videoPlayer.removeEventListener('volumechange', handelVolumechange)
            videoPlayer.removeEventListener('error', handleError)
            videoPlayer.removeEventListener('play', handlePlay)
            videoPlayer.removeEventListener('pause', handlePaused)
        }
    }, [])

    useEffect(() => {
        if (store.videoController.videoHasPlayed) {
            storeInLocalStorage(`${eventName}-storage`, { [UserStates.USER_ACTION_CLICKED_VIDEO]: true, [UserStates.USER_ACTION_VIDEO_MUTED]: videoPlayer.muted })
        }
    }, [store.videoController.videoHasPlayed])

    return (
        <Fragment>
            {controls
                ? <Box className={classes.controlContainer} >
                    <IconButton onClick={onPauseClick} color="secondary" className={classes.button}>
                        {pause ? <PlayCircleOutlineIcon style={{ fontSize: iconFontSize, position: 'absolute' }} />
                            : <PauseCircleOutlineIcon style={{ fontSize: iconFontSize, position: 'absolute' }} />}
                    </IconButton>
                    <IconButton onClick={onVolumeClick} color="secondary" className={classes.button}>
                        {mute ? <VolumeOffIcon style={{ fontSize: iconFontSize, position: 'absolute' }} />
                            : <VolumeUpIcon style={{ fontSize: iconFontSize, position: 'absolute' }} />}
                    </IconButton>
                </Box>
                : null}
        </Fragment>
    )
}

export default VideoController
