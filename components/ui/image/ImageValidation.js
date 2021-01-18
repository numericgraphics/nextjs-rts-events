import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/imageValidation.style'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import { useHeight } from '../../../hooks/useHeight'
import Fade from '@material-ui/core/Fade/Fade'
import ImageRecoLoader from '../../challenges/imageRecoLoader'

function ImageValidation (props) {
    const classes = useStyles()
    const theme = useTheme()
    const { translation } = props
    const [showComponent, setShowComponent] = useState(false)

    useEffect(() => {
        setShowComponent(true)
    }, [])

    return (
        <Fade
            in={showComponent}
            timeout={1000}
        >
            <Box className='content' >
                <Box
                    className={[classes.content].join(' ')}
                    style={{ height: useHeight() }}
                >
                    <ImageRecoLoader
                        color={theme.palette.primary.contrastText}
                        interval={250}
                        nDots={8}
                    />
                    <Typography
                        className={classes.imageValidationText}
                        variant='h3'
                    >
                        {translation.challengeQuestionImageValidation}
                    </Typography>
                </Box>
            </Box>
        </Fade>
    )
}
export default ImageValidation
