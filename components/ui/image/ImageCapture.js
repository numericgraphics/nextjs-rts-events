import React from 'react'
import { IconButton } from '@material-ui/core'
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/imageCapture.style'
import Typography from '@material-ui/core/Typography'

function ImageCapture (props) {
    const classes = useStyles()

    function toDataURL (url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.onload = function () {
            var reader = new FileReader()
            reader.onloadend = function () {
                callback(reader.result)
            }
            reader.readAsDataURL(xhr.response)
        }
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.send()
    }

    // Select the image

    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0]
                const newUrl = URL.createObjectURL(file)
                // console.log('file', Object.keys(file))
                // console.log('file2', getDataUrl(file))
                toDataURL(newUrl, function (dataUrl) {
                    console.log('RESULT:', dataUrl)
                })
                // console.log(blobToBase64(newUrl))
                props.setImageURL(newUrl)
            }
        }
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.gradient}/>
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
                Prends une photo de ton animal de compagnie.
                </Typography>

                <label htmlFor="icon-button-file">
                    <IconButton
                        color="secondary"
                        aria-label="upload you picture"
                        component="span"
                        className={classes.captureBtn}
                    >
                        <PhotoCameraRoundedIcon className={classes.cameraIcon} fontSize="large" />
                    </IconButton>
                </label>
            </Box>
        </Box>
    )
}
export default ImageCapture
