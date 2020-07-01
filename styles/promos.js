import { makeStyles } from '@material-ui/core/styles'

// eslint-disable-next-line no-unused-vars
export const styles = {
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'gray'
    },
    containerImage: {
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'gray'
    }
}

// eslint-disable-next-line no-unused-vars
export const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    containerGlobalNoLogo: {
        justifyContent: 'flex-end',
        backgroundColor: 'gray'
    },
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100vw',
        zIndex: 2
    },
    containerOverlayNoLogo: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100vw',
        bottom: 140,
        zIndex: 2
    },
    text: {
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
    description: {
        fontFamily: 'srgssr-type-Rg',
        lineHeight: 1.40,
        fontSize: '1.125rem',
        textShadow: '0px 3px 6px #00000040'
    },
    image: {
        alignSelf: 'center',
        padding: '10px 30px',
        width: '100%'
    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)'
    }
})
