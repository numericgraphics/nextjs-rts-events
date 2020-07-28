import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'

export const ColorCard = withStyles((theme) => ({
    root: {
        background: `${theme.palette.secondary.main}!important`,
        color: `${theme.palette.secondary.contrastText}!important`,
        borderRadius: '16px',
        minHeight: '250px!important',
        boxShadow: 'none'
    }
}))(Card)
