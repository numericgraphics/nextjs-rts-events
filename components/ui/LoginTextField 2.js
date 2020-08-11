import React from 'react'
import TextField from '@material-ui/core/TextField/TextField'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        }
    }
}))

const styles = {
    textField: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.125rem',
        color: '#020202',
        border: 'none',
        width: '50vw',
        backgroundColor: 'white',
        textAlign: 'center'
    }
}

export default function LoginTextField (props) {
    const { id, value, placeHolder } = props
    const classes = useStyles()
    return (
        <TextField
            className={classes.root}
            inputProps={{ style: styles.textField }}
            id={id}
            placeholder={placeHolder}
            variant="outlined"
            type="number"
            value={value}
            onChange={event =>
                props.onChange(event.target.value)
            }/>
    )
}
