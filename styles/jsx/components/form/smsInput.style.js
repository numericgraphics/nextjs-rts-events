import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme = useTheme()) => ({
    input: {
        width: '2.1rem',
        height: '2.5rem',
        fontFamily: 'srgssr-type-Md, sans-serif',
        fontSize: '1.25rem',
        margin: '0.3rem',
        color: '#020202',
        textAlign: 'center',
        border: 'none!important',
        borderRadius: 2
    },
    textFieldValidated: {
        boxShadow: `0 0 0 0.2rem ${theme.palette.formValidate}`,
        WebkitAppearance: 'none'
    },
    textFieldNotValidated: {
        boxShadow: `0 0 0 0.2rem ${theme.palette.formNoValidate}`,
        WebkitAppearance: 'none'
    }
}))

export const styles = {
    test: {
        margin: '3px'
    }
}
