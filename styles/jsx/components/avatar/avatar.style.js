import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    avatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    avatar: {
        width: '6rem',
        height: '6rem',
        marginBottom: '0.5rem',
        zIndex: 1
    },
    avatarBg: {
        position: 'absolute',
        width: '6rem',
        height: '6rem',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '50%',
        display: 'inline-block',
        zIndex: 0
    }
}))
