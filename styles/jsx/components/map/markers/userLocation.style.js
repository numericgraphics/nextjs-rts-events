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
    },
    pulse: {
        animation: '$pulse-animation 2s infinite',
        borderRadius: '50%'
    },
    '@keyframes pulse-animation': {
        '0%': {
            boxShadow: '0 0 0 0px rgba(0, 0, 0, 0.2)'
        },
        '100%': {
            boxShadow: '0 0 0 20px rgba(0, 0, 0, 0)'
        }
    }
}))
