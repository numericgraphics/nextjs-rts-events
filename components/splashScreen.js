import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    containerProgress: {
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#0097A7'
    },
    textRegularCenter: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '2rem'
    }
})

function SplashScreen () {
    const [height, setHeight] = useState()

    useEffect(() => {
        setHeight(window.innerHeight)
    }, [])

    const classes = useStyles()
    return (
        <Box className={classes.containerProgress} style={{ minHeight: height }}>
            <Typography className={classes.textRegularCenter}>
                splash-screen
            </Typography>
        </Box>
    )
}

export default SplashScreen
