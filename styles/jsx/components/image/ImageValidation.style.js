import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    containerLoading: {
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
    },
    imageValidationText: {
        marginTop: '10px'
    }
})
