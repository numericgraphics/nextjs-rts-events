import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'

    },
    containerProgress: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'none',
        pointerEvents: 'none'
    },
    textProgress: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '6rem'
    },
    bottomCircle: {
        color: 'white'
    },
    topCircle: {
        position: 'absolute',
        left: 0
    },
    animation: {
        animation: 'growFadeOut .5s'
    }
}))
