import { makeStyles, useTheme } from '@material-ui/core/styles'
import { hexToRGBA } from '../data/tools'

export const useStylesGlobal = makeStyles((theme = useTheme) => ({
    bottomZoneGradient: {
        background: 'linear-gradient(to bottom, ' + hexToRGBA(theme.palette.secondary.main, 0) + ' 0%,  ' + hexToRGBA(theme.palette.secondary.main, 0.7) + ' 20%, ' + hexToRGBA(theme.palette.secondary.main, 1) + ' 100%)',
        padding: '2rem 0'
    },
    colorOverImage: {
        backgroundColor: theme.palette.secondary.contrastText,
        opacity: 0.9
    },
    backdropFilterOverImage: {
        backdropFilter: 'blur(0.1rem)' // Chrome, edge, safari, ... https://caniuse.com/css-backdrop-filter
    }
}))
