import React from 'react'
import { IconButton } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/imageCapture.style'
import Typography from '@material-ui/core/Typography'
import { CameraIcon } from '../../../data/icon'
import { CustomDisabledButton } from '../../ui/button/CustomDisabledButton'
import Router, { useRouter } from 'next/router'

function ImageCapture (props) {
    const classes = useStyles()
    const { result, text, translation } = props
    const router = useRouter()
    const { events } = router.query

    // Select the image
    const handleCapture = (target) => {
        if (target.files && target.files.length !== 0) {
            result(target.files[0])
        }
    }

    async function gotoDashBoard () {
        await Router.push('/[events]/dashBoard', `/${events}/dashBoard`)
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

                <Box className={classes.btnContainer}>
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
                    <CustomDisabledButton onClick={gotoDashBoard} color="secondary" variant="contained" className={['questionButton', classes.replayBtn].join(' ')}>
                        {translation.challengeQuestionImageLater}
                    </CustomDisabledButton>
                </Box>
            </Box>
        </Box>
    )
}
export default ImageCapture
