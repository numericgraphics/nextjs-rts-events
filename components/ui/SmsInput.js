import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    input: {
        width: '42px',
        height: '48px',
        margin: '4px',
        fontFamily: 'srgssr-type-Bd',
        color: '#020202',
        fontSize: '1.125rem',
        textAlign: 'center'
    }
})

const digitState = () => {
    const init = {
        digit1: '',
        digit2: '',
        digit3: '',
        digit4: ''
    }
    const [values, setValues] = useState(init)
    return [values, setValues]
}

function SmsInput (props) {
    const classes = useStyles()
    const input = useRef()
    const [values, setValues] = digitState()
    const lastDigit = useRef()

    function handleInput (e) {
        if (e.target.value === '' && e.target.previousElementSibling !== null) {
            e.target.previousElementSibling.focus()
        } else {
            // eslint-disable-next-line no-unused-expressions
            e.data !== undefined ? e.target.value = e.data.replace(/[^0-9]/g, '') : null
        }
        if (e.target.value !== '' && e.target.nextElementSibling && e.target.nextElementSibling.nodeName === 'INPUT') {
            if (/[^0-9]/.test(e.target.value)) return e.preventDefault()
            e.target.nextElementSibling.focus()
        }
    }
    function handlePaste (ev) {
        const paste = ev.clipboardData.getData('text')
        if (!/\d{4}/.test(paste)) return ev.preventDefault()
        const s = [...paste]
        const init = {
            digit1: s[0],
            digit2: s[1],
            digit3: s[2],
            digit4: s[3]
        }
        setValues(init)
        getCode(paste)
        lastDigit.current.focus()
    }

    const handleChange = (event) => {
        if (/[^0-9]/.test(event.target.value)) return event.preventDefault()
        setValues({ ...values, [event.target.name]: event.target.value })
        getCode(event.target.value)
    }

    function KeyCheck (event) {
        var KeyID = event.keyCode
        switch (KeyID) {
        case 8:
            if (event.target.value === '' && event.target.previousElementSibling !== null) {
                event.target.previousElementSibling.focus()
            }
            break
        default:
            if (event.target.value !== '' && event.target.nextElementSibling && event.target.nextElementSibling.nodeName === 'INPUT') {
                event.target.nextElementSibling.focus()
            }
            break
        }
    }

    function getCode (lastTyped) {
        props.onChange(!/\d{4}/.test(lastTyped) ? values.digit1 + values.digit2 + values.digit3 + lastTyped : lastTyped)
    }

    function getInput () {
        let inputProps = {
            autoFocus: true,
            ref: null
        }
        let inpTab = []
        const valuesTab = [Object.keys(values)]
        for (const proprety in values) {
            if (proprety !== 'digit1') {
                inputProps.autoFocus = false
            }
            if ('digit' + valuesTab[0].length === proprety) {
                inputProps.ref = lastDigit
            }
            inpTab.push(<input {...inputProps} className={classes.input} onKeyDown={KeyCheck} autoComplete="one-time-code" onInput={handleInput} onPaste={handlePaste} value={values[proprety]} onChange={handleChange} type="text" maxLength="1" name={'digit' + i } />)
        }
        return inpTab
    }

    return (
        <Box className={classes.digits} >
            {getInput()}
        </Box>
    )
}

export default SmsInput
