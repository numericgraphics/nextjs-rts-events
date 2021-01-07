import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/invalidImage.style'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import ThemeFactory from '../../../data/themeFactory'
import useTheme from '@material-ui/core/styles/useTheme'
import { useHeight } from '../../../hooks/useHeight'

function ImageValidation (props) {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Box className={[classes.containerLoading, 'background'].join(' ')} style={{ height: useHeight() }} >
            <CircularProgress style={{ color: theme.palette ? theme.palette.primary.contrastText : ThemeFactory.getDefaultTheme().palette.primary.contrastText }} />
            <Typography className={classes.imageValidationText} variant='subtitle1'>
        Votre photo est en cours de validation
            </Typography>
        </Box>
    )
}
export default ImageValidation
