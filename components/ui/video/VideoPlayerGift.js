import React, { forwardRef } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { closeIcon } from '../../../data/icon'
import useTheme from '@material-ui/core/styles/useTheme'
import { useStyles } from '../../../styles/jsx/gifts/videoPlayerGift.style'

function VideoController (props, ref) {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <Box className={classes.videoContainer}>
            <IconButton onClick={props.handleClose} color="secondary" className={classes.closeBtn}>
                { closeIcon({ className: classes.closeIcon }) }
            </IconButton>
            <video
                ref={props.ref}
                src={props.src}
                poster={props.imageURL}
                preload={'auto'}
                controls
                playsInline
                className={'backgroundVideo'}
                autoPlay={true}
                style={{ backgroundColor: theme.palette.primary.main, minHeight: '100%', objectFit: 'cover' }}
            />
        </Box>
    )
}

export default forwardRef(VideoController)
