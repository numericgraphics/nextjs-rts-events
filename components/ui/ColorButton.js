import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const ColorButton = withStyles(() => ({
    root: {
        color: '#FFFFFF',
        backgroundColor: '#707070',
        '&:hover': {
            backgroundColor: '#505050'
        }
    }
}))(Button)
