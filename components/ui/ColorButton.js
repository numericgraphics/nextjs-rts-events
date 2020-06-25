import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#707070'),
        backgroundColor: '#707070',
        '&:hover': {
            backgroundColor: '#505050'
        }
    }
}))(Button)
