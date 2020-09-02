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
        if (store.videoController.videoHasPlayed === false) {
            store.videoController.setVideoPlayed(true)
        }
        store.videoController.setBlurVideo(false)
    }

    function paused () {
        store.videoController.setBlurVideo(true)
    }

    function error () {
        // TODO error handling
        console.log('VideoController - ERROR - error')
    }

    function volumechange () {
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
        videoPlayer.addEventListener('volumechange', volumechange)
        videoPlayer.addEventListener('error', error)
        videoPlayer.addEventListener('play', play)
        videoPlayer.addEventListener('pause', paused)

        const mutedFormLocalStorage = getDataFromLocalStorage(`${eventName}-storage`, UserStates.USER_ACTION_VIDEO_MUTED)
        videoPlayer.muted = mutedFormLocalStorage !== null ? mutedFormLocalStorage : false

        return () => {
            videoPlayer.removeEventListener('volumechange', volumechange)
            videoPlayer.removeEventListener('error', error)
            videoPlayer.removeEventListener('play', play)
            videoPlayer.removeEventListener('pause', paused)
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
