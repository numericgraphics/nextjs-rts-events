import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'
// import { hexToRgbA } from '../../../../data/tools'

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
        textShadow: '0px 3px 6px #00000040',
        padding: '4vw'
    },
    bottomImageQuestion: {
        padding: 0
    }
}))
