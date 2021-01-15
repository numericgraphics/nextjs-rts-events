import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const DarkColorLinearProgress = withStyles((theme) => ({
    root: {
        border: `3px ${theme.palette.primary.dark} solid`
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.light
    },
    bar: {
        backgroundColor: theme.palette.primary.dark
    }
}))(LinearProgress)
