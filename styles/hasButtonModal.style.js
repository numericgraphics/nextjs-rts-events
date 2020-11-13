import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme) => ({
    icon: {
        fontSize: '6rem',
        marginBottom: '3vw'
    },
    modalContent: {
        color: theme.palette.primary.contrastText,
        position: 'absolute',

        '& p': {
            marginBottom: '3vw!important'
        },

        '& .button': {
            marginBottom: '6vw!important'
        }
    },
    textButton: {
        textTransform: 'none',
        lineHeight: 1,
        padding: '0!important',
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
