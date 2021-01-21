import React, { forwardRef, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import useTheme from '@material-ui/core/styles/useTheme'
import { useStyles } from '../../../styles/jsx/components/video/videoPlayerFloat.style'
import Zoom from '@material-ui/core/Zoom'
import ButtonCloseModal from '../modal/buttonCloseModal'

function VideoPlayerFloat (props, ref) {
    const { handleClose, source, open } = props
    const videoPlayer = ref.current
    const theme = useTheme()
    const classes = useStyles()
    const [onVideoTransition, setVideoTransition] = useState(false)

    function canPlay () {
        setTimeout(() => {
            setVideoTransition(open)
            videoPlayer.play()
        }, 500)
    }

    useEffect(() => {
        if (open) {
            videoPlayer.addEventListener('loadedmetadata', canPlay)
            videoPlayer.src = source
        }
    }, [open])

    function transitionClose () {
        setVideoTransition(false)
    }

    function onExited () {
        handleClose()
        videoPlayer.pause()
        videoPlayer.src = ''
    }

    return (
        <Zoom
            in={onVideoTransition}
            timeout={{
                appear: 1000,
                enter: 1000,
                exit: 200
            }}
            onExited={onExited}
        >
            <Box className={classes.videoContainer}>
                <ButtonCloseModal
                    handleClose={transitionClose}
                    className={classes.buttonClose}
                />
                <video
                    ref={ref}
                    preload={'auto'}
                    playsInline
                    className={'backgroundVideo'}
                    autoPlay={false}
                    style={{ backgroundColor: theme.palette.primary.main, minHeight: '100%', objectFit: 'cover' }}
                />
            </Box>
        </Zoom>
    )
}

export default forwardRef(VideoPlayerFloat)
