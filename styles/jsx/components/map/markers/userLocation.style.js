import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles(() => ({
    markerBox: {
        width: '15px',
        height: '15px',
        borderRadius: '15px / 15px',
        border: 'solid white 2px',
        background: '#225cfb',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -100%)'
    }
}))
