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
        height: '16vh',
        bottom: 0,
        margin: '0 0 2vh 0',
        padding: 0
    },
    subContent: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    subBottomZone: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        margin: '0 0 18vh 0'
    },
    button: {
        width: '80vw',
        bottom: 20,
        borderRadius: 30,
        alignSelf: 'center',
        fontSize: '1.25rem',
        padding: '6px 20px'
    },
    cg: {
        alignSelf: 'center',
        color: 'white',
        marginBottom: 10,
        fontsize: '0.8125rem'
    },
    cgLink: {
        textAlign: 'center'
    },
    text: {
        color: 'white',
        padding: '10px 30px'
    },
    title: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '2.5rem',
        lineHeight: '1em',
        marginBottom: 12,
        textShadow: '0px 3px 6px #00000040'
    },
    subTitle: {
        fontFamily: 'srgssr-type-Bd',
        lineHeight: '1em',
        fontSize: '1.5rem',
        marginBottom: 12,
        textShadow: '0px 3px 6px #00000040'
    },
    image: {
        alignSelf: 'center',
        padding: '10px 30px',
        width: '100%'
    },
    promosAnimation: {
        opacity: 0,
        WebkitAnimationName: 'fadeIn',
        WebkitAnimationDuration: '1s',
        WebkitAnimationTimingFunction: 'ease-in',
        WebkitAnimationDelay: '0.5s',
        WebkitAnimationFillMode: 'forwards'
    }
})
