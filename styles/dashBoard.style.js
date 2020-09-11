import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '10px 30px',
        maxHeight: 200,
        zIndex: 2,
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 30,
        zIndex: 2,
        textAlign: 'center'
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.75rem',
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10
    },
    avatar: {
        width: 100,
        height: 100,
        position: 'absolute',
        marginTop: '-25px'
    },
    rateIcon: {
        display: 'inline'
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginBottom: '30px',
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    cardFooter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardHeaderSide: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardHeaderLeftSideText: {
        alignSelf: 'left',
        textAlign: 'left',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '0.8rem',
        display: 'flex',
        flexWrap: 'wrap'
    },
    cardHeaderRightSideText: {
        alignSelf: 'flex-end',
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem'
    },
    textRegularCenter: {
        textAlign: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.1rem'
    },
    card: {
        zIndex: 2
    },
    HeaderTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.25rem'
    },
    HeaderText: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '80%',
        padding: '6px 20px',
        marginTop: 10,
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem'
    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%)'
    }
})
