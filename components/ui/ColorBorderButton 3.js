import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const ColorBorderButton = withStyles(() => ({
    root: {
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        border: '3px solid white'
    }
}))(Button)
