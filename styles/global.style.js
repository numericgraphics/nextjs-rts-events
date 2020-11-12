import { makeStyles, useTheme } from '@material-ui/core/styles'
import { hexToRGBA } from '../data/tools'

export const useStylesGlobal = makeStyles((theme = useTheme) => ({
    bottomZoneGradient: {
        background: 'linear-gradient(to bottom, ' + hexToRGBA(theme.palette.primary.dark, 0) + ' 0%,  ' + hexToRGBA(theme.palette.primary.dark, 0.7) + ' 20%, ' + hexToRGBA(theme.palette.primary.dark, 1) + ' 100%)',
        padding: '2rem 0'
    },
    colorOverImage: {
        backgroundColor: theme.palette.primary.main,
        opacity: '0.7!important'
    },
    backdropFilterOverImage: {
        backdropFilter: 'blur(0.3rem)' // Chrome, edge, safari, ... https://caniuse.com/css-backdrop-filter
    }
}))
