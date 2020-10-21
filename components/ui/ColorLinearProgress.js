import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const ColorLinearProgress = withStyles((theme) => ({
    colorPrimary: {
        backgroundColor: theme.palette.secondary.dark
    },
    barColorPrimary: {
        backgroundColor: theme.palette.secondary.light
    },
    bar: {
        borderRadius: 0
    }
}))(LinearProgress)
