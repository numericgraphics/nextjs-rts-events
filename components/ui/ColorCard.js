import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'

export const ColorCard = withStyles(() => ({
    root: {
        borderRadius: '16px'
    }
}))(Card)
