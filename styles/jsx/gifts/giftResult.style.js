import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '3px',
        marginBottom: '10px',
        flexDirection: 'column',
        marginTop: '25px'
    },
    text: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.10rem',
        textAlign: 'left',
        marginLeft: '5px',
        marginRight: '15px',
        lineHeight: 1,
        color: theme.palette.primary.contrastText
    },
    giftIcon: {
        fill: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        minHeight: '34px',
        minWidth: '34px',
        fontSize: '5rem!important',
        maxWidth: '50px',
        maxHeight: '50px',
        borderRadius: '100%'
    },
    lock: {
        position: 'absolute',
        marginTop: '-20px',
        height: '32.4px',
        width: '32.4px',
        zIndex: 2
    },
    gift: {
        backgroundColor: theme.palette.primary.main,
        height: '3rem',
        width: '3rem'
    },
    giftContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        borderRadius: 40,
        backgroundColor: theme.palette.primary.light,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 5,
        textTransform: 'none!important',
        boxShadow: 'none!important',
        height: '100%',
        width: '100%',
        maxWidth: '70vw',
        zIndex: 1,
        '&:hover':
            {
                backgroundColor: theme.palette.primary.dark
            }
    }
}))
