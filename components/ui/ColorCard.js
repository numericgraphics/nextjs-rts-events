import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'

export const ColorCard = withStyles((theme) => ({
    root: {
        background: `${theme.palette.primary.light}!important`,
        color: `${theme.palette.primary.contrastText}!important`,
        padding: 0
    }
}))(Card)
