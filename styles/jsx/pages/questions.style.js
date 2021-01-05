import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'
import { hexToRgbA } from '../../../data/tools'

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
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 2,
        textAlign: 'center',
        marginBottom: 30
    },
    avatar: {
        width: 100,
        height: 100,
        border: 'solid',
        borderColor: 'gray'
    },
    card: {
        minWidth: 275,
        minHeight: 300,
        margin: 20
    },
    HeaderText: {
        lineHeight: '1.2em',
        textShadow: '0px 3px 6px #00000040'
    },
    HeaderTitle: {
        textShadow: '0px 3px 6px #00000040'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 275,
        minHeight: 300
    },
    buttonWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonProgress: {
        position: 'absolute'
    },
    bottomImageQuestion: {
        width: '100%',
        padding: '0!important',
        display: 'flex',
        flexDirection: 'row',
        background: `linear-gradient(${hexToRgbA(theme.palette.primary.main, 0)} 0%, ${hexToRgbA(theme.palette.primary.main, 0.9)} 100%)`
    },
    buttonValidImage: {
        margin: '0px 5px 0px 5px'
    }
}))
