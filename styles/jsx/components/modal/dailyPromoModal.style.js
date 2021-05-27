import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core'
import { hexToRgbA } from '../../../../data/tools'

export const useStyles = makeStyles((theme = useTheme()) => ({
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: theme.palette.primary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)'
    },
    buttonClose: {
        alignSelf: 'flex-end!important',
        margin: 'min(3vw, 30px)',
        '@media only screen and (min-width: 600px)': {
            margin: 'min(2vw, 20px)'
        },
        '@media only screen and (min-width: 750px)': {
            margin: 'min(1.5vw, 15px)'
        }
    }
}))
