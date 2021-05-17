import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles(() => ({
    clusterMarker: {
        color: '#fff',
        background: '#1978c8',
        borderRadius: '50%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pointMarker: {
        color: '#fff',
        background: '#1978c8',
        borderRadius: '50%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    localisationBtn: {
        margin: '10px'
    }
}))
