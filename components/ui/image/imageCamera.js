import React from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        zIndex: '4'
    },
    imgBox: {
        maxWidth: '80%',
        maxHeight: '80%',
        margin: '10px'
    },
    img: {
        height: 'inherit',
        maxWidth: 'inherit'
    },
    input: {
        display: 'none'
    }
}))
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
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                capture="environment"
                onChange={(e) => handleCapture(e.target)}
            />

            <label htmlFor="icon-button-file">
                <IconButton
                    color="secondary"
                    aria-label="upload you picture"
                    component="span"
                >
                    <PhotoCameraRoundedIcon fontSize="large" color="primary" />
                </IconButton>
            </label>
        </div>
    )
}
export default ImageCapture
