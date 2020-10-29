import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ThemeFactory from '../data/themeFactory'
import Box from '@material-ui/core/Box'
import EventLayout from './eventLayout'

const useStyles = makeStyles((theme = useTheme) => ({
    container: {
        // position: 'fixed',
        display: 'flex',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    }
}))

function Progress () {
    const classes = useStyles()
    const [height, setHeight] = useState()
    const [theme, setTheme] = useState({})

    useEffect(() => {
        setTheme(ThemeFactory.getCreatedTheme())
        setHeight(window.innerHeight)
    }, [])

    return (
        <EventLayout >
            <Box className='content' >
                <Box className={classes.container} style={{ height: height, backgroundColor: theme.palette ? theme.palette.secondary.contrastText : ThemeFactory.getDefaultTheme().palette.secondary.contrastText }}>
                    <CircularProgress style={{ color: theme.palette ? theme.palette.secondary.main : ThemeFactory.getDefaultTheme().palette.secondary.main }} />
                </Box>
            </Box>
        </EventLayout>
    )
}

export default Progress
