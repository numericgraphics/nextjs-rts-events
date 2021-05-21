import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    clusterMarker: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        borderRadius: '50%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    activeCluster: {
        // backgroundColor: 'red!important',
        border: 'solid 3px ' + theme.palette.secondary.contrastText + '!important',
        color: theme.palette.secondary.contrastText + '!important'
    },
    pointMarker: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        borderRadius: '50%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '&:hover': {
            cursor: 'pointer'
        },
        height: '18px',
        width: '18px',
        border: 'none'
    },
    localisationBtn: {
        margin: '10px',
        height: '40px',
        width: '40px',
        backgroundColor: 'white',
        padding: '5px'
    },
    slideHeader: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
    },
    slideContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideImage: {
        objectFit: 'cover',
        height: '30vh',
        width: '100%',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        maxWidth: '300px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },
    avatar: {
        width: '1.5rem',
        height: '1.5rem',
        zIndex: 1
    },
    headerText: {
        fontSize: '1rem',
        marginLeft: '10px'
    }
}))
