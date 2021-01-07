import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'
import { hexToRgbA } from '../../../../data/tools'

export const useStyles = makeStyles((theme = useTheme()) => ({
    counter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        flex: 1,
        maxHeight: 100
    },
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'center'
    },
    HeaderTitle: {
        textShadow: '0px 3px 6px #00000040'
    },
    bottomImageQuestion: {
        width: '100%',
        padding: '0!important',
        display: 'flex',
        flexDirection: 'row',
        background: 'linear-gradient(to bottom, ' + hexToRgbA(theme.palette.primary.dark, 0) + ' 0%,  ' + hexToRgbA(theme.palette.primary.dark, 0.7) + ' 20%, ' + hexToRgbA(theme.palette.primary.dark, 0.9) + ' 100%)'
    }
}))
