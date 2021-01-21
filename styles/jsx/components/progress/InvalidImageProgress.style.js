import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        marginBottom: '1rem',
        background: theme.palette.primary.dark,
        padding: 5,
        borderRadius: 20

    },
    linearProgress: {
        height: '1.8rem',
        borderRadius: '1rem'
    }

}))
