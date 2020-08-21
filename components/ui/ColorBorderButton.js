import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const ColorBorderButton = withStyles(() => ({
    root: {
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        paddingTop: 4,
        paddingBottom: 4,
        boxSizing: 'border-box',
        border: '2px solid white'
    }
}))(Button)
