import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    content: {
        padding: '0 0 0 0'
    },
    // height fix for promo template bottom text
    bottomZone: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: '6rem',
        bottom: 0,
        margin: '0 0 1rem 0',
        padding: 0
    },
    subContent: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    subBottomZone: {
        width: '100%',
        margin: '0 0 7rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    text: {
        color: 'white',
        padding: '10px 30px',
        overflowWrap: 'break-word'
    },
    title: {
        fontFamily: 'srgssr-type-Rg!important',
        fontSize: '2.5rem!important',
        lineHeight: '2.6rem!important',
        marginBottom: '12px!important',
        textShadow: '0px 1px 6px #000000',
        overflowWrap: 'break-word'
    },
    subTitle: {
        fontFamily: 'srgssr-type-Bd',
        lineHeight: '2rem',
        fontSize: '1.5rem',
        marginBottom: 12,
        textShadow: '0px 1px 4px #000000',
        overflowWrap: 'break-word'
    },
    image: {
        alignSelf: 'center',
        padding: '10px 30px',
        width: '100%'
    },
    contentSwipeableView: {
        position: 'relative'
    },
    backgroundSwipeableView: {
        width: '100%',
        height: '100vh',
        zIndex: -2
    },
    gradientSwipeableView: {
        position: 'absolute',
        width: '100%',
        zIndex: -1,
        background: 'linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%)'
    }
})
