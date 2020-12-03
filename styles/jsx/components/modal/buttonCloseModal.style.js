import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    closeIcon: {
        // minHeight: '24px',
        // minWidth: '24px',
        // maxHeight: '35px',
        // maxWidth: '35px',
        width: 'min(1.8rem, 35px)',
        height: 'min(1.8rem, 35px)'
    },
    closeBtn: {
        position: 'relative',
        // minHeight: '24px',
        // minWidth: '24px',
        // maxHeight: '35px',
        // maxWidth: '35px',
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
