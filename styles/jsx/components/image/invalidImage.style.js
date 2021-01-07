import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'

export const useStyles = makeStyles((theme = useTheme()) => ({
    cardContent: {
        padding: '1.5vw min(3vw, 30px)!important',
        display: 'flex',
        flexDirection: 'column'
    },
    colorCard: {
        width: '90%'
    },
    invalidImageText: {
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        marginBottom: '15px'
    },
    containerInvalidImage: {
        position: 'fixed',
        display: 'flex',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'column'
    }
}))
