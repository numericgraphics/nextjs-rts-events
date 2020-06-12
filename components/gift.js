import React, { createRef, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'
import { useTweenMax } from '../hooks/useTweenMax'
import { isIOS } from '../utils'

const styles = {
    slide: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        zIndex: 0,
        backgroundColor: 'gray'
    },
    slideGradient: {
        position: 'absolute',
        width: '100vw',
        height: '70vh',
        flexGrow: 1,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)'
    },
    slideTitle: {
        width: '100%',
        minHeight: '10vh',
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: '2rem',
        color: 'green',
        paddingBottom: 20
    },
    slideTitleTypo: {
        fontFamily: 'srgssr-type-BdIt',
        lineHeight: 1,
        padding: 10,
        backgroundColor: '#409AD3',
        color: 'white'
    },
    slideBody: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: '40vh',
        zIndex: 2
    },
    slideBodyIOS: {
        position: 'absolute',
        top: '30vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: '35vh',
        zIndex: 2
    },
    slideTeaser: {
        fontFamily: 'srgssr-type-Bd',
        color: 'white'
    }
}

function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
}

export default function Gift (props) {
    console.log('Gift', props)
    const spintTitle = createRef()
    const { teaser, title, imageURL } = props.data
    const [spinInHandler] = useTweenMax(spintTitle, 1.2, {
        rotation: -getRandomInt(6),
        transformOrigin: 'center'
    })
    const [spinOutHandler] = useTweenMax(spintTitle, 0.2, {
        rotation: 0,
        transformOrigin: 'center'
    })

    useEffect(() => {
        props.selected ? spinInHandler() : spinOutHandler()
    }, [props.selected])

    return (
        <Box>
            <Box style={styles.slideGradient}/>
            <Box style={{ ...styles.slide, backgroundImage: `url(${imageURL})`, backgroundPosition: 'center' }}>
                <Container style={isIOS() ? styles.slideBodyIOS : styles.slideBody}>
                    <Box ref={spintTitle} style={styles.slideTitle}>
                        <Typography variant="h4" style={styles.slideTitleTypo}>{title}</Typography>
                    </Box>
                    <Grow in={props.selected}
                        style={{ transformOrigin: '50 50 0' }}
                        {...(props.selected ? { timeout: 1000 } : {})}>
                        <Typography style={styles.slideTeaser} variant="h5" align={'center'}>{teaser}</Typography>
                    </Grow>
                </Container>
            </Box>
        </Box>
    )
}
