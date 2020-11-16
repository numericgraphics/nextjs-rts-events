import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 3rem',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: '3vw!important'
    },
    nickname: {
        textAlign: 'center',
        marginBottom: '0.5rem',
        color: theme.palette.primary.contrastText
    },
    rateIcon: {
        display: 'inline',
        width: '1rem',
        height: '1rem',
        marginRight: '0.2rem',
        color: '#FFF!important'
    },
    rateText: {
        alignSelf: 'left',
        textAlign: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF!important'
    },
    scoreChunkText: {
        alignSelf: 'flex-end',
        textAlign: 'center',
        width: '100%',
        color: theme.palette.primary.contrastText
    },
    textRegularCenter: {
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        marginBottom: '0.5rem'
    },
    textRegularCenterOverlay: {
        position: 'absolute',
        zIndex: 2,
        textAlign: 'center',
        color: theme.palette.primary.contrastText
    },
    progressBarOverlay: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.4rem'
    },
    rateBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    goodRateBox: {
        width: '50%',
        backgroundColor: '#00B445',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.2rem',
        borderBottomLeftRadius: '0.6rem',
        borderTopLeftRadius: '0.6rem'
    },
    badRateBox: {
        width: '50%',
        backgroundColor: '#FF0000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.2rem',
        borderBottomRightRadius: '0.6rem',
        borderTopRightRadius: '0.6rem'
    },
    colorCard: {
        marginBottom: '0.4rem',
        borderRadius: '0.5rem'
    },
    remainingTime: {
        color: theme.palette.primary.contrastText
    },
    cardContent: {
        padding: '1.5vw 3vw!important'
    },
    adminToolbar: {
        position: 'absolute',
        zIndex: 9999999999,
        top: 5,
        left: 5,
        backgroundColor: 'red',
        opacity: 0.8,
        padding: '2px 5px',
        boxShadow: '0px 0px 7px 2px #000000'
    }
}))
