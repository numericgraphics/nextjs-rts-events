import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    closeIcon: {
        minHeight: '24px',
        minWidth: '24px',
        maxHeight: '35px',
        maxWidth: '35px',
        width: '2.5rem',
        height: '2.5rem'
    },
    closeBtn: {
        position: 'relative',
        minHeight: '24px',
        minWidth: '24px',
        maxHeight: '35px',
        maxWidth: '35px',
        width: '2.5rem',
        height: '2.5rem',
        zIndex: 4,
        backgroundColor: theme.palette.secondary.main,
        stroke: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}))
