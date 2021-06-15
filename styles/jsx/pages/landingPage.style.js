import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({

    container: {
        height: '100%',
        width: '100%',
        backgroundImage: 'url(/backgroundLandingPage.jpg)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }, 

    textContent: {
        textAlign: 'center',
        color: 'white',
        margin: '5vw 6vw 10vw 6vw',
        maxWidth: '400px'
    },

    button: {
        backgroundColor: '#AF001E',
        color: 'white',
        maxWidth: '320px'
    },
    hrefBtn: {
        backgroundColor: '#AF001E',
        color: 'white',
        maxWidth: '320px',
        textAlign: 'center',
        borderRadius: '30px',
        width: '80%',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: '#8a0017'

        }
    }

}))
