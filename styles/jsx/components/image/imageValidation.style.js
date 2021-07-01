import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
    },
    imageValidationText: {
        textAlign: 'center',
        marginTop: '10px',
        color: theme.palette.primary.contrastText,
        padding: '0px 15px'
    }
}))
