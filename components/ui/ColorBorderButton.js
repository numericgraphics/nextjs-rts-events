import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

export const ColorBorderButton = withStyles(() => ({
    root: {
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        paddingTop: '3px!important',
        paddingBottom: '3px!important',
        boxSizing: 'border-box',
        border: '1px solid white'
    }
}))(Button)
