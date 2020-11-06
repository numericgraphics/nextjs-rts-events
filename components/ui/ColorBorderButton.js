import { withStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const ColorBorderButton = withStyles((theme = useTheme()) => ({
    root: {
        color: theme.palette.secondary.main,
        backgroundColor: 'transparent',
        paddingTop: '3px!important',
        paddingBottom: '3px!important',
        boxSizing: 'border-box',
        border: '3px solid',
        borderColor: theme.palette.secondary.main
    }
}))(Button)
