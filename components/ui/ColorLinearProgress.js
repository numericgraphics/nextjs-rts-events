import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const ColorLinearProgress = withStyles((theme) => ({
    colorPrimary: {
        backgroundColor: 'white'
    }
}))(LinearProgress)
