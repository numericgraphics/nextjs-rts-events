import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'

export const useStyles = makeStyles((theme = useTheme()) => ({
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: 'min(3vw, 30px)',
        '& .MuiIconButton-root': {
            padding: '0!important'
        },
        '@media only screen and (min-width: 600px)': {
            padding: 'min(2vw, 20px)'
        },
        '@media only screen and (min-width: 750px)': {
            padding: 'min(1.5vw, 15px)'
        }
    },
    textButton: {
        textTransform: 'none',
        lineHeight: 1,
        padding: '0!important',
        marginBottom: '1rem',
        color: theme.palette.secondary.main
    }
}))
