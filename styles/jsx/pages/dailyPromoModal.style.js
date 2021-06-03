import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    containerIcon: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%'
    },
    arrowSwipeDown: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    arrowSwipeDownMobile: {
        zIndex: -2
    },
    arrowSwipeDownDesktop: {
        zIndex: 3
    },
    buttonSwipeDownDesktop: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    },
    button: {
        zIndex: 2
    },
    slide: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        transition: '.3s ease'
    },
    slideActive: {
        opacity: 1,
        transitionDuration: '.2s'
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    label: {
        position: 'relative',
        color: 'white'
    }

}))
