import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const CustomDisabledButton = withStyles(() => ({
    disabled: {
        color: 'rgba(0, 0, 0, 0.26)!important',
        backgroundColor: 'rgba(62, 62, 62, 0.6)!important'
    }
}))(Button)
