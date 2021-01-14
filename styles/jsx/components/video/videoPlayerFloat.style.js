import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core'

export const useStyles = makeStyles((theme = useTheme()) => ({
    buttonClose: {
        alignSelf: 'flex-end!important',
        margin: 'min(3vw, 30px)',
        zIndex: 5,
        backgroundColor: theme.palette.secondary.main,
        stroke: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        },
        '@media only screen and (min-width: 600px)': {
            margin: 'min(2vw, 20px)'
        },
        '@media only screen and (min-width: 750px)': {
            margin: 'min(1.5vw, 15px)'
        }
    },
    videoContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        zIndex: 4
    }
}))
