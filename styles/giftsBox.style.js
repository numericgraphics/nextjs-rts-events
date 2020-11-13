import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    gift: {
        minHeight: '34px',
        minWidth: '34px',
        width: '10vw',
        height: '10vw',
        marginLeft: '10px',
        marginRight: '10px',
        maxWidth: '50px',
        maxHeight: '50px',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    containerGifts: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gifts: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        rowGap: '1vw'
    },
    textRegularCenter: {
        marginBottom: '1.5vw'
    },
    cadeau: {
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
        zIndex: 1
    },
    medal: {
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
        zIndex: 1
    },
    lock: {
        position: 'absolute',
        top: 0,
        right: '70%',
        minHeight: '17px',
        minWidth: '17px',
        maxWidth: '25px',
        maxHeight: '25px',
        width: '7.5vw',
        height: '7.5vw',
        fill: theme.palette.secondary.contrastText,
        zIndex: 1
    }
}))
