import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core'

export const useStyles = makeStyles((theme = useTheme()) => ({
    closeIcon: {
    // position: 'absolute',
        width: 'min(1.8rem, 35px)',
        height: 'min(1.8rem, 35px)'
    },
    closeBtn: {
        position: 'absolute',
        top: '3vw',
        right: '3vw',
        width: 'min(1.8rem, 35px)',
        height: 'min(1.8rem, 35px)',
        zIndex: 5,
        backgroundColor: theme.palette.secondary.main,
        stroke: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    videoContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        zIndex: 4
    }
}))
