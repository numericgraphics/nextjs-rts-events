import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const ColorBorderButton = withStyles(() => ({
    root: {
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        paddingTop: '4px!important',
        paddingBottom: '4px!important',
        boxSizing: 'border-box',
        border: '2px solid white'
    }
}))(Button)
