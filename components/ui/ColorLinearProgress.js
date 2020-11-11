import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const ColorLinearProgress = withStyles((theme) => ({
    colorPrimary: {
        backgroundColor: theme.palette.primary.light
    },
    barColorPrimary: {
        backgroundColor: theme.palette.primary.dark
    },
    bar: {
        borderRadius: 0
    }
}))(LinearProgress)
