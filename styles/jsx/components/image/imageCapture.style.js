import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'
import { hexToRgbA } from '../../../../data/tools'

export const useStyles = makeStyles((theme = useTheme()) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        zIndex: '4',
        color: theme.palette.primary.contrastText,
        backgroundColor: hexToRgbA(theme.palette.primary.main, 0.9)
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
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    captureBtn: {
        marginTop: '15px',
        marginBottom: '20px',
        backgroundColor: theme.palette.secondary.main
    },
    cameraIcon: {
        fill: 'white',
        padding: '5px',
        minHeight: '34px',
        minWidth: '34px',
        fontSize: '5rem!important',
        maxWidth: '60px',
        maxHeight: '60px',
        borderRadius: '100%'
    },
    gradient: {
        flexGrow: 3,
        width: '100%',
        height: '5vh',
        background: `linear-gradient(${hexToRgbA(theme.palette.primary.main, 0)} 0%, ${hexToRgbA(theme.palette.primary.main, 0)} 80%,${hexToRgbA(theme.palette.primary.main, 0.9)} 100%)`
    },
    text: {
        textAlign: 'center'
    }
}))
