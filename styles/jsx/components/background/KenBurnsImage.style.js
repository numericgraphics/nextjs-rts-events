import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
    containerImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%'
    },
    animation: {
        animation: '$kenburns 20s ease-in-out infinite'
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
