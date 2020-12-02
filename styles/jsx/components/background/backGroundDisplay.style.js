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
    image: {
        height: '100%',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%'
    }
}))
