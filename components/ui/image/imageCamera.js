import React, { useState } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend'
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
    const [imageValidation, setImageValidation] = useState(false)

    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0]
                const newUrl = URL.createObjectURL(file)
                console.log(newUrl)
                setImageValidation(true)
                props.setImageURL(newUrl)
            }
        }
    }

    const resend = () => {
        setImageValidation(false)
    }

    return (
        <div className={classes.root}>
            {imageValidation
                ? <React.Fragment>
                    <Typography>En cours de validation ...</Typography>
                    <IconButton
                        onClick={() => resend()}
                        color="secondary"
                        aria-label="resend your picture"
                        component="span"
                    >
                        <CancelScheduleSendIcon fontSize="large" color="primary" />
                    </IconButton>
                </React.Fragment>
                : <React.Fragment>
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
                </React.Fragment>
            }
        </div>
    )
}
export default ImageCapture
