import React from 'react'
import { IconButton } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/imageCapture.style'
import Typography from '@material-ui/core/Typography'
import { CameraIcon } from '../../../data/icon'
import { b64Conv } from '../../../data/tools'

function ImageCapture (props) {
    const classes = useStyles()
    const { result, text } = props

    // Select the image
    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0]
                console.log('file', file)
                const img = b64Conv(file)
                console.log(img)
                img.then(function (res) {
                    console.log(res)
                    result(res)
                })
            }
        }
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    capture="environment"
                    onChange={(e) => handleCapture(e.target)}
                />
                <Typography className={classes.text} variant='h3'>
                    {text}
                </Typography>

                <label htmlFor="icon-button-file">
                    <IconButton
                        color="secondary"
                        aria-label="upload you picture"
                        component="span"
                        className={classes.captureBtn}
                    >
                        <CameraIcon className={classes.cameraIcon} />
                    </IconButton>
                </label>
            </Box>
        </Box>
    )
}
export default ImageCapture
