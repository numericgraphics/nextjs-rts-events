import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'

export const ColorCardActions = withStyles((theme) => ({
    root: {
        background: `${theme.palette.secondary.light}!important`,
        borderRadius: '0px 0px 8px 8px',
        margin: 10,
        boxShadow: 'none'
    }
}))(Paper)
