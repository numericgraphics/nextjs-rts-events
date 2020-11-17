import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
    containerImage: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%'
    },
    overImage: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%'
    }
}))
