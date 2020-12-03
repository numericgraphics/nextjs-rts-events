import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    closeIcon: {
        width: 'min(1.8rem, 35px)',
        height: 'min(1.8rem, 35px)'
    },
    closeBtn: {
        position: 'relative',
        width: 'min(1.8rem, 35px)',
        height: 'min(1.8rem, 35px)',
        zIndex: 4,
        backgroundColor: theme.palette.secondary.main,
        stroke: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}))
