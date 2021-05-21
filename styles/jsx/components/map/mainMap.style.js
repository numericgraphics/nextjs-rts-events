import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    clusterMarker: {
        color: '#fff',
        background: '#1978c8',
        borderRadius: '50%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    activeCluster: {
        backgroundColor: 'red!important'
    },
    pointMarker: {
        color: '#fff',
        background: '#1978c8',
        borderRadius: '50%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
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
        maxWidth: '300px'
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
