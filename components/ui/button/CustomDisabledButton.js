import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const CustomDisabledButton = withStyles(() => ({
    disabled: {
        color: '#777777!important',
        backgroundColor: '#444444!important'
    }
}))(Button)
