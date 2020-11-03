import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'

export const ColorCard = withStyles((theme) => ({
    root: {
        background: `${theme.palette.primary.light}!important`,
        color: `${theme.palette.primary.contrastText}!important`,
        // Changement du border Radius fait globalement depuis la révision de la dasboard. avant 16px
        borderRadius: '0.6rem',
        minHeight: '0px!important',
        boxShadow: 'none',
        padding: '0.5rem'
    }
}))(Card)
