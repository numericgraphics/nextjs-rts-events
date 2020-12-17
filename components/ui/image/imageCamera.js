import React, { useEffect } from 'react'
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
    const { videoController, setData } = props
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

    /* function takePicture () {
        const context = canevaRef.current.getContext('2d')
        context.drawImage(videoRef.current, 0, 0)
        console.log(context)
    } */

    function takeASnap () {
        const canvas = document.createElement('canvas') // create a canvas
        const ctx = canvas.getContext('2d') // get its context
        canvas.width = videoController.player.current.videoWidth // set its size to the one of the video
        canvas.height = videoController.player.current.videoHeight
        ctx.drawImage(videoController.player.current, 0, 0) // the video
        console.log(ctx)
        const img = new Promise((resolve, reject) => {
            canvas.toBlob(resolve, 'image/jpeg') // request a Blob from the canvas
        })
        console.log(img)
        // document.body.appendChild(canvas)
        // videoController.setVideoPoster(img)
        videoController.player.current.pause()
        setData(img)
    }

    useEffect(() => {
        if (videoController.player) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                    console.log(navigator.mediaDevices.getSupportedConstraints())
                    // videoRef.current.src = window.URL.createObjectURL(stream)
                    videoController.player.current.srcObject = stream
                    videoController.player.current.play()
                })
            }
        }
    }, [videoController.player])

    return (
        <div className={classes.root}>
            <IconButton
                color="primary"
                aria-label="upload you picture"
                component="span"
                onClick={takeASnap}
            >
                <PhotoCameraRoundedIcon fontSize="large" color="primary" />
            </IconButton>
        </div>
    )
}
export default ImageCapture
