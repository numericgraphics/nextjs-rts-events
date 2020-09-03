import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import ThemeFactory from '../data/themeFactory'
import InnerHeightLayout from './innerHeightLayout'

const useStyles = makeStyles({
    containerProgress: {
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }
})

function Progress () {
    const classes = useStyles()
    const [theme, setTheme] = useState({})

    useEffect(() => {
        setTheme(ThemeFactory.getCreatedTheme())
    }, [])

    return (
        <InnerHeightLayout class={classes.containerProgress} >
            <CircularProgress style={{ color: theme.palette ? theme.palette.secondary.main : ThemeFactory.getDefaultTheme().palette.secondary.main }} />
        </InnerHeightLayout>
    )
}

export default Progress
