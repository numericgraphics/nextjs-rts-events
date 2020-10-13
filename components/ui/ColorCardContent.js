import withStyles from '@material-ui/core/styles/withStyles'
import CardContent from '@material-ui/core/CardContent'

export const ColorCardContent = withStyles(() => ({
    root: {
        minHeight: '0px!important'
    }
}))(CardContent)
