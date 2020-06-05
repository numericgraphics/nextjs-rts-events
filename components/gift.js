import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'

const styles = {
    slide: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'gray'
    },
    slideGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.75) 100%)'
    },
    slideHeader: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '20px',
        width: '100%',
        minHeight: '30vh',
        zIndex: 2,
        backgroundColor: 'pink'
    },
    slideTitle: {
        width: '100%',
        minHeight: '10vh',
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: '2rem',
        color: 'green'
    },
    slideDescription: {
        // width: '100%',
        textAlign: 'center',
        color: 'white'
    },
    slideBody: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        minHeight: '40vh',
        zIndex: 2
    }
}

export default function Gift (props) {
    const { description, teaser, title, imageURL } = props.data
    useEffect(() => {
    }, [props.selected])

    return (
        <Box style={{ ...styles.slide, backgroundImage: `url(${imageURL})`, backgroundPosition: 'center' }}>
            <Box style={styles.slideGradient}/>
            <Container style={styles.slideHeader}>
                <Box style={styles.slideDescription}>
                    <Typography variant="body1">{description}</Typography>
                </Box>
            </Container>
            <Container style={styles.slideBody}>
                <Box style={styles.slideTitle}>
                    <Typography variant="h2">{title}</Typography>
                </Box>
                <Grow in={props.selected}
                    style={{ transformOrigin: '50 50 0' }}
                    {...(props.selected ? { timeout: 1000 } : {})}>
                    <Typography variant="h4" align={'center'}>{teaser}</Typography>
                </Grow>
            </Container>
        </Box>
    )
}
