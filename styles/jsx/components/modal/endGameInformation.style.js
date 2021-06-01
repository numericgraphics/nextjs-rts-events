import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        paddingBottom: '3vh'
    },
    buttonClose: {
        alignSelf: 'flex-end!important',
        margin: 'min(3vw, 30px)',
        '@media only screen and (min-width: 600px)': {
            margin: 'min(2vw, 20px)'
        },
        '@media only screen and (min-width: 750px)': {
            margin: 'min(1.5vw, 15px)'
        }
    },
    subTitle: {
        marginBottom: 'min(1rem, 30px)'
    },
    shareIcon: {
        fill: theme.palette.primary.contrastText
    },
    shareHeaderText: {
        paddingLeft: '5px',
        color: theme.palette.primary.contrastText
    },
    shareHeaderContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))
