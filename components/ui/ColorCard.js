import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'

export const ColorCard = withStyles((theme) => ({
    root: {
        background: `${theme.palette.secondary.main}!important`,
        color: `${theme.palette.secondary.contrastText}!important`,
        // Changement du border Radius fait globalement depuis la révision de la dasboard. avant 16px
        borderRadius: '6px',
        minHeight: '0px!important',
        boxShadow: 'none'
    }
}))(Card)
