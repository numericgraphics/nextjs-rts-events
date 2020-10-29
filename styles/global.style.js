import { makeStyles, useTheme } from '@material-ui/core/styles'
import { hexToRGBA } from '../data/tools'

export const useStylesGlobal = makeStyles((theme = useTheme) => ({
    bottomZoneDashboard: {
        background: 'linear-gradient(to bottom, ' + hexToRGBA(theme.palette.secondary.main, 0) + ' 0%,  ' + hexToRGBA(theme.palette.secondary.main, 0.7) + ' 20%, ' + hexToRGBA(theme.palette.secondary.main, 1) + ' 100%)',
        padding: '2rem 0'
    }
}))
