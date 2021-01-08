import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/imageValidation.style'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import ThemeFactory from '../../../data/themeFactory'
import useTheme from '@material-ui/core/styles/useTheme'
import { useHeight } from '../../../hooks/useHeight'
import Fade from '@material-ui/core/Fade/Fade'

function ImageValidation () {
    const classes = useStyles()
    const theme = useTheme()
    const [showComponent, setShowComponent] = useState(false)

    useEffect(() => {
        setShowComponent(true)
    }, [])

    return (
        <Fade in={showComponent} timeout={1000}>
            <Box className='content' >
                <Box
                    className={[classes.content].join(' ')}
                    style={{ height: useHeight() }}
                >
                    <CircularProgress
                        style={{ color: theme.palette ? theme.palette.primary.contrastText : ThemeFactory.getDefaultTheme().palette.primary.contrastText }}
                    />
                    <Typography
                        className={classes.imageValidationText}
                        variant='subtitle1'
                    >
            Votre photo est en cours de validation
                    </Typography>
                </Box>
            </Box>
        </Fade>
    )
}
export default ImageValidation
