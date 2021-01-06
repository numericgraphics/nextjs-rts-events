import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core'
import { hexToRgbA } from '../../../data/tools'

export const useStyles = makeStyles((theme = useTheme()) => ({
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 2
    },
    buttonClose: {
        alignSelf: 'flex-end!important',
        margin: 'min(3vw, 30px)',
        '@media only screen and (min-width: 600px)': {
            margin: 'min(2vw, 20px)'
        },
        '@media only screen and (min-width: 750px)': {
            margin: 'min(1.5vw, 15px)'
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
