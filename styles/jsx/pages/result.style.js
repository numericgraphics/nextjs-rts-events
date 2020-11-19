import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme()) => ({
    containerGlobal: {
        justifyContent: 'flex-start'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 2,
        textAlign: 'center',
        marginBottom: 30
    },
    card: {
        minWidth: 275,
        minHeight: 200,
        margin: 20
    },
    title: {
        // fontFamily: 'srgssr-type-Bd',
        // fontSize: '1.75rem',
        textAlign: 'center',
        // lineHeight: '1.2em',
        marginBottom: '1.5vw',
        // marginTop: '17vh',
        color: theme.palette.primary.contrastText
    },
    subTitle: {
        // fontFamily: 'srgssr-type-Rg',
        // fontSize: '1.2rem',
        textAlign: 'center',
        // lineHeight: '1.2em',
        color: theme.palette.primary.contrastText,
        // marginBottom: '3rem!important

    },
    resultBox: {
        // fontFamily: 'srgssr-type-Rg',
        // fontSize: '1.2rem',
        textAlign: 'center',
        // lineHeight: '1.2em',
        color: theme.palette.primary.contrastText
        // marginBottom: '3rem!important

    },
    secondCardTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem',
        textAlign: 'center',
        // lineHeight: '1.8rem',
        marginBottom: 10,
        color: theme.palette.primary.contrastText
    },
    secondCardText: {
        // fontFamily: 'srgssr-type-Rg',
        // fontSize: '1,125rem',
        textAlign: 'center',
        color: theme.palette.primary.contrastText
    },
    secondCardButton: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
        // paddingBottom: '11rem' // Pour pouvoir scroller quand il y a deux boutons...
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'min(3vw, 30px)'
    },
    button: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cardFooter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardHeaderSuccess: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    cardHeaderWrong: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    avatar: {
        width: 100,
        height: 100
    },
    winPointText: {
        // fontFamily: 'srgssr-type-Bd',
        // fontSize: '2.5rem',
        textAlign: 'center',
        // marginTop: '15vh',
        color: theme.palette.primary.contrastText
    },
    iconType: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        fontSize: '40px'
    },
    giftContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '3px',
        marginBottom: '10px',
        maxWidth: '70vw',
        flexDirection: 'column',
        marginTop: '10px'
    },
    cardContent: {
        padding: '1.5vw min(3vw, 30px)!important'
    },
    colorCard: {
        width: '90%'
    }

}))
