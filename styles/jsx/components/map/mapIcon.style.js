import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    icon: {
        minHeight: '34px',
        minWidth: '34px',
        width: '10vw',
        height: '10vw',
        margin: '10px 10px',
        maxWidth: '50px',
        maxHeight: '50px',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    containerIcon: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapsIcon: {
        fill: theme.palette.secondary.contrastText,
        minHeight: '34px',
        minWidth: '34px',
        width: '10vw',
        height: '10vw',
        maxWidth: '50px',
        maxHeight: '50px',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        borderRadius: '30px'
    }
}))
