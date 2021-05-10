import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core'

export const useStyles = makeStyles((theme = useTheme()) => ({
    detailContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        height: '60vh'
    },
    previousImage: {
        width: '50%',
        height: '100%',
        position: 'absolute',
        bottom: '0',
        left: '0'
    },
    nextImage: {
        width: '50%',
        height: '100%',
        position: 'absolute',
        bottom: '0',
        right: '0'
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: '1.3rem'
    },
    imageContainer: {
        width: '100%',
        height: '100%'
    }
}))
