import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    icon: {
        fontSize: '6rem',
        marginBottom: '3vw'
    },
    text: {
        color: theme.palette.primary.contrastText,
        position: 'absolute'
    },
    textButton: {
        textTransform: 'none',
        lineHeight: 1,
        color: theme.palette.primary.contrastText
    },
    overImage: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        height: '100%',
        width: '100%'
    }
}))
