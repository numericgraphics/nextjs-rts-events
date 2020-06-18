import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const styles = {
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'gray'
    }
}

const useStyles = makeStyles({
    containerGlobal: {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'gray'
    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)'
    }
})

export default function PromoImage (props) {
    const classes = useStyles()
    const { backgroundImageURL } = props.data
    useEffect(() => {

    }, [props.selected])

    return (
        <Box className={classes.containerGlobal}>
            <Box className={classes.gradient}/>
            <Box style={{ ...styles.containerOverlay, backgroundImage: `url(${backgroundImageURL})` }} />
        </Box>
    )
}
