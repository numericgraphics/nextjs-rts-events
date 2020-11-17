import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core'
import { hexToRgbA } from '../../../../data/tools'

export const useStyles = makeStyles((theme = useTheme()) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: 30
    },
    closeBtn: {
        position: 'absolute',
        top: '3vw',
        right: '3vw',
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '2.5rem',
        height: '2.5rem',
        zIndex: 4,
        backgroundColor: theme.palette.secondary.main,
        stroke: theme.palette.secondary.contrastText
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
    lockContainer: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 3
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
    gradient: {
        flexGrow: 3,
        width: '100%',
        background: `linear-gradient(${hexToRgbA(theme.palette.primary.main, 0)} 0%, ${hexToRgbA(theme.palette.primary.main, 0)} 80%,${hexToRgbA(theme.palette.primary.main, 0.9)} 100%)`
    },
    closeIcon: {
        position: 'absolute',
        minHeight: '34px',
        minWidth: '34px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '8vw',
        height: '8vw'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        position: 'absolute',
        width: '100%'
    }
}))
