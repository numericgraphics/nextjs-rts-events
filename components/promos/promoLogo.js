import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

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

export default function PromoLogo (props) {
    useEffect(() => {

    }, [props.selected])

    return (
        <Box>
            <Typography style={styles.slideTeaser} variant="h5" align={'center'}>PromoLogo</Typography>
        </Box>
    )
}
