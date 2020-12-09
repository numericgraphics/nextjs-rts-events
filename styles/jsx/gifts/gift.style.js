import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core'
import { hexToRgbA } from '../../../data/tools'

export const useStyles = makeStyles((theme = useTheme()) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
    },
    containerModal: {
        backgroundColor: theme.palette.primary.main
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 2
    },
    closeBtn: {
        position: 'absolute',
        top: '3vw',
        right: '3vw',
        width: 'min(1.8rem, 35px)',
        height: 'min(1.8rem, 35px)',
        zIndex: 4,
        backgroundColor: theme.palette.secondary.main,
        stroke: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    lock: {
        minHeight: '68px',
        minWidth: '68px',
        maxHeight: '116px',
        maxWidth: '116px',
        width: '20vw',
        height: '20vw',
        zIndex: 4,
        fill: theme.palette.primary.contrastText
    },
    iconContainer: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        background: `linear-gradient(${hexToRgbA(theme.palette.primary.main, 0)} 0%, ${hexToRgbA(theme.palette.primary.main, 0.9)} 100%)`
    },
    svgIco: {
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px'
    },
    containerText: {
        position: 'relative',
        padding: '3vw 6vw 6vw 6vw',
        flexGrow: 0,
        color: theme.palette.primary.contrastText,
        backgroundColor: hexToRgbA(theme.palette.primary.main, 0.9)
    },
    title: {
        paddingBottom: '1.5vw'
    },
    description: {
        letterSpacing: '0em'
    },
    root: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        }
    },
    topGradient: {
        flexGrow: 3,
        width: '100%',
        background: `linear-gradient(${hexToRgbA(theme.palette.primary.main, 0)} 0%, ${hexToRgbA(theme.palette.primary.main, 0)} 80%,${hexToRgbA(theme.palette.primary.main, 0.9)} 100%)`
    },
    closeIcon: {
        // position: 'absolute',
        width: 'min(1.8rem, 35px)',
        height: 'min(1.8rem, 35px)'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        position: 'absolute',
        width: '100%'
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        top: 0,
        zIndex: 1,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'cover'
    },
    videoContainer: {
        height: '100%',
        width: '100%',
        display: 'flex'
    },
    play: {
        width: 'min(2.8rem, 65px)',
        height: 'min(2.8rem, 65px)',
        zIndex: 4,
        fill: theme.palette.primary.contrastText
    },
    playButton: {
        width: 'min(2.8rem, 65px)',
        height: 'min(2.8rem, 65px)',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }

}))
