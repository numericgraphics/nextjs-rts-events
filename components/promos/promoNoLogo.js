import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const styles = {
    containerImage: {
        position: 'absolute',
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
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100vw',
        minHeight: '85vh',
        zIndex: 2
    },
    gradient: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)'
    },
    text: {
        padding: 10
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        lineHeight: '1em',
        marginBottom: 12
    },
    description: {
        fontFamily: 'srgssr-type-Bd'
    }
})

export default function PromoNoLogo (props) {
    const classes = useStyles()
    const { description, title, backgroundImageURL } = props.data
    useEffect(() => {

    }, [props.selected])

    return (
        <Box className={classes.containerGlobal}>
            <Box className={classes.containerOverlay} >
                <Box className={classes.text}>
                    <Typography className={classes.title} variant="h3" align={'center'}>{title}</Typography>
                    <Typography className={classes.description} variant="subtitle1" align={'center'}>{description}</Typography>
                </Box>
            </Box>
            <Box className={classes.gradient}/>
            <Box style={{ ...styles.containerImage, backgroundImage: `url(${backgroundImageURL})` }} />
        </Box>

    )
}
