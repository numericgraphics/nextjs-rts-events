import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
    containerImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    overImage: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%'
    },
    animation: {
        height: '100%',
        width: '100%',
        animation: '$kenburns 60s ease-in-out infinite',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%'
    },
    '@keyframes kenburns': {
        '0%': {
            transform: 'scale(1.0)'
        },
        '50%': {
            transform: 'scale(1.2)'
        },
        '100%': {
            transform: 'scale(1.0)'
        }
    }
}))
