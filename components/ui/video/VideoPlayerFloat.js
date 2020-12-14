import React, { forwardRef, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { closeIcon } from '../../../data/icon'
import useTheme from '@material-ui/core/styles/useTheme'
import { useStyles } from '../../../styles/jsx/gifts/videoPlayerGift.style'
import Zoom from '@material-ui/core/Zoom'

function VideoController (props, ref) {
    const { handleClose, source, open } = props
    const theme = useTheme()
    const classes = useStyles()
    const [onVideoTransition, setVideoTransition] = useState(false)

    useEffect(() => {
        setVideoTransition(open)
        if (open) {
            ref.current.src = source
            ref.current.play()
        }
    }, [open])

    function closeTransition () {
        setVideoTransition(false)
    }

    function onExited () {
        handleClose()
        ref.current.pause()
        ref.current.src = ''
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
                <IconButton
                    onClick={closeTransition}
                    color="secondary"
                    className={classes.closeBtn}
                >
                    { closeIcon({ className: classes.closeIcon }) }
                </IconButton>
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

export default forwardRef(VideoController)
