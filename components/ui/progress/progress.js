import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import ThemeFactory from '../../../data/themeFactory'
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
        <Box className={'container'}>
            <Box className={[classes.container, 'background'].join(' ')} style={{ height: height, backgroundColor: theme.palette ? theme.palette.primary.main : ThemeFactory.getDefaultTheme().palette.primary.main }}>
                <CircularProgress style={{ color: theme.palette ? theme.palette.primary.contrastText : ThemeFactory.getDefaultTheme().palette.primary.contrastText }} />
            </Box>
        </Box>
    )
}

export default Progress
