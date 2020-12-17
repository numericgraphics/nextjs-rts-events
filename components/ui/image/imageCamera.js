import React, { useRef, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded'; const useStyles = makeStyles((theme) => ({
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
    const videoRef = useRef()
    const canevaRef = useRef()
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

    function takePicture () {
        const context = canevaRef.current.getContext('2d')
        context.drawImage(props.videoRef.current, 0, 0)
    }

    useEffect(() => {
        if (videoRef) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                    console.log(navigator.mediaDevices.getSupportedConstraints())
                    // videoRef.current.src = window.URL.createObjectURL(stream)
                    props.videoRef.current.srcObject = stream
                    props.videoRef.current.play()
                })
            }
        }
    }, [videoRef])

    return (
        <div className={classes.root}>
            <canvas id="canvas" ref={canevaRef} className={'backgroundVideo'}/>
            <video ref={videoRef} id="video" className={'backgroundVideo'} autoPlay/>
            <IconButton
                color="primary"
                aria-label="upload you picture"
                component="span"
                onClick={takePicture}
            >
                <PhotoCameraRoundedIcon fontSize="large" color="primary" />
            </IconButton>
        </div>
    )
}
export default ImageCapture
