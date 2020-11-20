import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
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
    }
})

export const styles = {
    textFieldValidated: {
        boxShadow: '0 0 0 0.2rem rgba(0, 255, 20, 1)',
        WebkitAppearance: 'none'
    },
    textFieldNotValidated: {
        boxShadow: '0 0 0 0.2rem rgba(255, 112, 0, 1)',
        WebkitAppearance: 'none'
    }
}
