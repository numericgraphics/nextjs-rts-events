import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import ThemeFactory from '../data/themeFactory'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        display: 'flex',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette ? theme.palette.background : 'white',
        overflow: 'hidden'
    }
}))

function Progress () {
    const classes = useStyles()
    const [theme, setTheme] = useState({})

    useEffect(() => {
        setTheme(ThemeFactory.getCreatedTheme())
    }, [])

    return (
        <Box className={classes.container} >
            <CircularProgress style={{ color: theme.palette ? theme.palette.secondary.main : ThemeFactory.getDefaultTheme().palette.secondary.main }} />
        </Box>
    )
}

export default Progress
