import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'

const styles = {
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'pink'
    }
}

const useStyles = makeStyles({
    containerGlobal: {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'pink'
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
    image: {
        alignSelf: 'center',
        padding: 20,
        maxWidth: 400
    }
})

export default function PromoLogo (props) {
    const classes = useStyles()
    const { description, title, backgroundImageURL, logoURL } = props.data
    useEffect(() => {

    }, [props.selected])

    return (
        <Box className={classes.containerGlobal}>
            <Box className={classes.gradient}/>
            <Box style={{ ...styles.containerOverlay, backgroundImage: `url(${backgroundImageURL})`, backgroundPosition: 'center' }} >

                <Box className={classes.image}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={logoURL}
                        title="Contemplative Reptile"
                    />
                </Box>
                <Box className={classes.text}>
                    <Typography variant="h5" align={'center'}>{title}</Typography>
                    <Typography variant="body1" align={'center'}>{description}</Typography>
                </Box>
            </Box>
        </Box>

    )
}
