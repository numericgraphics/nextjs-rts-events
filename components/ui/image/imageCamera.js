import React, { useRef, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded'; const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        textAlign: 'center'
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

function ImageCapture () {
    const videoRef = useRef()
    const classes = useStyles()
    /* const [source, setSource] = useState('')

    /* const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0]
                const newUrl = URL.createObjectURL(file)
                console.log(newUrl)
                setSource(newUrl)
            }
        }
    } */

    useEffect(() => {
        if (videoRef) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                    console.log(navigator.mediaDevices.getSupportedConstraints())
                    // videoRef.current.src = window.URL.createObjectURL(stream)
                    videoRef.current.srcObject = stream
                    videoRef.current.play()
                })
            }
        }
    }, [videoRef])

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <video ref={videoRef} id="video" width="640" height="480" autoPlay/>
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload you picture"
                            component="span"
                        >
                            <PhotoCameraRoundedIcon fontSize="large" color="primary" />
                        </IconButton>
                    </label>
                </Grid>
            </Grid>
        </div>
    )
}
export default ImageCapture
