import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    closeIcon: {
        minHeight: '24px',
        minWidth: '24px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '5vw',
        height: '5vw'
    },
    closeBtn: {
        position: 'absolute',
        top: '3vw',
        right: '3vw',
        minHeight: '24px',
        minWidth: '24px',
        maxHeight: '58px',
        maxWidth: '58px',
        width: '1rem',
        height: '1rem',
        zIndex: 4,
        backgroundColor: theme.palette.secondary.main,
        stroke: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}))
