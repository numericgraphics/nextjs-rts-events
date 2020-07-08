import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'

export const ColorCardActions = withStyles(() => ({
    root: {
        background: '#56C8D8!important',
        borderRadius: '0px 0px 8px 8px',
        margin: 10
    }
}))(Paper)
